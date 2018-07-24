export const selectCounty = state => {
  return state.fetchAccount.account
    ? state.fetchAccount.account.account.county_name
    : '';
};
