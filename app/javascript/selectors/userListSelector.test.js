import { selectUserRecords, selectCounty, isLoading } from './userListSelector';

describe('selectors', () => {
  describe('#selectUserRecords', () => {
    it('selects the user records', () => {
      const state = {
        fetchUserList: {
          userList: {
            records: [
              {
                0: {
                  first_name: 'username1',
                  id: '2',
                  county_name: 'mycounty',
                },
                1: {
                  first_name: 'username',
                  id: '1',
                  county_name: 'my county1',
                },
              },
            ],
          },
        },
        other_stuff: { bad: 'ignore' },
      };
      expect(selectUserRecords(state)).toEqual([
        {
          0: {
            first_name: 'username1',
            id: '2',
            county_name: 'mycounty',
          },
          1: {
            first_name: 'username',
            id: '1',
            county_name: 'my county1',
          },
        },
      ]);
    });

    it('selects empty users', () => {
      const state = {
        fetch: {},
        other_stuff: { bad: 'ignore' },
      };
      expect(selectUserRecords(state)).toEqual([]);
    });

    it('selects no users', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(selectUserRecords(state)).toEqual([]);
    });
  });

  describe('#isLoading', () => {
    it('returns true if fetching', () => {
      const state = {
        fetchUserList: {},
      };
      expect(isLoading(state)).toEqual(false);
    });
  });
});
