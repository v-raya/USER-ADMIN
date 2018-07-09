import UserService from '../_services/users';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

// worker saga: makes the api call when watcher saga sees the action
export function* createUser(action) {
  try {
    let create = action.payload;
    const createNewUser = yield call(UserService.createUser, create.newUser);
    // dispatch a success action to the store with the new account details
    yield put({
      type: actionTypes.CREATE_USER_API_CALL_SUCCESS,
      createNewUser,
      //   userId,
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.CREATE_USER_API_CALL_FAILURE,
      error,
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* createUserSaga() {
  yield takeLatest(actionTypes.CREATE_USER_API_CALL_REQUEST, createUser);
}
