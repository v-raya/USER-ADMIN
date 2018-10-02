import safeGet from 'lodash.get';

export const resendEmail = state => {
  const resend = state.resendRegistrationEmail
    ? state.resendRegistrationEmail.resendEmailStatus
    : null;
  const statusMessage = resend === 200 ? 'Success' : 'Failure';
  return statusMessage;
};

export const resendId = state => {
  const resendId = state.resendRegistrationEmail
    ? state.resendRegistrationEmail.resendEmailId
    : null;
  return resendId;
};

export const disableResendEmailButton = state => {
  const userDetailId = safeGet(state, 'fetchDetails.details.records.user.id');
  const resendEmailId = resendId(state);
  let index = -1;
  if (resendEmailId && resendEmailId.length > 0 && userDetailId) {
    index = resendEmailId.findIndex(id => id === userDetailId);
  }
  if (index > -1) return true;
  return false;
};
