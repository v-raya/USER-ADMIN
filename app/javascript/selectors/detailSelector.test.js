import {
  selectDetailRecords,
  permissionsList,
  checkEditDisable,
  selectUserDetailObject,
} from './detailSelector';

describe('selectors', () => {
  describe('#selectUserDetailObject', () => {
    it('selects the user detail object when records exists', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              editable: true,
              roles: ['SomeRole'],
              user: {
                county_name: 'first',
                enabled: true,
                id: '12',
                name: 'third',
              },
            },
          },
        },
      };
      expect(selectUserDetailObject(state)).toEqual({
        editable: true,
        roles: ['SomeRole'],
        user: { county_name: 'first', enabled: true, id: '12', name: 'third' },
      });
    });

    it('selects the user detail object when fetchDetails does not exist', () => {
      const state = {};
      expect(selectUserDetailObject(state)).toEqual(null);
    });

    it('selects the user detail object when fetchDetails exist', () => {
      const state = {
        fetchDetails: {},
      };
      expect(selectUserDetailObject(state)).toEqual(null);
    });

    it('selects the user detail object when details are empty', () => {
      const state = {
        fetchDetails: {
          details: {},
        },
      };
      expect(selectUserDetailObject(state)).toEqual(undefined);
    });
  });

  describe('#selectDetailRecords', () => {
    it('selects the user detail records when enabled is true', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              user: {
                county_name: 'first',
                enabled: true,
                id: '12',
                name: 'third',
              },
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        id: '12',
        enabled: true,
        name: 'third',
      });
    });

    it('selects the user detail records when enabled is false', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              user: {
                county_name: 'first',
                enabled: false,
                id: '12',
                name: 'third',
              },
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        id: '12',
        enabled: false,
        name: 'third',
      });
    });

    it('selects the user detail records when enabled is some other value', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              user: {
                county_name: 'first',
                enabled: 'Not a boolean Value',
                id: '12',
                name: 'third',
              },
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        enabled: 'Not a boolean Value',
        id: '12',
        name: 'third',
      });
    });

    it('returns empty when fetchDetails does not exit', () => {
      const state = {};
      expect(selectDetailRecords(state)).toEqual({});
    });
  });

  describe('#permissionsList', () => {
    it('selects the permissions when availble', () => {
      const expectedValue = [
        { name: 'foo-name', description: 'foo-desc' },
        { name: 'bar-name', description: 'bar-desc' },
      ];
      const state = {
        fetchPermissions: {
          permissions: {
            XHRStatus: 'ready',
            permissions: [
              { name: 'foo-name', description: 'foo-desc' },
              { name: 'bar-name', description: 'bar-desc' },
            ],
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

  describe('#checkEditDisable', () => {
    it('return true when editable is false', () => {
      const state = {
        fetchDetails: {
          details: {
            XHRStatus: 'ready',
            records: {
              editable: false,
              user: {},
            },
          },
        },
      };
      expect(checkEditDisable(state)).toEqual(true);
    });

    it('return the false if editable is true', () => {
      const state = {
        fetchDetails: {
          details: {
            XHRStatus: 'ready',
            records: {
              editable: true,
              user: {},
            },
          },
        },
      };
      expect(checkEditDisable(state)).toEqual(false);
    });

    it('return the true if editable is null', () => {
      const state = {
        fetchDetails: {
          details: {
            XHRStatus: 'ready',
            records: {
              editable: null,
              user: {},
            },
          },
        },
      };
      expect(checkEditDisable(state)).toEqual(true);
    });

    it('return the true if editable is undefined ', () => {
      const state = {
        fetchDetails: {
          details: {
            XHRStatus: 'ready',
            records: {
              editable: undefined,
              user: {},
            },
          },
        },
      };
      expect(checkEditDisable(state)).toEqual(true);
    });
  });
});
