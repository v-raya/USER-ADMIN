import {
  FETCH_USERS_API_CALL_REQUEST,
  USER_LIST_SET_PAGE_SIZE,
  USER_LIST_SET_PAGE,
  USER_LIST_SET_SEARCH,
  USER_LIST_SET_SORT,
} from './actionTypes';

// TODO: combine search and sort ? (they are one hash of params afterall)

export function fetchUsersActions(lastName = '') {
  return {
    type: FETCH_USERS_API_CALL_REQUEST,
    payload: { lastName },
  };
}

/** Accepts an integer of recods/page */
export const setPageSize = payload => ({
  payload,
  type: USER_LIST_SET_PAGE_SIZE,
});

/** Accepts an integer page number */
export const setPage = payload => ({
  payload,
  type: USER_LIST_SET_PAGE,
});

/** Accepts a string search value */
export const setSearch = payload => ({
  payload,
  type: USER_LIST_SET_SEARCH,
});

/** Set ASC/DESC */
export const setSort = ({ field, direction }) => ({
  type: USER_LIST_SET_SORT,
  payload: {
    field,
    direction,
  },
});
