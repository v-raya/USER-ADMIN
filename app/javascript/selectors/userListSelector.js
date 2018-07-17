export const selectUserRecords = state => {
  if (!state.userList) return [];
  return Array.isArray(state.userList.users) ? state.userList.users : [];
};

export const isLoading = state => {
  return state.userList.fetching || false;
};
