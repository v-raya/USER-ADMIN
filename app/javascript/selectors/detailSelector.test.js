import {
  selectDetailRecords,
  permissionsList,
  checkEditDisableBtn,
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
      expect(checkEditDisableBtn(state)).toEqual(true);
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
        expect(checkEditDisableBtn(state)).toEqual(undefined);
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
        expect(checkEditDisableBtn(state)).toEqual(false);
      });
    });

    describe('details or account null scenarios', () => {
      it('returns undefined when only account is null', () => {
        const state = {
          fetchDetails: {
            details: {
              XHRStatus: 'ready',
              records: {
                username: null,
                id: '9a155ccc-309f-467a-b562-d4d55d76ac80',
                first_name: 'User',
                last_name: 'One',
                county_name: 'Madera',
                start_date: null,
                end_date: null,
                office: null,
                phone_number: null,
                email: 'captester123+user1@gmail.com',
                user_create_date: '2018-06-07',
                user_last_modified_date: '2018-08-29',
                last_login_date_time: null,
                enabled: 'Active',
                status: 'FORCE_CHANGE_PASSWORD',
                permissions: null,
                verification_message: null,
                verification_passed: null,
                racfid: null,
                roles: ['CWS-admin', 'CWS-worker'],
                auth_header: null,
                phone_extension_number: null,
              },
            },
            fetching: false,
            error: null,
          },
          fetchAccount: {
            account: null,
            fetching: false,
            error: null,
          },
        };
        expect(checkEditDisableBtn(state)).toEqual(undefined);
      });

      it('returns undefined when only details is null', () => {
        const state = {
          fetchDetails: {
            details: null,
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

        expect(checkEditDisableBtn(state)).toEqual(undefined);
      });

      it('returns undefined when account is null and details is null', () => {
        const state = {
          fetchDetails: {
            details: null,
            fetching: false,
            error: null,
          },
          fetchAccount: {
            account: null,
            fetching: false,
            error: null,
          },
        };
        expect(checkEditDisableBtn(state)).toEqual(undefined);
      });
    });
  });
});
