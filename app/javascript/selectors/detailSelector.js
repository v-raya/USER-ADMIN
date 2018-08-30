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

const getAccountUserName = state =>
  state.fetchAccount.account && state.fetchAccount.account.account.userName
    ? state.fetchAccount.account.account.userName
    : '';
const getUserDetailRecordId = state => {
  const userDetailRecord =
    state.fetchDetails.details !== null
      ? state.fetchDetails.details.records
      : '';
  const userDetailRecordId =
    userDetailRecord !== '' ? state.fetchDetails.details.records.id : '';
  return userDetailRecordId;
};

export const checkEditDisableBtn = state => {
  const accountUserName = getAccountUserName(state);
  const userDetailRecordId = getUserDetailRecordId(state);
  if (!(accountUserName === '' || userDetailRecordId === '')) {
    return accountUserName === userDetailRecordId;
  }
};
