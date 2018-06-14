import { selectUserRecords, selectCounty } from './userListSelector';

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

  describe('#selectCounty', () => {
    it('selects the county when availble', () => {
      const state = {
        fetchAccount: {
          account: {
            XHRStatus: 'ready',
            account: {
              user: 'RACFID',
              staff_id: '0X5',
              county_code: '20',
              county_name: 'Sacramento',
            },
          },
        },
      };
      expect(selectCounty(state)).toEqual('Sacramento');
    });

    it('display msg when county is not known', () => {
      const state = {
        fetchAccount: {
          XHRStatus: 'ready',
          user: 'RACFID',
          staff_id: '0X5',
          county_code: '20',
        },
      };
      expect(selectCounty(state)).toEqual('county not known');
    });
  });
});
