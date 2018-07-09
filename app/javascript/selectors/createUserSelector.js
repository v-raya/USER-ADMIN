export const selectCreateUserRecords = state => {
  const usersObject = state.createUser ? state.createUser.createNewUser : '';
  return usersObject;
};
