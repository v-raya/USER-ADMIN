export function verificationError(errorCode, email, racfid) {
  switch (errorCode) {
    case 'CAP-002':
      return `User with email: ${email} already exists in CWS-CARES`;
    case 'CAP-003':
      return `No user with CWS Login: ${racfid} is found in CWS/CMS`;
    case 'CAP-004':
      return `You are not authorized to add users from Counties other than your own`;
    default:
      return null;
  }
}
