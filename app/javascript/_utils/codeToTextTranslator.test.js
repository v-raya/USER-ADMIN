import {
  userStatusDescriptionTranslator,
  userStatusTranslator,
} from './codeToTextTranslator';

describe('#userStatusDescriptionTranslator', () => {
  it('return a description based on user status value ', () => {
    expect(userStatusDescriptionTranslator('UNCONFIRMED')).toEqual(
      'User has been created but not confirmed.'
    );
    expect(userStatusDescriptionTranslator('CONFIRMED')).toEqual(
      'User has been confirmed.'
    );
    expect(userStatusDescriptionTranslator('ARCHIVED')).toEqual(
      'User is no longer active.'
    );
    expect(userStatusDescriptionTranslator('COMPROMISED')).toEqual(
      'User is disabled due to a potential security threat.'
    );
    expect(userStatusDescriptionTranslator('UNKNOWN')).toEqual(
      'User status is not known.'
    );
    expect(userStatusDescriptionTranslator('RESET_REQUIRED')).toEqual(
      'Need to reset user.'
    );
    expect(userStatusDescriptionTranslator('FORCE_CHANGE_PASSWORD')).toEqual(
      'User has never logged in.'
    );
    expect(userStatusDescriptionTranslator('ASDFGADFASD')).toEqual('');
    expect(userStatusDescriptionTranslator('')).toEqual('');
  });
});

describe('#userStatusTranslator', () => {
  it('return user friendly text based on user status value ', () => {
    expect(userStatusTranslator('CONFIRMED')).toEqual('Confirmed');
    expect(userStatusTranslator('FORCE_CHANGE_PASSWORD')).toEqual(
      'Registration Incomplete'
    );
    expect(userStatusTranslator('ASDFGADFASD')).toEqual('');
    expect(userStatusTranslator('')).toEqual('');
  });
});
