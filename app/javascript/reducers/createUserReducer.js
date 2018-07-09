import * as actionTypes from '../actions/actionTypes';

function createUser(state = { createNewUser: null, fetching: false }, action) {
  switch (action.type) {
    case actionTypes.CREATE_USER_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.CREATE_USER_API_CALL_SUCCESS:
      const newUserDetails = {
        XHRStatus: 'ready',
        records: `${action.createNewUser}`,
      };
      const splitRecords = newUserDetails.records;
      const getID = splitRecords.split('/')[6].split('?')[0];
      return {
        ...state,
        fetching: false,
        createNewUser: getID,
        error: null,
      };

    case actionTypes.CREATE_USER_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        createNewUser: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default createUser;
