import resendRegistrationEmail from './resendRegistrationEmailReducers'
import * as actionTypes from '../actions/actionTypes'
import { DateTime } from 'luxon'

describe('reducer', () => {
  it('handles RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST,
    }
    const state = {
      resendEmailStatus: null,
      resendEmailUserId: [],
      fetching: false,
      registrationResentDateTime: null,
    }
    expect(resendRegistrationEmail(state, requestAction)).toEqual({
      fetching: true,
      resendEmailUserId: [],
      resendEmailStatus: null,
      error: null,
      registrationResentDateTime: null,
    })
  })

  describe('handles RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS', () => {
    const date = DateTime.local().toSQL({ includeOffset: false })
    const dateTime = date.split('.')[0]

    const state = {
      resendEmailStatus: null,
      fetching: true,
      error: null,
      resendEmailUserId: [],
      registrationResentDateTime: null,
    }
    it('returns resendEmailUserId', () => {
      const responseAction = {
        type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS,
        resendEmailStatus: 200,
        id: 'SOME_ID',
      }
      expect(resendRegistrationEmail(state, responseAction)).toEqual({
        fetching: false,
        resendEmailStatus: 200,
        resendEmailUserId: ['SOME_ID'],
        error: null,
        registrationResentDateTime: dateTime,
      })
    })

    it('returns resendEmailUserId as array[id]', () => {
      const responseAction1 = {
        type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS,
        resendEmailStatus: 200,
        id: ['SOME_ID1', 'SOME_ID2'],
      }
      expect(resendRegistrationEmail(state, responseAction1)).toEqual({
        fetching: false,
        resendEmailStatus: 200,
        resendEmailUserId: ['SOME_ID1', 'SOME_ID2'],
        error: null,
        registrationResentDateTime: dateTime,
      })
    })
  })

  it('handles RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE,
      resendEmailStatus: null,
      error: 'error happened',
    }
    const state = { resendEmailStatus: null, fetching: true, error: null, registrationResentDateTime: null }
    expect(resendRegistrationEmail(state, failureAction)).toEqual({
      fetching: false,
      resendEmailStatus: null,
      error: 'error happened',
      registrationResentDateTime: null,
    })
  })

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    }
    const state = {
      resendEmailStatus: null,
      fetching: false,
      resendEmailUserId: [],
      registrationResentDateTime: null,
    }
    expect(resendRegistrationEmail(undefined, randomAction)).toEqual(state)
  })

  it('clears details', () => {
    const before = { resendEmailStatus: {}, fetching: false, error: null }
    let after
    expect(
      () =>
        (after = resendRegistrationEmail(before, {
          type: actionTypes.CLEAR_USER_DETAILS,
        }))
    ).not.toThrow()
    expect(after).not.toEqual(before)
  })
})
