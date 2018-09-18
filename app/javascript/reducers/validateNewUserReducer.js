import * as actionTypes from '../actions/actionTypes';

function validateNewUser(
  state = { verifyUserDetails: null, fetching: false, error: null },
  action
) {
  switch (action.type) {
    case actionTypes.VALIDATE_NEW_USER_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.VALIDATE_NEW_USER_API_CALL_SUCCESS:
      const newUserDetails = {
        XHRStatus: 'ready',
        records: { ...action.verifyUserDetails },
      };
      return {
        ...state,
        fetching: false,
        verifyUserDetails: newUserDetails.records,
        error: null,
      };

    case actionTypes.VALIDATE_NEW_USER_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        verifyUserDetails: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default validateNewUser;
