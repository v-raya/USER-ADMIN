import { takeLatest, select, put } from 'redux-saga/effects';
import { getSearchParams } from '../selectors/userListSelector';
import { searchUsers } from '../actions/userListActions';
import {
  USER_LIST_SET_PAGE,
  USER_LIST_SET_PAGE_SIZE,
  USER_LIST_SET_SORT,
  USER_LIST_SET_SEARCH,
} from '../actions/actionTypes';

export function* doSomething(action) {
  try {
    let params = yield select(getSearchParams);
    // console.log(params);
    yield put(searchUsers(params));
  } catch (err) {
    console.log(err);
  }
}

export function* watchUserSearchParamUpdates() {
  yield takeLatest(
    [
      USER_LIST_SET_SEARCH,
      USER_LIST_SET_SORT,
      USER_LIST_SET_PAGE,
      USER_LIST_SET_PAGE_SIZE,
    ],
    doSomething
  );
}
