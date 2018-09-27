export const resendEmail = state => {
  const resend = state.resendRegistrationEmail
    ? state.resendRegistrationEmail.resendEmailStatus
    : null;
  const statusMessage = resend === 200 ? 'Success' : 'Failure';
  return statusMessage;
};
