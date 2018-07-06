import { CREATE_USER_API_CALL_REQUEST } from './actionTypes';

export function createUserActions(newUser) {
  return {
    type: CREATE_USER_API_CALL_REQUEST,
    payload: { newUser: newUser },
  };
}
