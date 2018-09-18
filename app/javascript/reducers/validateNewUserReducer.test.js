import validateNewUser from './validateNewUserReducer';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
  it('handles VALIDATE_NEW_USER_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.VALIDATE_NEW_USER_API_CALL_REQUEST,
    };
    const state = { verifyUserDetails: null, fetching: false };
    expect(validateNewUser(state, requestAction)).toEqual({
      fetching: true,
      verifyUserDetails: null,
      error: null,
    });
  });

  it('handles VALIDATE_NEW_USER_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.VALIDATE_NEW_USER_API_CALL_SUCCESS,
      verifyUserDetails: { last_name: 'first', username: 'user1' },
    };
    const state = { verifyUserDetails: null, fetching: true, error: null };

    expect(validateNewUser(state, responseAction)).toEqual({
      fetching: false,
      verifyUserDetails: {
        last_name: 'first',
        username: 'user1',
      },
      error: null,
    });
  });

  it('handles VALIDATE_NEW_USER_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.VALIDATE_NEW_USER_API_CALL_FAILURE,
      verifyUserDetails: null,
      error: 'error happened',
    };
    const state = { verifyUserDetails: null, fetching: true, error: null };
    expect(validateNewUser(state, failureAction)).toEqual({
      fetching: false,
      verifyUserDetails: null,
      error: 'error happened',
    });
  });

  it('handles unexpected actiontypes gracefully', () => {
    const unexpectedAction = {
      type: 'END_OF_THE_WORLD',
      verifyUserDetails: { hello: 'world' },
    };
    const state = {
      verifyUserDetails: ['item1', 'item2'],
      fetching: true,
      error: null,
    };
    expect(validateNewUser(state, unexpectedAction)).toEqual(state);
  });

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    };
    const state = { verifyUserDetails: null, fetching: false, error: null };
    expect(validateNewUser(undefined, randomAction)).toEqual(state);
  });
});
