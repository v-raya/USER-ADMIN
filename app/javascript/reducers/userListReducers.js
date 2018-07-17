import * as actionTypes from '../actions/actionTypes';

const initialValue = {
  sort: [
    {
      id: 'last_name',
      desc: false,
    },
  ],
  page: 0,
  pageSize: 10,
  nextSearch: '',
  query: [
    {
      field: 'last_name',
      value: '',
    },
  ],
  users: [],
  fetching: false,
  error: null,
};

function userListReducer(state = initialValue, { type, payload }) {
  switch (type) {
    case actionTypes.FETCH_USERS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case actionTypes.FETCH_USERS_API_CALL_SUCCESS: {
      const { users } = payload;
      return {
        ...state,
        users,
        fetching: false,
        error: null,
      };
    }

    case actionTypes.FETCH_USERS_API_CALL_FAILURE: {
      const { error } = payload;
      return {
        ...state,
        error,
        fetching: false,
        users: null,
      };
    }

    // TODO: fix FSA
    case actionTypes.USER_LIST_SET_SORT: {
      const sort = payload;
      return {
        ...state,
        sort,
      };
    }

    case actionTypes.USER_LIST_SET_NEXT_SEARCH: {
      const { nextSearch } = payload;
      return {
        ...state,
        nextSearch,
      };
    }

    case actionTypes.USER_LIST_SET_SEARCH: {
      const { query } = payload;
      return {
        ...state,
        query,
      };
    }

    // TODO: fix FSA
    case actionTypes.USER_LIST_SET_PAGE_SIZE: {
      const { pageSize } = payload;
      return { ...state, pageSize: pageSize };
    }

    default:
      return state;
  }
}

export default userListReducer;
