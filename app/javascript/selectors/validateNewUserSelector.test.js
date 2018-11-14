import { selectNewUserRecords, officeName } from './validateNewUserSelector'

describe('selectors', () => {
  describe('#selectNewUserRecords', () => {
    it('selects the New User detail records ', () => {
      const state = {
        validateNewUser: {
          county_name: 'first',
          last_name: 'third',
          roles: [],
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when validateNewUser object is empty ', () => {
      const state = {
        validateNewUser: {},
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when user object is available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {
            user: {},
          },
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        user: {
          roles: ['CWS-worker'],
        },
      })
    })

    it('roles set to default value when user object not available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {},
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when verifiedUserDetails object is available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {
            county_name: 'MY COUNTY',
          },
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        county_name: 'MY COUNTY',
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when verifiedUserDetails object is not available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {},
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })

    it('roles set to default value when roles is available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {
            user: {
              roles: 'CWDS_WORKER',
              county_name: 'MY COUNTY',
            },
          },
        },
      }
      expect(selectNewUserRecords(state)).toEqual({
        user: {
          county_name: 'MY COUNTY',
          roles: ['CWS-worker'],
        },
      })
    })

    it('selects no details', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      }
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      })
    })
  })

  describe('#officeName', () => {
    const getState = officeId => {
      return {
        validateNewUser: {
          verifyUserDetails: {
            user: {
              office_id: officeId,
            },
          },
        },
        fetchOffices: {
          offices: [
            { office_id: 'north', office_name: 'North Office' },
            { office_id: 'south', office_name: 'South Office' },
          ],
        },
      }
    }
    describe('When officeId exists ', () => {
      it('returns officeName', () => {
        const state = getState('north')
        expect(officeName(state)).toEqual('North Office')
      })
    })

    describe('When officeId is an empty string', () => {
      it('returns empty string ', () => {
        const state = getState('')
        expect(officeName(state)).toEqual('')
      })
    })
  })
})
