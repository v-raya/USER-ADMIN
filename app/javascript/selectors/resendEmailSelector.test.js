import {
  selectResendEmailStatus,
  disableResendEmailButton,
  selectResendEmailUserId,
  resendRegistrationEmailDate,
} from './resendEmailSelector'

describe('#selectResendEmailStatus', () => {
  it('returns the statusMessage as Success', () => {
    const state = {
      resendRegistrationEmail: {
        resendEmailStatus: 200,
        resubmittedDate: null,
      },
    }
    expect(selectResendEmailStatus(state)).toEqual('Success')
  })

  it('returns the statusMessage as Failure', () => {
    const state = {
      resendRegistrationEmail: {
        resendEmailStatus: 500,
        resubmittedDate: null,
      },
    }
    expect(selectResendEmailStatus(state)).toEqual('Failure')
  })

  it('returns failure when resendRegistrationEmail is not available', () => {
    const state = {
      resendRegistrationEmail: {},
      resubmittedDate: null,
    }
    expect(selectResendEmailStatus(state)).toEqual('Failure')
  })

  it('returns failure when state is empty', () => {
    const state = {}
    expect(selectResendEmailStatus(state)).toEqual('Failure')
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
        resendEmailStatus: 200,
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
        resendEmailStatus: 200,
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
        resendEmailStatus: 200,
        fetching: false,
        error: null,
      },
    }
    expect(disableResendEmailButton(state)).toBe(false)
  })

  describe('#resendRegistrationEmailDate', () => {
    it('return date when date exists', () => {
      const state = { resendRegistrationEmail: { registrationResentDateTime: '2018-10-11 10:44' } }
      expect(resendRegistrationEmailDate(state)).toEqual('2018-10-11 10:44')
    })

    it('return empty when date is undefined', () => {
      const state = { resendRegistrationEmail: { registrationResentDateTime: undefined } }
      expect(resendRegistrationEmailDate(state)).toEqual('')
    })

    it('return empty when state is empty ', () => {
      const state = {}
      expect(resendRegistrationEmailDate(state)).toEqual('')
    })
  })
})
