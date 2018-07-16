export const selectUserRecords = state => {
  const usersObject = state.userList ? state.userList.userList : null;
  return usersObject ? usersObject.records : [];
};

export const isLoading = state => {
  return state.userList.fetching || false;
};
