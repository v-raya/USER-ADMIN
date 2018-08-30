export function verificationError(errorCode, email, racfid) {
  const message = {
    'CAP-002': `User with email: ${email} already exists in CWS-CARES`,
    'CAP-003': `No user with CWS Login: ${racfid} is found in CWS/CMS`,
    'CAP-004': `You are not authorized to add users from Counties other than your own`,
  };
  return message[errorCode];
}
