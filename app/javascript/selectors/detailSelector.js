export const selectDetailRecords = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null;
  const userDetails = usersObject ? usersObject.records : {};
  userDetails.enabled === true || userDetails.enabled === 'Active'
    ? (userDetails.enabled = 'Active')
    : (userDetails.enabled = 'Inactive');
  console.log('detailselector', userDetails);
  return userDetails;
};

export const permissionsList = state => {
  return state.fetchPermissions.permissions
    ? state.fetchPermissions.permissions.permissions.map(list => ({
        label: list,
        value: list,
      }))
    : [];
};
