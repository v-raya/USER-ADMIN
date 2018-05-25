import * as actionTypes from '../actions/actionTypes';

function fetchUserList(state = { userList: null, fetching: false }, action) {
  switch (action.type) {
    case actionTypes.FETCH_USERS_API_CALL_REQUEST ||
      actionTypes.FETCH_SEARCH_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_USERS_API_CALL_SUCCESS ||
      actionTypes.FETCH_SEARCH_API_CALL_SUCCESS:
      const userRecords = {
        XHRStatus: 'ready',
        records: [...action.userList],
      };
      return {
        ...state,
        fetching: false,
        userList: userRecords,
        error: null,
      };

    case actionTypes.FETCH_USERS_API_CALL_FAILURE ||
      actionTypes.FETCH_SEARCH_API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        userList: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default fetchUserList;
