import fetchUserList from './userListReducers';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
  it('handles FETCH_USERS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_USERS_API_CALL_REQUEST,
    };
    const state = { userList: null, fetching: false };
    expect(fetchUserList(state, requestAction)).toEqual({
      fetching: true,
      userList: null,
      error: null,
    });
  });

  it('handles FETCH_USERS_API_CALL_SUCCESS', () => {
    const action = {
      type: actionTypes.FETCH_USERS_API_CALL_SUCCESS,
      payload: {
        users: [
          { id: 'key1', username: 'user1' },
          { id: 'key2', username: 'user2' },
        ],
      },
    };
    const before = {};
    let after;
    expect(() => (after = fetchUserList(before, action))).not.toThrow();
    expect(after.fetching).toEqual(false);
    expect(after.users.length).toBe(2);
    expect(after.error).toBe(null);
  });

  it('handles FETCH_USERS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_USERS_API_CALL_FAILURE,
      payload: {
        users: null,
        error: 'error happened',
      },
    };
    const before = {};
    let after;
    expect(() => (after = fetchUserList(before, failureAction))).not.toThrow();
    expect(after.fetching).toBe(false);
    expect(after.users).toBeFalsy();
    expect(after.error).toEqual('error happened');
  });

  it('handles unexpected actiontypes gracefully', () => {
    const unexpectedAction = {
      type: 'END_OF_THE_WORLD',
      details: { hello: 'world' },
    };
    const state = { userList: ['item1', 'item2'], fetching: true, error: null };
    expect(fetchUserList(state, unexpectedAction)).toEqual(state);
  });

  it('has an initial state', () => {
    expect(fetchUserList(undefined, {})).toBeTruthy();
  });

  it('returns the state tree when no action types match', () => {
    const randomAction = {
      type: 'DOES_NOT_EXIST',
      payload: {},
    };
    expect(fetchUserList({}, randomAction)).toBeTruthy();
  });
});
