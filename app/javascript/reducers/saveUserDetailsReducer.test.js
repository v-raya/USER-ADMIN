import saveUserDetails from './saveUserDetailsReducers';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
  it('handles SAVE_USER_DETAILS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST,
    };
    const state = { saveUserDetails: null, fetching: false };
    expect(saveUserDetails(state, requestAction)).toEqual({
      fetching: true,
      saveUserDetails: null,
      error: null,
    });
  });

  it('handles SAVE_USER_DETAILS_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS,
      saveUserDetails: { last_name: 'first', username: 'user1' },
    };
    const state = { saveUserDetails: null, fetching: true, error: null };

    expect(saveUserDetails(state, responseAction)).toEqual({
      fetching: false,
      saveUserDetails: {
        XHRStatus: 'ready',
        records: { last_name: 'first', username: 'user1' },
      },
      error: null,
    });
  });

  it('handles SAVE_USER_DETAILS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE,
      saveUserDetails: null,
      error: 'error happened',
    };
    const state = { saveUserDetails: null, fetching: true, error: null };
    expect(saveUserDetails(state, failureAction)).toEqual({
      fetching: false,
      saveUserDetails: null,
      error: 'error happened',
    });
  });

  it('handles unexpected actiontypes gracefully', () => {
    const unexpectedAction = {
      type: 'END_OF_THE_WORLD',
      saveUserDetails: { hello: 'world' },
    };
    const state = {
      saveUserDetails: ['item1', 'item2'],
      fetching: true,
      error: null,
    };
    expect(saveUserDetails(state, unexpectedAction)).toEqual(state);
  });

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    };
    const state = { saveUserDetails: null, fetching: false };
    expect(saveUserDetails(undefined, randomAction)).toEqual(state);
  });
});
