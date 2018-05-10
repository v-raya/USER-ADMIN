export const selectUserRecords = state => {
  const usersObject = state.fetchUserList ? state.fetchUserList.userList : null;
  return usersObject ? usersObject[0].records : null;
};
