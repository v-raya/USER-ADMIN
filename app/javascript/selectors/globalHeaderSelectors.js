import safeGet from 'lodash.get'

export const userName = state => {
  const lastName = safeGet(state, 'userList.adminAccountDetails.last_name', '')
  const firstName = safeGet(state, 'userList.adminAccountDetails.first_name', '')
  return `${firstName} ${lastName}`
}
