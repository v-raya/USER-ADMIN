import {
  selectUserRecords,
  isLoading,
  getSearchParams,
  getSerializedSearchParams,
  officesList,
} from './userListSelector';

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

  describe('getSearchParams', () => {
    it('returns the search params', () => {
      const state = {
        userList: {
          from: 0,
          size: 10,
          sort: [
            { field: 'haystack' },
            { field: 'other_haystack', desc: true },
          ],
          query: [
            {
              field: 'haystack',
              value: 'needle',
            },
          ],
        },
      };
      let searchParams;
      expect(() => (searchParams = getSearchParams(state))).not.toThrow();
      expect(searchParams.from).toEqual(0);
      expect(searchParams.size).toEqual(10);
      expect(searchParams.query).toEqual([
        { field: 'haystack', value: 'needle' },
      ]);
      expect(searchParams.sort).toEqual([
        { field: 'haystack' },
        { field: 'other_haystack', desc: true },
      ]);

      const state1 = 'some_value';
      expect(() => (searchParams = getSearchParams(state1))).not.toThrow();
      expect(getSearchParams(state1)).toEqual({});
    });
  });

  describe('getSerializedSearchParams', () => {
    it('returns the serialized json repr of search params', () => {
      const state = {
        userList: {
          size: 20,
          from: 40,
        },
      };
      let serialized;
      expect(
        () => (serialized = getSerializedSearchParams(state))
      ).not.toThrow();
      expect(serialized).toEqual(jasmine.any(String));
      // Serialization order not gauranteed so parse and test for equality
      let parsed;
      expect(
        () => (parsed = JSON.parse(decodeURIComponent(serialized)))
      ).not.toThrow();
      expect(parsed).toEqual({ size: 20, from: 40 });
    });
  });

  describe('#officesList', () => {
    it('selects the offices when available', () => {
      const expectedValue = [
        { office_name: 'foo-name' },
        { office_name: 'bar-name' },
      ];
      const state = {
        fetchOffices: {
          offices: {
            XHRStatus: 'ready',
            offices: [{ office_name: 'foo-name' }, { office_name: 'bar-name' }],
          },
        },
      };
      expect(officesList(state)).toEqual(expectedValue);
    });

    it('returns empty array when offices are not available', () => {
      const state = {
        fetchOffices: {},
      };
      expect(officesList(state)).toEqual([]);
    });
  });
});
