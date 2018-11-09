import * as actionTypes from '../actions/actionTypes'

function fetchPermissions(state = { permissions: null, fetching: false }, action) {
  switch (action.type) {
    case actionTypes.FETCH_PERMISSIONS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.FETCH_PERMISSIONS_API_CALL_SUCCESS:
      const permissionsList = {
        XHRStatus: 'ready',
        permissions: [...action.permissions],
      }
      return {
        ...state,
        fetching: false,
        permissions: permissionsList.permissions,
        error: null,
      }

    case actionTypes.FETCH_PERMISSIONS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        permissions: null,
        error: action.error,
      }
    default:
      return state
  }
}

export default fetchPermissions
