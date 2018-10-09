import AccountService from '../_services/account';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import { isOfficeAdmin } from '../_utils/checkAdminRoles';

// worker saga: makes the api call when watcher saga sees the action
export function* getAccount() {
  try {
    const response = yield call(AccountService.fetchCurrent);

    // Check admin role for office-admin, if not send admins office-ID as empty array
    const account = isOfficeAdmin(response)
      ? response
      : {
          ...response,
          admin_office_ids: [],
        };

    // Dispatch a success action to the store with the new account details
    yield put({
      type: actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS,
      payload: account,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_ACCOUNT_API_CALL_FAILURE,
      error,
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* accountSaga() {
  yield takeLatest(actionTypes.FETCH_ACCOUNT_API_CALL_REQUEST, getAccount);
}
