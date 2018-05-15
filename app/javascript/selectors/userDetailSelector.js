export const selectUserDetailRecords = state => {
  const userDetailObject = state.fetchUserDetails
    ? state.fetchUserDetails.userDetails
    : null;

  return userDetailObject ? userDetailObject.records : [];
};
