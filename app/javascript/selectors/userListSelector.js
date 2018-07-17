export const selectUserRecords = state => {
  if (!state.userList) return [];
  return Array.isArray(state.userList.users) ? state.userList.users : [];
};

export const isLoading = state => {
  return state.userList.fetching || false;
};

export const getSearchParams = ({ userList }) => {
  if (!userList) return {};
  const { from, size, sort, query } = userList;
  return {
    from,
    size,
    sort,
    query,
  };
};

export const getSerializedSearchParams = ({ userList }) => {
  return encodeURIComponent(JSON.stringify(getSearchParams({ userList })));
};
