import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

function fetchUserList(state = { userList: null, fetching: false }, action) {
  switch (action.type) {
    case actionTypes.FETCH_USERS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_USERS_API_CALL_SUCCESS:
      const userRecords = [
        {
          XHRStatus: 'ready',
          records: [...action.userList],
        },
      ];
      return {
        ...state,
        fetching: false,
        userList: userRecords,
        error: null,
      };

    case actionTypes.FETCH_USERS_API_CALL_FAILURE:
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

const reducer = combineReducers({
  fetchUserList,
});

export default reducer;
