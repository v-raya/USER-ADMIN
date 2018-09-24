import UserService from '../_services/users';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

// worker saga: makes the api call when watcher saga sees the action
export function* getOffices() {
  try {
    const offices = yield call(UserService.fetchOfficesList);
    // dispatch a success action to the store with the new account details
    yield put({
      type: actionTypes.FETCH_OFFICES_API_CALL_SUCCESS,
      offices,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_OFFICES_API_CALL_FAILURE,
      error,
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* officesSaga() {
  yield takeLatest(actionTypes.FETCH_OFFICES_API_CALL_REQUEST, getOffices);
}
