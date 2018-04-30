export const selectUserRecords = state => {
  const usersObject = state.fetchUserList ? state.fetchUserList.userList : null;
  return usersObject ? usersObject.records.message : null;
};
