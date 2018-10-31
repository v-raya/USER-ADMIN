import fetchDetails from './detailsReducers';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
  it('handles FETCH_DETAILS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_DETAILS_API_CALL_REQUEST,
    };
    const state = { details: null, fetching: false };
    expect(fetchDetails(state, requestAction)).toEqual({
      fetching: true,
      details: null,
      error: null,
    });
  });

  it('handles FETCH_DETAILS_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.FETCH_DETAILS_API_CALL_SUCCESS,
      details: { id: 'key1', username: 'user1' },
    };
    const state = { details: null, fetching: true, error: null };
    const records = {
      XHRStatus: 'ready',
      records: { id: 'key1', username: 'user1' },
    };

    expect(fetchDetails(state, responseAction)).toEqual({
      fetching: false,
      details: records,
      isEdit: false,
      error: null,
    });
  });

  it('handles FETCH_DETAILS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_DETAILS_API_CALL_FAILURE,
      details: null,
      error: 'error happened',
    };
    const state = { details: null, fetching: true, error: null };
    expect(fetchDetails(state, failureAction)).toEqual({
      fetching: false,
      details: null,
      error: 'error happened',
    });
  });

  it('handles HANDLE_DROPDOWN_CHANGE', () => {
    const name = 'permissions';
    const value = ['Snapshot-rollout'];
    const handleDropDownAction = {
      type: actionTypes.HANDLE_DROPDOWN_CHANGE,
      payload: { name, value },
    };
    const details = {
      records: {
        user: {
          permissions: undefined,
        },
      },
    };
    const state = { details: details };
    expect(fetchDetails(state, handleDropDownAction)).toEqual({
      details: { records: { user: { permissions: ['Snapshot-rollout'] } } },
    });
  });

  it('handles HANDLE_EDIT_BUTTON_CHANGE', () => {
    const value = true;
    const handleEditButtonAction = {
      type: actionTypes.HANDLE_EDIT_BUTTON_CHANGE,
      payload: { value },
    };
    const state = { details: null, fetching: false };
    expect(fetchDetails(state, handleEditButtonAction)).toEqual({
      details: null,
      fetching: false,
      isEdit: true,
    });
  });

  it('handles unexpected actiontypes gracefully', () => {
    const unexpectedAction = {
      type: 'END_OF_THE_WORLD',
      details: { hello: 'world' },
    };
    const state = { details: null, fetching: true, error: null };
    expect(fetchDetails(state, unexpectedAction)).toEqual(state);
  });

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    };
    const state = { details: null, fetching: false, isEdit: false };
    expect(fetchDetails(undefined, randomAction)).toEqual(state);
  });

  it('clears details', () => {
    const before = { details: {}, fetching: false, error: null, isEdit: false };
    let after;
    expect(
      () =>
        (after = fetchDetails(before, { type: actionTypes.CLEAR_USER_DETAILS }))
    ).not.toThrow();
    expect(after).not.toEqual(before);
  });

  it('handles SAVE_USER_DETAILS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST,
    };
    const state = { fetching: false };
    expect(fetchDetails(state, requestAction)).toEqual({
      fetching: true,
      saveDetailsError: null,
    });
  });

  it('handles SAVE_USER_DETAILS_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS,
      saveUserDetails: { last_name: 'first', username: 'user1' },
    };
    const state = { fetching: true, error: null };

    expect(fetchDetails(state, responseAction)).toEqual({
      fetching: false,
      error: null,
      isEdit: false,
      saveDetailsError: null,
    });
  });

  it('handles SAVE_USER_DETAILS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE,
      error: 'error happened',
    };
    const state = {
      fetching: true,
      error: null,
    };
    expect(fetchDetails(state, failureAction)).toEqual({
      fetching: false,
      saveDetailsError: 'error happened',
      error: null,
      isEdit: true,
    });
  });
});
