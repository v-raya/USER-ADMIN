export const selectDetailRecords = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null;
  return usersObject ? usersObject.records : {};
};

export const permissionsList = state => {
  const permissionsList = state.fetchPermissions
    ? state.fetchPermissions.permissions
    : null;
  return permissionsList ? permissionsList.permissions : [];
};
