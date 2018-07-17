import { selectUserRecords, isLoading } from './userListSelector';

describe('selectors', () => {
  describe('#selectUserRecords', () => {
    it('returns array of users', () => {
      const users = [];
      const state = {
        userList: {
          users,
        },
      };
      expect(selectUserRecords(state)).toBe(users);
    });

    it('returns empty array if no users defined', () => {
      const state = { userList: {} };
      expect(selectUserRecords(state)).toEqual([]);
      expect(selectUserRecords({})).toEqual([]);
    });
  });

  describe('#isLoading', () => {
    it('returns true if fetching', () => {
      const state = {
        userList: {},
      };
      expect(isLoading(state)).toEqual(false);
    });
  });
});
