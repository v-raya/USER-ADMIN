import UserService from '../_services/users'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'

// worker saga: makes the api call when watcher saga sees the action
export function* getRoles() {
  try {
    const roles = yield call(UserService.fetchRolesList)
    // dispatch a success action to the store with the roles
    yield put({
      type: actionTypes.FETCH_ROLES_API_CALL_SUCCESS,
      roles,
    })
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({
      type: actionTypes.FETCH_ROLES_API_CALL_FAILURE,
      error,
    })
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* rolesSaga() {
  yield takeLatest(actionTypes.FETCH_ROLES_API_CALL_REQUEST, getRoles)
}
