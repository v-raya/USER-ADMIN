export const selectCreateUserRecords = state => {
  const usersObject = state.createUser ? state.createUser.createNewUser : '';
  console.log('SELECTORS RESPONSE ', usersObject);
  return usersObject;
};
