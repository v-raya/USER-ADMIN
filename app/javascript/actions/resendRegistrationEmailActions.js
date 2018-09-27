import { RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST } from './actionTypes';

export function resendRegistrationEmailActions(id) {
  return {
    type: RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST,
    payload: { id: id },
  };
}
