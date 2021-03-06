import * as actionTypes from '../actions/actionTypes'
import { getAdminOfficeIDs } from '../_utils/checkAdminRoles'

const initialValue = {
  sort: [
    // {
    //   field: 'last_name',
    //   desc: false,
    // },
  ],
  from: 0,
  size: 50,
  query: [
    {
      field: 'last_name',
      value: '',
    },
    {
      field: 'office_ids',
      value: [],
    },
  ],
  users: [],
  fetching: false,
  error: null,
  inputData: {},
  adminAccountDetails: {},
  includeInactive: false,
}

function userListReducer(state = initialValue, { type, payload, error, meta }) {
  switch (type) {
    case actionTypes.FETCH_USERS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null, query: payload.query }

    case actionTypes.FETCH_USERS_API_CALL_SUCCESS: {
      const {
        records: users,
        meta: { total, request },
      } = payload
      return {
        ...state,
        users,
        ...request,
        total,
        fetching: false,
        error: null,
      }
    }

    case actionTypes.FETCH_USERS_API_CALL_FAILURE: {
      return {
        ...state,
        error,
        fetching: false,
        users: null,
      }
    }

    // TODO: fix FSA
    case actionTypes.USER_LIST_SET_SORT: {
      const sort = payload
      return {
        ...state,
        sort,
      }
    }

    case actionTypes.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        inputData: {
          ...state.inputData,
          [payload.key]: payload.value,
        },
      }

    case actionTypes.HANDLE_CHECKBOX_CHANGE: {
      return {
        ...state,
        includeInactive: !state.includeInactive,
      }
    }

    case actionTypes.USER_LIST_SET_SEARCH: {
      const query = payload
      return {
        ...state,
        from: 0,
        query,
      }
    }

    // TODO: fix FSA
    case actionTypes.USER_LIST_SET_PAGE_SIZE: {
      const size = payload
      return { ...state, size, from: 0 }
    }

    case actionTypes.USER_LIST_SET_PAGE: {
      const pageIndex = payload
      return {
        ...state,
        from: pageIndex * state.size,
      }
    }

    case actionTypes.FETCH_ACCOUNT_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null }

    case actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        inputData: {
          ...state.inputData,
          officeNames:
            state.inputData.officeNames === undefined ? getAdminOfficeIDs(payload) : state.inputData.officeNames,
        },
        adminAccountDetails: payload,
        error: null,
      }

    case actionTypes.FETCH_ACCOUNT_API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        inputData: {},
        error: payload.error,
      }

    default:
      return state
  }
}

export default userListReducer
