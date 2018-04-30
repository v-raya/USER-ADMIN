export const selectUserRecords = state => {
	// console.log("state", state);
  const usersObject = state.fetchUserList ? state.fetchUserList.userList : null;
  console.log(usersObject ? usersObject.records : "not there");
  return usersObject ? usersObject.records.message : null;
};
