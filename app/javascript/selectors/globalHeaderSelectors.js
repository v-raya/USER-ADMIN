export const userName = state => {
  const lastName = state.userList.account
    ? state.userList.account.last_name
    : '';
  const firstName =
    state.userList.account && state.userList.account.first_name
      ? state.userList.account.first_name
      : '';
  return firstName + ' ' + lastName;
};
