import * as actionTypes from '../actions/actionTypes';

const initialState = {
  resendEmailStatus: null,
  fetching: false,
  resendEmailUserId: [],
};

function resendRegistrationEmail(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_SUCCESS:
      const status = {
        XHRStatus: 'ready',
        response: action.resendEmailStatus,
      };

      return {
        ...state,
        fetching: false,
        resendEmailStatus: status.response,
        resendEmailUserId: state.resendEmailUserId.concat(action.id),
        error: null,
      };

    case actionTypes.RESEND_REGISTRATION_EMAIL_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        resendEmailStatus: null,
        error: action.error,
      };

    case actionTypes.CLEAR_USER_DETAILS: {
      return {
        ...state,
        resendEmailStatus: null,
        fetching: false,
      };
    }

    default:
      return state;
  }
}

export default resendRegistrationEmail;
