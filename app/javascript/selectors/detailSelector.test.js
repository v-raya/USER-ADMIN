import {
  selectDetailRecords,
  permissionsList,
  rolesList,
  checkEditDisable,
  fetchingStatus,
  selectUserDetailObject,
  possibleRoles,
  disableRolesDropDown,
} from './detailSelector';

describe('selectors', () => {
  let initialState = {
    fetchDetails: {
      details: {
        XHRStatus: 'ready',
        records: {
          edit_details: {
            editable: true,
            roles: { possible_values: ['role1', 'role2'] },
          },
          user: {},
        },
      },
    },
  };

  describe('#selectUserDetailObject', () => {
    it('selects the user detail object when records exists', () => {
      expect(selectUserDetailObject(initialState)).toEqual({
        edit_details: {
          editable: true,
          roles: { possible_values: ['role1', 'role2'] },
        },
        user: {},
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
    const getDetailsEnableState = isDetailsRecordsEnabled => {
      return {
        ...initialState,
        fetchDetails: {
          details: {
            records: {
              user: { enabled: isDetailsRecordsEnabled, county_name: 'first' },
            },
          },
        },
      };
    };
    it('selects the user detail records when enabled is true', () => {
      const state = getDetailsEnableState(true);
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        enabled: true,
      });
    });

    it('selects the user detail records when enabled is false', () => {
      const state = getDetailsEnableState(false);
      expect(selectDetailRecords(state)).toEqual({
        enabled: false,
        county_name: 'first',
      });
    });

    it('selects the user detail records when enabled is some other value', () => {
      const state = getDetailsEnableState('Not a boolean value');
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        enabled: 'Not a boolean value',
      });
    });

    it('returns empty when fetchDetails does not exit', () => {
      const state = {};
      expect(selectDetailRecords(state)).toEqual({});
    });
  });

  describe('#permissionsList', () => {
    it('selects the permissions when available', () => {
      const expectedValue = [
        { name: 'foo-name', description: 'foo-desc' },
        { name: 'bar-name', description: 'bar-desc' },
      ];
      const state = {
        fetchPermissions: {
          permissions: {
            XHRStatus: 'ready',
            permissions: expectedValue,
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

  describe('#rolesList', () => {
    it('selects the roles when available', () => {
      const expectedValue = [
        { id: 'foo-id', name: 'foo-name' },
        { id: 'bar-id', name: 'bar-name' },
      ];
      const state = {
        fetchRoles: {
          roles: expectedValue,
        },
      };
      expect(rolesList(state)).toEqual(expectedValue);
    });

    it('returns empty array when fetchRoles object is empty', () => {
      const state = {
        fetchRoles: {},
      };
      expect(rolesList(state)).toEqual([]);
    });

    it('returns empty array when roles is an empty array', () => {
      const state = { fetchRoles: { roles: [] } };
      expect(rolesList(state)).toEqual([]);
    });
  });

  describe('#possibleRoles', () => {
    it('selects the roles when available', () => {
      expect(possibleRoles(initialState)).toEqual(['role1', 'role2']);
    });

    it('returns empty array when roles are not available', () => {
      const state = {
        fetchDetails: {},
      };
      expect(possibleRoles(state)).toEqual([]);
    });
  });

  describe('#checkEditDisable', () => {
    const getDetailsEditableState = isDetailsEditable => {
      return {
        ...initialState,
        fetchDetails: {
          details: {
            records: { edit_details: { editable: isDetailsEditable } },
          },
        },
      };
    };
    it('return true when editable is false', () => {
      const state = getDetailsEditableState(false);
      expect(checkEditDisable(state)).toEqual(true);
    });

    it('return the false if editable is true', () => {
      const state = getDetailsEditableState(true);
      expect(checkEditDisable(state)).toEqual(false);
    });

    it('return the true if editable is null', () => {
      const state = getDetailsEditableState(null);
      expect(checkEditDisable(state)).toEqual(true);
    });

    it('return true if editable is undefined ', () => {
      const state = getDetailsEditableState(undefined);
      expect(checkEditDisable(state)).toEqual(true);
    });
  });

  describe('#disableRolesDropDown', () => {
    const getRolesEditableState = isRolesEditable => {
      return {
        ...initialState,
        fetchDetails: {
          details: {
            records: {
              edit_details: { roles: { editable: isRolesEditable } },
            },
          },
        },
      };
    };
    it('return true when editable is false', () => {
      const state = getRolesEditableState(false);
      expect(disableRolesDropDown(state)).toEqual(true);
    });

    it('return false if editable is true', () => {
      const state = getRolesEditableState(true);
      expect(disableRolesDropDown(state)).toEqual(false);
    });

    it('return true if editable is null', () => {
      const state = getRolesEditableState(null);
      expect(disableRolesDropDown(state)).toEqual(true);
    });

    it('return true if editable is undefined ', () => {
      const state = getRolesEditableState(undefined);
      expect(disableRolesDropDown(state)).toEqual(true);
    });
  });

  describe('#fetchingStatus', () => {
    it('return the value of the details XHR status', () => {
      expect(fetchingStatus(initialState)).toEqual('ready');
    });
  });
});
