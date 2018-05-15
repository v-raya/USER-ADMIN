import DetailService from '../_services/users';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

// worker saga: makes the api call when watcher saga sees the action
function* countyUserDetails() {
  try {
    const userDetail = yield call(DetailService.fetchUserDetails, 'id');

    // dispatch a success action to the store with the new users
    yield put({
      type: actionTypes.FETCH_USERS_DETAILS_API_CALL_SUCCESS,
      userDetail,
    });
    // console.log("userList:"+ userList.message);
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_USERS_DETAILS_API_CALL_FAILURE,
      error,
    });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* countyUserDetailsSaga() {
  yield takeLatest(
    actionTypes.FETCH_USERS_DETAILS_API_CALL_REQUEST,
    countyUserDetails
  );
}
