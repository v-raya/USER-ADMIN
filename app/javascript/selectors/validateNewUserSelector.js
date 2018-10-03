export const selectNewUserRecords = state => {
  const usersObject = state.validateNewUser ? state.validateNewUser : {};
  const userDetails = usersObject.verifyUserDetails
    ? usersObject.verifyUserDetails
    : {};
  const user = userDetails.user ? userDetails.user : userDetails;
  user.roles ? (user.roles = ['CWS-worker']) : (user.roles = ['CWS-worker']);
  return userDetails;
};
