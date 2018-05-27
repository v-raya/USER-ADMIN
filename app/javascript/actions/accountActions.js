import { FETCH_ACCOUNT_API_CALL_REQUEST } from './actionTypes';

export function fetchAccountActions(token) {
  return { type: FETCH_ACCOUNT_API_CALL_REQUEST, payload: { token } };
}
