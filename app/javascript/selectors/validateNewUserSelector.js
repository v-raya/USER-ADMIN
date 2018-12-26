import { translateOfficeName } from './officeListSelector'
import { formatPhoneNumberWithExt } from '../_utils/formatters'
import safeGet from 'lodash.get'

export const selectNewUserRecords = state => {
  const usersObject = state.validateNewUser ? state.validateNewUser : {}
  const userDetails = usersObject.verifyUserDetails ? usersObject.verifyUserDetails : {}
  const user = userDetails.user ? userDetails.user : userDetails
  user.roles ? (user.roles = ['CWS-worker']) : (user.roles = ['CWS-worker'])
  return userDetails
}

export const officeName = state => {
  const officeId = safeGet(state, 'validateNewUser.verifyUserDetails.user.office_id')
  return translateOfficeName(state, officeId)
}

export const formattedPhoneNumber = state => {
  const verifyDetails = selectNewUserRecords(state)
  return formatPhoneNumberWithExt(verifyDetails.user)
}
