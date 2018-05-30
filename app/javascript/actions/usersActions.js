import { FETCH_USERS_API_CALL_REQUEST } from './actionTypes';

export function fetchUsersActions(lastName = '') {
  return {
    type: FETCH_USERS_API_CALL_REQUEST,
    payload: { lastName },
  };
}
