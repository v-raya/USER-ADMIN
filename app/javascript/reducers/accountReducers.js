import * as actionTypes from '../actions/actionTypes';

function fetchAccount(state = { account: null, fetching: false }, action) {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNT_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS:
      const accountRecord = {
        XHRStatus: 'ready',
        account: { ...action.account },
      };
      return {
        ...state,
        fetching: false,
        account: accountRecord,
        error: null,
      };

    case actionTypes.FETCH_ACCOUNT_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        account: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export default fetchAccount;
