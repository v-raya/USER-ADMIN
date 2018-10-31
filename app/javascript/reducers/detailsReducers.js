import * as actionTypes from '../actions/actionTypes';

function fetchDetails(
  state = { details: null, fetching: false, isEdit: false },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_DETAILS_API_CALL_SUCCESS:
      const userRecords = {
        XHRStatus: 'ready',
        records: { ...action.details },
      };
      return {
        ...state,
        fetching: false,
        details: userRecords,
        error: null,
        isEdit: false,
      };

    case actionTypes.FETCH_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        details: null,
        error: action.error,
      };

    case actionTypes.CLEAR_USER_DETAILS: {
      return {
        details: null,
        fetching: false,
      };
    }

    case actionTypes.HANDLE_EDIT_BUTTON_CHANGE: {
      return {
        ...state,
        isEdit: action.payload.value,
      };
    }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, saveDetailsError: null };

    case actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        saveDetailsError: null,
        isEdit: false,
      };

    case actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        isEdit: true,
        saveDetailsError: action.error,
      };

    case actionTypes.HANDLE_DROPDOWN_CHANGE: {
      return {
        ...state,
        details: {
          ...state.details,
          records: {
            ...state.details.records,
            user: {
              ...state.details.records.user,
              [action.payload.name]: action.payload.value,
            },
          },
        },
      };
    }

    default:
      return state;
  }
}

export default fetchDetails;
