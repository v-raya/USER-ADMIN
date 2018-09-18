import * as actionTypes from '../actions/actionTypes';

function addUser(
  state = { addNewUser: null, fetching: false, error: null },
  action
) {
  switch (action.type) {
    case actionTypes.ADD_USER_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.ADD_USER_API_CALL_SUCCESS:
      const newUserDetails = {
        XHRStatus: 'ready',
        records: `${action.addNewUser}`,
      };
      const splitRecords = newUserDetails.records;
      const getID = splitRecords.split('/')[6].split('?')[0];
      return {
        ...state,
        fetching: false,
        addNewUser: getID,
        error: null,
      };

    case actionTypes.ADD_USER_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        addNewUser: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default addUser;
