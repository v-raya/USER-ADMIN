export const selectUserRecords = state => {
  const usersObject = state.fetchUserList ? state.fetchUserList.userList : null;
  return usersObject ? usersObject.records : [];
};

export const isLoading = state => {
  return state.fetchUserList.fetching || false;
};
