import {
  FETCH_USERS_API_CALL_REQUEST,
  USER_LIST_SET_PAGE_SIZE,
  USER_LIST_SET_PAGE,
  USER_LIST_SET_SEARCH,
  USER_LIST_SET_SORT,
  USER_LIST_SET_NEXT_SEARCH,
} from './actionTypes';

// TODO: combine search and sort ? (they are one hash of params afterall)

export function fetchUsersActions(lastName = '') {
  return {
    type: FETCH_USERS_API_CALL_REQUEST,
    payload: { lastName },
  };
}

/**
 * Set number of records per page
 * @param {Number} pageSize
 */
export const setPageSize = pageSize => ({
  payload: { pageSize },
  type: USER_LIST_SET_PAGE_SIZE,
});

/** Accepts an integer page number */
export const setPage = payload => ({
  payload,
  type: USER_LIST_SET_PAGE,
});

export const setSearch = nextSearch => {
  return {
    type: USER_LIST_SET_SEARCH,
    payload: { search: nextSearch },
  };
};

// FIXME: Should be SEARCH and NEXTSEARCH
export const setNextSearch = nextSearch => ({
  type: USER_LIST_SET_NEXT_SEARCH,
  payload: { nextSearch },
});

/** Set ASC/DESC */
export const setSort = sort => ({
  payload: sort,
  type: USER_LIST_SET_SORT,
});
