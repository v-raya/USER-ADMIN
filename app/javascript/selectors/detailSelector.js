import safeGet from 'lodash.get';

export const selectDetailRecords = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null;
  const userDetails = usersObject ? usersObject.records : {};
  userDetails.enabled === true || userDetails.enabled === 'Active'
    ? (userDetails.enabled = 'Active')
    : (userDetails.enabled = 'Inactive');
  return userDetails;
};

export const permissionsList = state =>
  safeGet(state, 'fetchPermissions.permissions.permissions', []);
