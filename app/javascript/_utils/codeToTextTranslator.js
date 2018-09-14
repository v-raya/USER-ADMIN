export function userStatusTranslator(status) {
  const description = {
    UNCONFIRMED: 'User has been created but not confirmed.',
    CONFIRMED: 'User has been confirmed.',
    ARCHIVED: 'User is no longer active.',
    COMPROMISED: 'User is disabled due to a potential security threat.',
    UNKNOWN: 'User status is not known.',
    RESET_REQUIRED: 'Need to reset user.',
    FORCE_CHANGE_PASSWORD: 'User has never logged in.',
  };
  return description[status] || '';
}
