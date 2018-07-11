export const selectNewUserRecords = state => {
  const usersObject = state.validateNewUser
    ? state.validateNewUser.verifyUserDetails
    : null;
  const userDetails = usersObject ? usersObject.records : {};
  const user = userDetails.user ? userDetails.user : userDetails;
  user.roles ? (user.roles = ['CWS-worker']) : (user.roles = ['CWS-worker']);
  return userDetails;
};
