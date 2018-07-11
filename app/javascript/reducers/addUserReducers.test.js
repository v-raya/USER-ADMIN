import addUser from './addUserReducers';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
  it('handles ADD_USER_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.ADD_USER_API_CALL_REQUEST,
    };
    const state = { addNewUser: null, fetching: false };
    expect(addUser(state, requestAction)).toEqual({
      fetching: true,
      addNewUser: null,
      error: null,
    });
  });

  it('handles ADD_USER_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.ADD_USER_API_CALL_SUCCESS,
      addNewUser:
        'http://localhost:18080/perry/idm/users/0c398fa0-c634-4125-a4c6-a0b20446b7be?token=1681f2e4-dfc9-4002-8a6d-8fccc9563c94',
    };
    // const responseURL = responseAction.addNewUser;
    // const splitURL = responseURL.split('/')[6].split('?')[0];

    const state = { addNewUser: null, fetching: true, error: null };

    expect(addUser(state, responseAction)).toEqual({
      fetching: false,
      addNewUser: '0c398fa0-c634-4125-a4c6-a0b20446b7be',
      error: null,
    });
  });

  it('handles ADD_USER_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.ADD_USER_API_CALL_FAILURE,
      addNewUser: null,
      error: 'error happened',
    };
    const state = { addNewUser: null, fetching: true, error: null };
    expect(addUser(state, failureAction)).toEqual({
      fetching: false,
      addNewUser: null,
      error: 'error happened',
    });
  });

  it('handles unexpected actiontypes gracefully', () => {
    const unexpectedAction = {
      type: 'END_OF_THE_WORLD',
      details: { hello: 'world' },
    };
    const state = {
      addNewUser: ['item1', 'item2'],
      fetching: true,
      error: null,
    };
    expect(addUser(state, unexpectedAction)).toEqual(state);
  });

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    };
    const state = { addNewUser: null, fetching: false };
    expect(addUser(undefined, randomAction)).toEqual(state);
  });
});
