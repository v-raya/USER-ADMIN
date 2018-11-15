import { selectResendEmailStatus, disableResendEmailButton, selectResendEmailUserId } from './resendEmailSelector'

describe('#selectDetailRecords', () => {
  it('returns the statusMessage as Success', () => {
    const state = {
      fetchDetails: {
        resendEmailStatus: 200,
      },
    }
    expect(selectResendEmailStatus(state)).toEqual('Success')
  })

  it('returns the statusMessage as Failure', () => {
    const state = {
      fetchDetails: {
        resendEmailStatus: 500,
      },
    }
    expect(selectResendEmailStatus(state)).toEqual('Failure')
  })

  it('returns failure when fetchDetails is not available', () => {
    const state = {
      fetchDetails: {},
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
      fetchDetails: {
        resendEmailUserId: 'id1',
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
        resendEmailUserId: ['id1', 'id2'],
        resendEmailStatus: 200,
        fetching: false,
        error: null,
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
        resendEmailUserId: ['id3', 'id2'],
        resendEmailStatus: 200,
        fetching: false,
        error: null,
      },
    }
    expect(disableResendEmailButton(state)).toBe(false)
  })
})
