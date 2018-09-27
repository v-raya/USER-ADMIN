import resendRegistrationEmail from './resendRegistrationEmailReducers';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
  it('handles RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST,
    };
    const state = { resendEmailStatus: null, fetching: false };
    expect(resendRegistrationEmail(state, requestAction)).toEqual({
      fetching: true,
      resendEmailStatus: null,
      error: null,
    });
  });

  it('handles RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS,
      resendEmailStatus: { status: '200' },
    };
    const state = { resendEmailStatus: null, fetching: true, error: null };

    expect(resendRegistrationEmail(state, responseAction)).toEqual({
      fetching: false,
      resendEmailStatus: {
        status: '200',
      },
      error: null,
    });
  });

  it('handles RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE,
      resendEmailStatus: null,
      error: 'error happened',
    };
    const state = { resendEmailStatus: null, fetching: true, error: null };
    expect(resendRegistrationEmail(state, failureAction)).toEqual({
      fetching: false,
      resendEmailStatus: null,
      error: 'error happened',
    });
  });

  it('handles unexpected actiontypes gracefully', () => {
    const unexpectedAction = {
      type: 'END_OF_THE_WORLD',
      resendEmailStatus: { hello: 'world' },
    };
    const state = {
      resendEmailStatus: ['item1'],
      fetching: true,
      error: null,
    };
    expect(resendRegistrationEmail(state, unexpectedAction)).toEqual(state);
  });

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    };
    const state = { resendEmailStatus: null, fetching: false };
    expect(resendRegistrationEmail(undefined, randomAction)).toEqual(state);
  });

  it('clears details', () => {
    const before = { resendEmailStatus: {}, fetching: false, error: null };
    let after;
    expect(
      () =>
        (after = resendRegistrationEmail(before, {
          type: actionTypes.CLEAR_USER_DETAILS,
        }))
    ).not.toThrow();
    expect(after).not.toEqual(before);
  });
});
