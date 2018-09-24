import * as actionTypes from '../actions/actionTypes';

function fetchOffices(state = { offices: null, fetching: false }, action) {
  switch (action.type) {
    case actionTypes.FETCH_OFFICES_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_OFFICES_API_CALL_SUCCESS:
      const officesList = {
        XHRStatus: 'ready',
        offices: [...action.offices],
      };
      return {
        ...state,
        fetching: false,
        offices: officesList,
        error: null,
      };

    case actionTypes.FETCH_OFFICES_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        offices: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default fetchOffices;
