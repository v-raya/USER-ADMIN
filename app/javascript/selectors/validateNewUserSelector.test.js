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
            },
          },
        },
      };
      expect(selectNewUserRecords(state)).toEqual({
        county_name: 'first',
        last_name: 'third',
      });
    });

    it('returns empty array when permissions are not available', () => {
      const state = {
        validateNewUser: {},
      };
      expect(selectNewUserRecords(state)).toEqual({});
    });

    it('selects no permissions', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(selectNewUserRecords(state)).toEqual({});
    });
  });
});
