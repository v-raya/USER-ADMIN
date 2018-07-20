import {
  FETCH_USERS_API_CALL_FAILURE,
  FETCH_USERS_API_CALL_REQUEST,
  FETCH_USERS_API_CALL_SUCCESS,
  USER_LIST_SET_NEXT_SEARCH,
  USER_LIST_SET_PAGE_SIZE,
  USER_LIST_SET_PAGE,
  USER_LIST_SET_SEARCH,
  USER_LIST_SET_SORT,
} from '../actions/actionTypes';

const initialValue = {
  sort: [
    {
      field: 'last_name',
      desc: false,
    },
  ],
  from: 0,
  size: 10,
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
    case FETCH_USERS_API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };

    case FETCH_USERS_API_CALL_SUCCESS: {
      const {
        records: users,
        meta: { total, request },
      } = payload;
      return {
        ...state,
        users,
        ...request,
        total,
        fetching: false,
        error: null,
      };
    }

    case FETCH_USERS_API_CALL_FAILURE: {
      return {
        ...state,
        error: payload.error,
        fetching: false,
        users: null,
      };
    }

    // TODO: fix FSA
    case USER_LIST_SET_SORT: {
      const sort = payload;
      return {
        ...state,
        sort,
      };
    }

    case USER_LIST_SET_NEXT_SEARCH: {
      const nextSearch = payload;
      return {
        ...state,
        nextSearch,
      };
    }

    case USER_LIST_SET_SEARCH: {
      const _query = payload;
      const query = _query.filter(({ value }) => value !== '');
      return {
        ...state,
        query,
      };
    }

    // TODO: fix FSA
    case USER_LIST_SET_PAGE_SIZE: {
      const size = payload;
      return { ...state, size };
    }

    case USER_LIST_SET_PAGE: {
      const pageIndex = payload;
      return {
        ...state,
        from: pageIndex * state.size,
      };
    }

    default:
      return state;
  }
}

export default userListReducer;
