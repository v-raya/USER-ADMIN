import safeGet from 'lodash.get';

export const selectResendEmailStatus = state => {
  const resendEmail = state.resendRegistrationEmail
    ? state.resendRegistrationEmail.resendEmailStatus
    : null;
  const statusMessage = resendEmail === 200 ? 'Success' : 'Failure';
  return statusMessage;
};

export const selectResendEmailUserId = state => {
  const userId = state.resendRegistrationEmail
    ? state.resendRegistrationEmail.resendEmailUserId
    : null;
  return userId;
};

export const disableResendEmailButton = state => {
  const userDetailsId = safeGet(
    state,
    'fetchDetails.details.records.user.email'
  );
  const resendEmailUserId = selectResendEmailUserId(state);
  let index = -1;
  if (resendEmailUserId && resendEmailUserId.length > 0 && userDetailsId) {
    index = resendEmailUserId.findIndex(id => id === userDetailsId);
  }
  if (index > -1) return true;
  return false;
};
