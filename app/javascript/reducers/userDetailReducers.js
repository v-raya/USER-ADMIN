import * as actionTypes from '../actions/actionTypes';
import { combineReducers } from 'redux';

function fetchUserDetails(
  state = { userDetails: null, fetching: false },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_USER_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_USER_DETAILS_API_CALL_SUCCESS:
      const userDetail = {
        XHRStatus: 'ready',
        records: { ...action.userDetails },
      };
      return {
        ...state,
        fetching: false,
        userDetails: userDetail,
        error: null,
      };

    case actionTypes.FETCH_USER_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        userDetails: null,
        error: action.error,
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  fetchUserDetails,
});

export default reducer;
