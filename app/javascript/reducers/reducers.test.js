import reducer from './reducers';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
  it('handles FETCH_USERS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_USERS_API_CALL_REQUEST,
    };
    const state = { userList: null, fetching: false };
    expect(reducer(state, requestAction)).toEqual({
      fetchUserList: {
        fetching: true,
        userList: null,
        error: null,
      },
    });
  });

  it('handles FETCH_USERS_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.FETCH_USERS_API_CALL_SUCCESS,
      userList: { 0: 'user1', 1: 'user2' },
    };
    const state = { userList: null, fetching: true, error: null };
    expect(reducer(state, responseAction)).toEqual({
      fetchUserList: {
        fetching: false,
        userList: { records: { 0: 'user1', 1: 'user2' }, XHRStatus: 'ready' },
        error: null,
      },
    });
  });

  it('handles FETCH_USERS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_USERS_API_CALL_FAILURE,
      userList: null,
      error: 'error happened',
    };
    const state = { userList: null, fetching: true, error: null };
    expect(reducer(state, failureAction)).toEqual({
      fetchUserList: {
        fetching: false,
        userList: null,
        error: 'error happened',
      },
    });
  });
});
