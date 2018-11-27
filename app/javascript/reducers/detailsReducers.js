import * as actionTypes from '../actions/actionTypes'

function fetchDetails(
  state = {
    details: null,
    fetching: false,
    isEdit: false,
    displayAlert: false,
    disableActionBtn: false,
    resendEmailUserId: [],
    resendEmailStatus: null,
  },
  action
) {
  switch (action.type) {
    case actionTypes.FETCH_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.FETCH_DETAILS_API_CALL_SUCCESS:
      const userRecords = {
        XHRStatus: 'ready',
        records: { ...action.details },
      }

      return {
        ...state,
        fetching: false,
        details: userRecords,
        error: null,
        isEdit: false,
        displayAlert: false,
        resendEmailUserId: state.resendEmailUserId,
      }

    case actionTypes.FETCH_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        details: null,
        error: action.error,
        displayAlert: false,
      }

    case actionTypes.CLEAR_USER_DETAILS: {
      return {
        details: null,
        fetching: false,
        displayAlert: false,
        resendEmailUserId: state.resendEmailUserId,
      }
    }

    case actionTypes.HANDLE_EDIT_BUTTON_CHANGE: {
      return {
        ...state,
        isEdit: action.payload.value,
        displayAlert: false,
        disableActionBtn: true,
      }
    }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_REQUEST:
      return { ...state, fetching: true, saveDetailsError: null }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        saveDetailsError: null,
        isEdit: false,
        displayAlert: true,
      }

    case actionTypes.SAVE_USER_DETAILS_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        isEdit: true,
        saveDetailsError: action.error,
        displayAlert: true,
      }

    case actionTypes.HANDLE_DROPDOWN_CHANGE: {
      return {
        ...state,
        displayAlert: false,
        disableActionBtn: false,
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
      }
    }

    default:
      return state
  }
}

export default fetchDetails
