export const selectDetailRecords = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null;
  const userDetails = usersObject ? usersObject.records : {};
  console.log('status ', userDetails.enabled);
  if (userDetails.enabled !== true) {
    userDetails.enabled = 'Active';
  } else {
    userDetails.enabled = 'Inactive';
  }
  // const userStatus = userDetails.enabled
  //   ? userDetails.enabled === true
  //   : 'Active';
  return userDetails;
};
