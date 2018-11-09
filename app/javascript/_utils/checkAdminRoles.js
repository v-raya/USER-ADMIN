export const getAdminOfficeIDs = account => {
  if (
    account &&
    account.admin_office_ids &&
    !isStateAdmin(account) &&
    !isCountyAdmin(account) &&
    account.roles.includes('Office-admin')
  ) {
    return account.admin_office_ids
  } else return []
}
const isStateAdmin = account => {
  return account.roles.includes('State-admin')
}

const isCountyAdmin = account => {
  return account.roles.includes('County-admin')
}
