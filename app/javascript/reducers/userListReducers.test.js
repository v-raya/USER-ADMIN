import reducer from './userListReducers';
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
      userList: [
        { id: 'key1', username: 'user1' },
        { id: 'key2', username: 'user2' },
      ],
    };
    const state = { userList: null, fetching: true, error: null };

    expect(reducer(state, responseAction)).toEqual({
      fetchUserList: {
        fetching: false,
        userList: {
          XHRStatus: 'ready',
          records: [
            { id: 'key1', username: 'user1' },
            { id: 'key2', username: 'user2' },
          ],
        },
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
