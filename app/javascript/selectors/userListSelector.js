export const selectUserRecords = state => {
  const usersObject = state.fetchUserList ? state.fetchUserList.userList : null;
  return usersObject ? usersObject.records : [];
};

export const selectCounty = state => {
  return state.fetchAccount.account
    ? state.fetchAccount.account.account.county_name
    : '';
};

export const isLoading = state => {
  return state.fetchUserList.fetching || false;
};
