import {
  FETCH_USERS_API_CALL_REQUEST,
  USER_LIST_SET_PAGE_SIZE,
  USER_LIST_SET_PAGE,
  USER_LIST_SET_SEARCH,
  USER_LIST_SET_SORT,
  USER_LIST_SET_NEXT_SEARCH,
} from './actionTypes';

// /**
//  * Set search query for people search
//  * @param {lastName} [lastName=''] last name search
//  */
// export function fetchUsersActions(lastName = '') {
//   return {
//     type: FETCH_USERS_API_CALL_REQUEST,
//     payload: { lastName },
//   };
// }

export const searchUsers = params => ({
  type: FETCH_USERS_API_CALL_REQUEST,
  payload: params,
});

/**
 * Set number of records per page
 * @param {number} size Integer number of records per page
 */
export const setPageSize = size => ({
  type: USER_LIST_SET_PAGE_SIZE,
  payload: size,
});

/**
 * Set the current page of paged results
 * @param {number} pageNumber Integer page number of paged results
 */
export const setPage = pageNumber => ({
  type: USER_LIST_SET_PAGE,
  payload: { pageNumber },
});

/**
 * Set search
 * @param {Object[]} query
 * @param {string} query[].field Identifier for the field on which to search
 * @param {string|number|boolean} query[].value Value on which to search
 */
export const setSearch = query => ({
  type: USER_LIST_SET_SEARCH,
  payload: query,
});

/**
 * Updates the "preflight" search string for `last_name`)
 * @param {string} nextSearch search string
 */
export const setNextSearch = nextSearch => ({
  type: USER_LIST_SET_NEXT_SEARCH,
  payload: nextSearch,
});

/**
 * Sets the sort criteria for the table
 * @param {Array<{ field: string, desc?: boolean }>} sort Array of applied sorts
 */
export const setSort = sort => ({
  payload: sort,
  type: USER_LIST_SET_SORT,
});
