export const getAdminOfficeIDs = account => {
  if (
    account &&
    account.admin_office_ids &&
    !isRoleAvailable(account, 'Super-admin') &&
    !isRoleAvailable(account, 'State-admin') &&
    !isRoleAvailable(account, 'County-admin') &&
    account.roles.includes('Office-admin')
  ) {
    return account.admin_office_ids
  } else return []
}

const isRoleAvailable = (userAccount, role) => {
  return userAccount.roles.includes(role)
}
