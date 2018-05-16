import * as actionTypes from '../actions/actionTypes';

function fetchUserDetails(state = { userList: null, fetching: false }, action) {
  switch (action.type) {
    case actionTypes.FETCH_USERS_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_USERS_DETAILS_API_CALL_SUCCESS:
      const details = {
        XHRStatus: 'ready',
        records: { ...action.userDetail },
      };
      return {
        ...state,
        fetching: false,
        userDetail: details,
        error: null,
      };

    case actionTypes.FETCH_USERS_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        userDetail: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default fetchUserDetails;
