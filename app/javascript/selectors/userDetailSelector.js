export const selectUserDetailRecords = state => {
  const usersObject = state.fetchUserDetails
    ? state.fetchUserDetails.userDetail
    : null;
  return usersObject ? usersObject.records : {};
};
