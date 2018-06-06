export const selectDetailRecords = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null;
  const userDetails = usersObject ? usersObject.records : {};
  userDetails.enabled === undefined
    ? (userDetails.enabled = '')
    : userDetails.enabled
      ? (userDetails.enabled = 'Active')
      : (userDetails.enabled = 'Inactive');
  return userDetails;
};
