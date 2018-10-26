import safeGet from 'lodash.get';

export const selectUserDetailObject = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null;
  const userData = usersObject ? usersObject.records : null;
  return userData;
};

export const possibleRoles = state =>
  safeGet(
    state,
    'fetchDetails.details.records.edit_details.roles.possible_values',
    []
  );

export const selectDetailRecords = state => {
  const userData = selectUserDetailObject(state);
  const userDetails = userData ? userData.user : {};
  return userDetails;
};

export const permissionsList = state =>
  safeGet(state, 'fetchPermissions.permissions.permissions', []);

export const rolesList = state => safeGet(state, 'fetchRoles.roles', []);

export const checkEditDisable = state =>
  !safeGet(state, 'fetchDetails.details.records.edit_details.editable');

export const disableRolesDropDown = state =>
  !safeGet(state, 'fetchDetails.details.records.edit_details.roles.editable');

export const fetchingStatus = state =>
  safeGet(state, 'fetchDetails.details.XHRStatus');
