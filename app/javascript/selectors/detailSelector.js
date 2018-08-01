export const selectDetailRecords = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null;
  const userDetails = usersObject ? usersObject.records : {};
  userDetails.enabled === true || userDetails.enabled === 'Active'
    ? (userDetails.enabled = 'Active')
    : (userDetails.enabled = 'Inactive');
  return userDetails;
};

export const permissionsList = state =>
  state.fetchPermissions.permissions.permissions;
