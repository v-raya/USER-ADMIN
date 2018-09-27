import { resendRegistrationEmailActions } from './resendRegistrationEmailActions';
import { RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST } from './actionTypes';

describe('#resendRegistrationEmailActions', () => {
  it('returns type and payload', () => {
    const id = 'SOMEID';
    expect(resendRegistrationEmailActions(id)).toEqual({
      type: RESEND_REGISTRATION_EMAIL_API_CALL_REQUEST,
      payload: { id: id },
    });
  });
});
