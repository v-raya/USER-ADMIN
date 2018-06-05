export const selectDetailRecords = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null;
  return usersObject ? usersObject.records : {};
};

export const permissionsList = state => {
  return state.fetchPermissions.permissions
    ? state.fetchPermissions.permissions.permissions.map(list => ({
        label: list,
        value: list,
      }))
    : [];
};
