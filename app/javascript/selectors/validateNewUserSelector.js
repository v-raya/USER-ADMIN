export const selectNewUserRecords = state => {
  const usersObject = state.validateNewUser
    ? state.validateNewUser.verifyUserDetails
    : null;
  return usersObject ? usersObject.records : {};
};
