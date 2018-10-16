import fetchRoles from './rolesReducers';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
  it('handles FETCH_ROLES_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_ROLES_API_CALL_REQUEST,
    };
    const state = { roles: null, fetching: false };
    expect(fetchRoles(state, requestAction)).toEqual({
      fetching: true,
      roles: null,
      error: null,
    });
  });

  it('handles FETCH_ROLES_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.FETCH_ROLES_API_CALL_SUCCESS,
      roles: ['Hello', 'Bye'],
    };
    const state = { roles: null, fetching: true, error: null };

    expect(fetchRoles(state, responseAction)).toEqual({
      fetching: false,
      roles: ['Hello', 'Bye'],
      error: null,
    });
  });

  it('handles FETCH_ROLES_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_ROLES_API_CALL_FAILURE,
      roles: null,
      error: 'error happened',
    };
    const state = { roles: null, fetching: true, error: null };
    expect(fetchRoles(state, failureAction)).toEqual({
      fetching: false,
      roles: null,
      error: 'error happened',
    });
  });

  it('handles unexpected actions by ignoring them', () => {
    const randomAction = {
      type: 'unknownAction',
      foreignObject: [],
    };
    const state = { roles: null, fetching: true, error: null };
    expect(fetchRoles(state, randomAction)).toEqual({
      roles: null,
      fetching: true,
      error: null,
    });
  });

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    };
    const state = { roles: null, fetching: false };
    expect(fetchRoles(undefined, randomAction)).toEqual(state);
  });
});
