import { ADD_USER_API_CALL_REQUEST } from './actionTypes';

export function addUserActions(newUser) {
  return {
    type: ADD_USER_API_CALL_REQUEST,
    payload: { newUser: newUser },
  };
}
