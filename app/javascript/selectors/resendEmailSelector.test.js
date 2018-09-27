import { resendEmail } from './resendEmailSelector';

describe('#selectDetailRecords', () => {
  it('selects the statusMessage as Success', () => {
    const state = {
      resendRegistrationEmail: {
        resendEmailStatus: 200,
      },
    };
    expect(resendEmail(state)).toEqual('Success');
  });

  it('selects the statusMessage as Failure', () => {
    const state = {
      resendRegistrationEmail: {
        resendEmailStatus: 500,
      },
    };
    expect(resendEmail(state)).toEqual('Failure');
  });

  it('returns failure when resendRegistrationEmail is not available', () => {
    const state = {
      resendRegistrationEmail: {},
    };
    expect(resendEmail(state)).toEqual('Failure');
  });
});
