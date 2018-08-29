import * as actionTypes from '../actions/actionTypes';

function saveUserDetails(
  state = { saveUserDetails: null, fetching: false },
  action
) {
  switch (action.type) {
    case actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS:
      const saveUserDetails = {
        XHRStatus: 'ready',
        records: { ...action.saveUserDetails },
      };
      return {
        ...state,
        fetching: false,
        saveUserDetails: saveUserDetails,
        error: null,
      };

    case actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        saveUserDetails: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default saveUserDetails;
