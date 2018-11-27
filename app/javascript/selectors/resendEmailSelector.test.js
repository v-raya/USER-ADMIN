import { selectResendEmailDateTime, disableResendEmailButton, selectResendEmailUserId } from './resendEmailSelector'

describe('#selectResendEmailDateTime', () => {
  it('returns value when date & time exists for last_registration_resubmit_date_time', () => {
    const state = {
      resendRegistrationEmail: {
        registrationResentDateTime: {
          last_registration_resubmit_date_time: '2018-09-11 10:20:30',
        },
      },
    }
    expect(selectResendEmailDateTime(state)).toEqual('2018-09-11 10:20:30')
  })

  it('returns null when no date & time for last_registration_resubmit_date_time ', () => {
    const state = {
      resendRegistrationEmail: {
        registrationResentDateTime: {
          last_registration_resubmit_date_time: null,
        },
      },
    }
    expect(selectResendEmailDateTime(state)).toEqual(null)
  })

  it('returns empty when resendRegistrationEmail is empty ', () => {
    const state = {
      resendRegistrationEmail: {},
      resubmittedDate: null,
    }
    expect(selectResendEmailDateTime(state)).toEqual('')
  })

  it('returns empty when state is empty', () => {
    const state = {}
    expect(selectResendEmailDateTime(state)).toEqual('')
  })
})

describe('#selectResendEmailUserId', () => {
  it('returns resendEmailUserId', () => {
    const state = {
      resendRegistrationEmail: {
        resendEmailUserId: 'id1',
        resubmittedDate: null,
      },
    }
    expect(selectResendEmailUserId(state)).toEqual('id1')
  })

  it('returns null when there is no state', () => {
    const state = {}
    expect(selectResendEmailUserId(state)).toBe(null)
  })
})

describe('#disableResendEmailButton', () => {
  it('selects true when resendEmailUserId.length > 0', () => {
    const state = {
      fetchDetails: {
        details: {
          XHRStatus: 'ready',
          records: {
            user: { id: 'id1' },
          },
        },
        fetching: false,
        error: null,
      },
      resendRegistrationEmail: {
        resendEmailUserId: ['id1', 'id2', 'id3'],
        registrationResentDateTime: { user_id: 'SOME_ID', last_registration_resubmit_date_time: '2018-10-23 10:20:30' },
        fetching: false,
        error: null,
        resubmittedDate: null,
      },
    }
    expect(disableResendEmailButton(state)).toBe(true)
  })

  it('selects false when resendEmailUserId.length < 0', () => {
    const state = {
      fetchDetails: {
        details: {
          XHRStatus: 'ready',
          records: {
            user: { id: 'id1' },
          },
        },
        fetching: false,
        error: null,
      },
      resendRegistrationEmail: {
        resendEmailUserId: [],
        registrationResentDateTime: { user_id: 'SOME_ID', last_registration_resubmit_date_time: '2018-10-23 10:20:30' },
        fetching: false,
        error: null,
      },
    }
    expect(disableResendEmailButton(state)).toBe(false)
  })

  it('selects false when userDetailsId is not equal to resendEmailUserId', () => {
    const state = {
      fetchDetails: {
        details: {
          XHRStatus: 'ready',
          records: {
            user: { id: 'id1' },
          },
        },
        fetching: false,
        error: null,
      },
      resendRegistrationEmail: {
        resendEmailUserId: ['id3', 'id2'],
        registrationResentDateTime: { user_id: 'SOME_ID', last_registration_resubmit_date_time: '2018-10-23 10:20:30' },
        fetching: false,
        error: null,
      },
    }
    expect(disableResendEmailButton(state)).toBe(false)
  })
})
