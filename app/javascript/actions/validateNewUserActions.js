import { VALIDATE_NEW_USER_API_CALL_REQUEST } from './actionTypes';

export function validateNewUserActions(email, racfid) {
  return {
    type: VALIDATE_NEW_USER_API_CALL_REQUEST,
    payload: { email: email, racfid: racfid },
  };
}
