export const userName = state => {
  const lastName = state.userList.userLastName
    ? state.userList.userLastName
    : '';
  const firstName = state.userList.userFirstName
    ? state.userList.userFirstName
    : '';
  return firstName + ' ' + lastName;
};
