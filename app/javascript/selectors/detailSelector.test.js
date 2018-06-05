import { selectDetailRecords, permissionsList } from './detailSelector';

describe('selectors', () => {
  describe('#selectDetailRecords', () => {
    it('selects the user detail records', () => {
      const state = {
        fetchDetails: {
          details: {
            records: { county_name: 'first', id: '12', name: 'third' },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        id: '12',
        name: 'third',
      });
    });

    it('selects empty user details', () => {
      const state = {
        fetch: {},
        other_stuff: { bad: 'ignore' },
      };
      expect(selectDetailRecords(state)).toEqual({});
    });

    it('selects no user details', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(selectDetailRecords(state)).toEqual({});
    });
  });

  describe('#permissionsList', () => {
    it('selects the permissions when availble', () => {
      const expectedValue = [
        { label: 'Hello', value: 'Hello' },
        { label: 'Bye', value: 'Bye' },
      ];
      const state = {
        fetchPermissions: {
          permissions: {
            XHRStatus: 'ready',
            permissions: ['Hello', 'Bye'],
          },
        },
      };
      expect(permissionsList(state)).toEqual(expectedValue);
    });
  });
});
