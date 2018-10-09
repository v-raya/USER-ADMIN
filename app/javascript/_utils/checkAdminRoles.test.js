import { isOfficeAdmin } from './checkAdminRoles';

describe('#isOfficeAdmin', () => {
  it('return true ', () => {
    const account = {
      admin_office_ids: ['1234'],
      roles: ['Office-admin'],
    };
    expect(isOfficeAdmin(account)).toEqual(true);
  });

  it('return false when roles have State-admin ', () => {
    const account = {
      admin_office_ids: ['1234'],
      roles: ['State-admin'],
    };
    expect(isOfficeAdmin(account)).toEqual(false);
  });

  it('return false when roles have County-admin ', () => {
    const account = {
      admin_office_ids: ['1234'],
      roles: ['County-admin'],
    };
    expect(isOfficeAdmin(account)).toEqual(false);
  });
});
