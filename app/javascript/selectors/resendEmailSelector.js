import safeGet from 'lodash.get'

export const selectResendEmailStatus = state => {
  const resendEmail = state.fetchDetails ? state.fetchDetails.resendEmailStatus : null
  const statusMessage = resendEmail === 200 ? 'Success' : 'Failure'
  return statusMessage
}

export const selectResendEmailUserId = state => {
  const userId = state.fetchDetails ? state.fetchDetails.resendEmailUserId : null
  return userId
}

export const disableResendEmailButton = state => {
  const userDetailsId = safeGet(state, 'fetchDetails.details.records.user.id')
  const resendEmailUserId = selectResendEmailUserId(state)
  let index = -1
  if (resendEmailUserId && resendEmailUserId.length > 0 && userDetailsId) {
    index = resendEmailUserId.findIndex(id => id === userDetailsId)
  }
  if (index > -1) return true
  return false
}
