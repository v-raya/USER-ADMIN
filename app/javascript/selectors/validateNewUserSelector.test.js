import { selectNewUserRecords } from './validateNewUserSelector';

describe('selectors', () => {
  describe('#selectNewUserRecords', () => {
    it('selects the New User detail records ', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {
            records: {
              county_name: 'first',
              last_name: 'third',
              roles: [],
            },
          },
        },
      };
      expect(selectNewUserRecords(state)).toEqual({
        county_name: 'first',
        last_name: 'third',
        roles: ['CWS-worker'],
      });
    });

    it('roles set to default value  when verifyNewUserDetails are not available', () => {
      const state = {
        validateNewUser: {},
      };
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      });
    });

    it('roles set to default value  when user object not available', () => {
      const state = {
        validateNewUser: {
          verifyUserDetails: {
            records: {
              user: {},
            },
          },
        },
      };
      expect(selectNewUserRecords(state)).toEqual({
        user: {
          roles: ['CWS-worker'],
        },
      });
    });

    it('selects no details', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(selectNewUserRecords(state)).toEqual({
        roles: ['CWS-worker'],
      });
    });
  });
});