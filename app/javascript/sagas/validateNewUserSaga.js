import UserService from '../_services/users';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

// worker saga: makes the api call when watcher saga sees the action
export function* validateNewUser(action) {
  try {
    let verify = action.payload;
    const verifiedUserDetails = yield call(
      UserService.validateUser,
      verify.email,
      verify.racfid
    );
    // dispatch a success action to the store with the new account details
    yield put({
      type: actionTypes.VALIDATE_NEW_USER_API_CALL_SUCCESS,
      verifyUserDetails: { verifiedUserDetails, verify },
    });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.VALIDATE_NEW_USER_API_CALL_FAILURE,
      error,
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* validateNewUserSaga() {
  yield takeLatest(
    actionTypes.VALIDATE_NEW_USER_API_CALL_REQUEST,
    validateNewUser
  );
}
