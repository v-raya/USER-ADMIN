export const selectUserRecords = state => {
  console.log('usersList State', state);
  const usersObject = state.fetchUserList ? state.fetchUserList.userList : null;
  return usersObject ? usersObject.records : [];
};
