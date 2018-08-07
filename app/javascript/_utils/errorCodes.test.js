import { verificationError } from './errorCodes';

describe('ErrorCodes', () => {
  const email = 'email@gmail.com';
  const racfid = 'abcd';
  let errorCode;

  it('should display error_messgae for existing user', () => {
    const expectedValue = `User with email: ${email} already exists in CWS-CARES`;
    errorCode = 'CAP-002';
    expect(verificationError(errorCode, email, racfid)).toEqual(expectedValue);
  });

  it('should display error_message for no user', () => {
    const expectedValue = `No user with CWS Login: ${racfid} is found in CWS/CMS`;
    errorCode = 'CAP-003';
    expect(verificationError(errorCode, email, racfid)).toEqual(expectedValue);
  });

  it('should display error_message for unauthorize', () => {
    const expectedValue =
      'You are not authorized to add users from Counties other than your own';
    errorCode = 'CAP-004';
    expect(verificationError(errorCode, email, racfid)).toEqual(expectedValue);
  });
});
