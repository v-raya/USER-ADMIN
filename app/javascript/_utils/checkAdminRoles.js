export const isOfficeAdmin = account => {
  return (
    account !== undefined &&
    !isStateAdmin(account) &&
    !isCountyAdmin(account) &&
    account.roles.includes('Office-admin')
  );
};

const isStateAdmin = account => {
  return account.roles.includes('State-admin');
};

const isCountyAdmin = account => {
  return account.roles.includes('County-admin');
};
