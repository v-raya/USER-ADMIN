import { validateNewUserActions } from './validateNewUserActions';
import { VALIDATE_NEW_USER_API_CALL_REQUEST } from './actionTypes';

describe('#validateNewUserActions', () => {
  it('returns type and payload', () => {
    const email = 'exampleEmail@email.com';
    const racfid = 'QWERTY';
    expect(validateNewUserActions(email, racfid)).toEqual({
      type: VALIDATE_NEW_USER_API_CALL_REQUEST,
      payload: { email: email, racfid: racfid },
    });
  });
});
