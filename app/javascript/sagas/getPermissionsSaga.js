import UserService from '../_services/users';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

// worker saga: makes the api call when watcher saga sees the action
export function* getPermissions() {
  try {
    const permissions = yield call(UserService.fetchPermissionsList);
    // dispatch a success action to the store with the new account details
    yield put({
      type: actionTypes.FETCH_PERMISSIONS_API_CALL_SUCCESS,
      permissions,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_PERMISSIONS_API_CALL_FAILURE,
      error,
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* permissionsSaga() {
  yield takeLatest(
    actionTypes.FETCH_PERMISSIONS_API_CALL_REQUEST,
    getPermissions
  );
}
