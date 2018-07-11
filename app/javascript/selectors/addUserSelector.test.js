import { addUserRecords } from './addUserSelector';

describe('selectors', () => {
  describe('#addUserRecords', () => {
    it('selects the user records', () => {
      const state = {
        addUser: {
          addNewUser: {
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
        },
        other_stuff: { bad: 'ignore' },
      };
      expect(addUserRecords(state)).toEqual({
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
      });
    });

    it('selects empty users', () => {
      const state = {
        fetch: {},
        other_stuff: { bad: 'ignore' },
      };
      expect(addUserRecords(state)).toEqual('');
    });

    it('selects no users', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(addUserRecords(state)).toEqual('');
    });
  });
});
