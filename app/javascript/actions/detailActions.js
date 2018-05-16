import { FETCH_DETAILS_API_CALL_REQUEST } from './actionTypes';

export function fetchDetailsActions(id) {
  return { type: FETCH_DETAILS_API_CALL_REQUEST, payload: { id } };
}
