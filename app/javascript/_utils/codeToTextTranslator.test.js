import { userStatusTranslator } from './codeToTextTranslator';

describe('#userStatusTranslator', () => {
  it('return a description based on user status value ', () => {
    expect(userStatusTranslator('UNCONFIRMED')).toEqual(
      'User has been created but not confirmed.'
    );
    expect(userStatusTranslator('CONFIRMED')).toEqual(
      'User has been confirmed.'
    );
    expect(userStatusTranslator('ARCHIVED')).toEqual(
      'User is no longer active.'
    );
    expect(userStatusTranslator('COMPROMISED')).toEqual(
      'User is disabled due to a potential security threat.'
    );
    expect(userStatusTranslator('UNKNOWN')).toEqual(
      'User status is not known.'
    );
    expect(userStatusTranslator('RESET_REQUIRED')).toEqual(
      'Need to reset user.'
    );
    expect(userStatusTranslator('FORCE_CHANGE_PASSWORD')).toEqual(
      'User has never logged in.'
    );
    expect(userStatusTranslator('ASDFGADFASD')).toEqual('');
    expect(userStatusTranslator('')).toEqual('');
  });
});
