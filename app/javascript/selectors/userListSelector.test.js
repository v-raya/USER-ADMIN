import { selectUserRecords } from './userListSelector';

describe('selectors', () => {
  describe('#selectUserRecords', () => {
    it('selects the user records', () => {
      const state = {
        fetchUserList: {
          userList: {
            0: {
              records: { message: 'first', 0: 'second', 1: 'third' },
            },
          },
        },
        other_stuff: { bad: 'ignore' },
      };
      expect(selectUserRecords(state)).toEqual({
        message: 'first',
        0: 'second',
        1: 'third',
      });
    });

    it('selects empty users', () => {
      const state = {
        fetch: {},
        other_stuff: { bad: 'ignore' },
      };
      expect(selectUserRecords(state)).toBe(null);
    });

    it('selects no users', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(selectUserRecords(state)).toBe(null);
    });
  });
});
