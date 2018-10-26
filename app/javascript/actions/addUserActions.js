import {
  ADD_USER_API_CALL_REQUEST,
  CLEAR_ADDED_USER_DETAILS,
} from './actionTypes';

export function addUserActions(newUser) {
  return {
    type: ADD_USER_API_CALL_REQUEST,
    payload: { newUser: newUser },
  };
}

export const clearAddedUserDetailActions = () => ({
  type: CLEAR_ADDED_USER_DETAILS,
});
