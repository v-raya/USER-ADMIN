import * as actionTypes from '../actions/actionTypes';

function fetchRoles(state = { roles: null, fetching: false }, action) {
  switch (action.type) {
    case actionTypes.FETCH_ROLES_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_ROLES_API_CALL_SUCCESS:
      const rolesList = {
        XHRStatus: 'ready',
        roles: [...action.roles],
      };
      return {
        ...state,
        fetching: false,
        roles: rolesList.roles,
        error: null,
      };

    case actionTypes.FETCH_ROLES_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        roles: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default fetchRoles;
