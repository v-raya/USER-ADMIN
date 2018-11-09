export const addUserRecords = state => {
  const usersObject = state.addUser ? state.addUser.addNewUser : ''
  return usersObject
}
