export const selectNewUserRecords = state => {
  const usersObject = state.validateNewUser ? state.validateNewUser : {};
  const userDetails = usersObject.verifyUserDetails
    ? usersObject.verifyUserDetails
    : {};
  const roles = userDetails.verifiedUserDetails
    ? userDetails.verifiedUserDetails
    : userDetails;
  const user = roles.user ? roles.user : roles;
  user.roles ? (user.roles = ['CWS-worker']) : (user.roles = ['CWS-worker']);
  return userDetails;
};
