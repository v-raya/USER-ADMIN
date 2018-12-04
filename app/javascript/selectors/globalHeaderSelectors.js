import safeGet from 'lodash.get'

export const userName = state => {
  const lastName = safeGet(state, 'userList.userAccountDetails.last_name', '')
  const firstName = safeGet(state, 'userList.userAccountDetails.first_name', '')
  return `${firstName} ${lastName}`
}
