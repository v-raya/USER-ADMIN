export const selectDetailRecords = state => {
  console.log('usersDetails state', state);
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null;
  return usersObject ? usersObject.records : {};
};
