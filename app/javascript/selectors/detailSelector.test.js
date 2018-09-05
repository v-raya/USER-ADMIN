import {
  selectDetailRecords,
  permissionsList,
  checkEditDisabledBtn,
} from './detailSelector';

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

  describe('#checkEditDisableBtn', () => {
    it('return true if userName and record id matches', () => {
      const state = {
        fetchDetails: {
          details: {
            XHRStatus: 'ready',
            records: {
              id: '9a155ccc-309f-467a-b562-d4d55d76ac80',
            },
          },
          fetching: false,
          error: null,
        },
        fetchAccount: {
          account: {
            XHRStatus: 'ready',
            account: {
              userName: '9a155ccc-309f-467a-b562-d4d55d76ac80',
            },
          },
          fetching: false,
          error: null,
        },
      };
      expect(checkEditDisabledBtn(state)).toEqual(true);
    });

    describe('userName or record id null scenarios', () => {
      it('returns undefined when userName is null and record id is not empty', () => {
        const state = {
          fetchDetails: {
            details: {
              XHRStatus: 'ready',
              records: {
                id: '9a155ccc-309f-467a-b562-d4d55d76ac80',
              },
            },
            fetching: false,
            error: null,
          },
          fetchAccount: {
            account: {
              XHRStatus: 'ready',
              account: {
                userName: null,
              },
            },
            fetching: false,
            error: null,
          },
        };
        expect(checkEditDisabledBtn(state)).toEqual(undefined);
      });

      it('returns false when userName is not null and record id is null', () => {
        const state = {
          fetchDetails: {
            details: {
              XHRStatus: 'ready',
              records: {
                id: null,
              },
            },
            fetching: false,
            error: null,
          },
          fetchAccount: {
            account: {
              XHRStatus: 'ready',
              account: {
                userName: '9a155ccc-309f-467a-b562-d4d55d76ac80',
              },
            },
            fetching: false,
            error: null,
          },
        };
        expect(checkEditDisabledBtn(state)).toEqual(undefined);
      });
    });

    describe('details or account null scenarios', () => {
      it('returns undefined when only account is null', () => {
        const state = {
          fetchDetails: {
            details: {
              XHRStatus: 'ready',
              records: {
                id: '9a155ccc-309f-467a-b562-d4d55d76ac80',
              },
            },
          },
          fetchAccount: {
            account: null,
          },
        };
        expect(checkEditDisabledBtn(state)).toEqual(undefined);
      });

      it('returns undefined when account is null and details is null', () => {
        const state = {
          fetchDetails: {
            details: null,
          },
          fetchAccount: {
            account: null,
          },
        };
        expect(checkEditDisabledBtn(state)).toEqual(undefined);
      });
    });
  });
});
