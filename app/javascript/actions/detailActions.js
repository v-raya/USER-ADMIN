import {
  FETCH_DETAILS_API_CALL_REQUEST,
  CLEAR_USER_DETAILS,
} from './actionTypes';

export function fetchDetailsActions(id) {
  return { type: FETCH_DETAILS_API_CALL_REQUEST, payload: { id: id } };
}

export const clearDetails = () => ({
  type: CLEAR_USER_DETAILS,
});
