import fetchAccount from './accountReducers';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
  it('handles FETCH_ACCOUNT_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_ACCOUNT_API_CALL_REQUEST,
    };
    const state = { account: null, fetching: false };
    expect(fetchAccount(state, requestAction)).toEqual({
      fetching: true,
      account: null,
      error: null,
    });
  });

  it('handles FETCH_ACCOUNT_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS,
      account: { id: 'userid', username: 'my user' },
    };
    const state = { account: null, fetching: true, error: null };

    expect(fetchAccount(state, responseAction)).toEqual({
      fetching: false,
      account: {
        XHRStatus: 'ready',
        account: { id: 'userid', username: 'my user' },
      },
      error: null,
    });
  });

  it('handles FETCH_ACCOUNT_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_ACCOUNT_API_CALL_FAILURE,
      account: null,
      error: 'error happened',
    };
    const state = { account: null, fetching: true, error: null };
    expect(fetchAccount(state, failureAction)).toEqual({
      fetching: false,
      account: null,
      error: 'error happened',
    });
  });

  it('handles unexpected actions by ignoring them', () => {
    const randomAction = {
      type: 'unknownAction',
      foreignObject: {},
    };
    const state = { account: null, fetching: true, error: null };
    expect(fetchAccount(state, randomAction)).toEqual({
      account: null,
      fetching: true,
      error: null,
    });
  });
});
