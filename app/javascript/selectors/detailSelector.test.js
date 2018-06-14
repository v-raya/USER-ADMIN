import { selectDetailRecords, permissionsList } from './detailSelector';

describe('selectors', () => {
  describe('#selectDetailRecords', () => {
    it('selects the user detail records when enabled is true', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              county_name: 'first',
              enabled: true,
              id: '12',
              name: 'third',
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        id: '12',
        enabled: 'Active',
        name: 'third',
      });
    });

    it('selects the user detail records when enabled is false', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              county_name: 'first',
              enabled: false,
              id: '12',
              name: 'third',
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        id: '12',
        enabled: 'Inactive',
        name: 'third',
      });
    });

    it('selects the user detail records when enabled is some other value', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              county_name: 'first',
              enabled: 'Not a boolean Value',
              id: '12',
              name: 'third',
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        enabled: 'Inactive',
        id: '12',
        name: 'third',
      });
    });

    it('selects no user details', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(selectDetailRecords(state)).toEqual({ enabled: 'Inactive' });
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

    it('returns empty array when permissions are not available', () => {
      const state = {
        fetchPermissions: {},
      };
      expect(permissionsList(state)).toEqual([]);
    });
  });
});
