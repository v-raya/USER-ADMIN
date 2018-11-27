import * as actionTypes from '../actions/actionTypes'
import { DateTime } from 'luxon'

const initialState = {
  resendEmailStatus: null,
  fetching: false,
  resendEmailUserId: [],
  registrationResentDateTime: null,
}

function resendRegistrationEmail(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS:
      const status = {
        XHRStatus: 'ready',
        response: action.resendEmailStatus,
      }

      const date = DateTime.local().toSQL({ includeOffset: false })
      const dateTime = date.split('.')[0]
      return {
        ...state,
        fetching: false,
        resendEmailStatus: status.response,
        resendEmailUserId: state.resendEmailUserId.concat(action.id),
        error: null,
        registrationResentDateTime: dateTime,
      }

    case actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        resendEmailStatus: null,
        error: action.error,
      }

    case actionTypes.CLEAR_USER_DETAILS:
      return {
        ...state,
        resendEmailStatus: null,
        fetching: false,
        registrationResentDateTime: null,
      }

    default:
      return state
  }
}

export default resendRegistrationEmail
