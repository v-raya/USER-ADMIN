import {
  permissionListToOptions,
  officesListToOptions,
  roleListToOptions,
  toFullName,
  userStatusFormat,
  lastLoginDate,
  translateOffice,
  getOfficeTranslator,
} from './constants';

describe('helpers', () => {
  describe('#permissionListToOptions', () => {
    it('renders a permissions list', () => {
      const items = [
        {
          name: 'permission1',
          description: 'permission1',
        },
      ];
      expect(permissionListToOptions(items)).toEqual([
        {
          value: 'permission1',
          label: 'permission1',
        },
      ]);
    });
  });

  describe('#roleListToOptions', () => {
    it('renders a role list', () => {
      const items = [
        {
          id: 'role1',
          name: 'Role One',
        },
      ];
      expect(roleListToOptions(items)).toEqual([
        {
          value: 'role1',
          label: 'Role One',
        },
      ]);
    });
  });

  describe('#officesListToOptions', () => {
    it('renders a offices list', () => {
      const items = [
        {
          office_id: 'office_id_value',
          office_name: 'offices1',
        },
      ];
      expect(officesListToOptions(items)).toEqual([
        {
          value: 'office_id_value',
          label: 'offices1',
        },
      ]);
    });
  });

  describe('toFullName', () => {
    it('renders a full name', () => {
      expect(toFullName({ first_name: 'First', last_name: 'Last' })).toEqual(
        'Last, First'
      );
    });
  });

  describe('userStatusFormat', () => {
    it('renders Active  for enabled', () => {
      expect(userStatusFormat({ enabled: true })).toEqual('Active');
    });

    it('renders Activefor disabled', () => {
      expect(userStatusFormat({ enabled: false })).toEqual('Inactive');
    });
  });

  describe('#lastLoginDate', () => {
    it('renders date in MM/DD/YYYY format', () => {
      expect(
        lastLoginDate({ last_login_date_time: '2013-03-05 08:23:18' })
      ).toEqual('03/05/2013 08:23:18');
    });

    it('renders empty when date does not exists', () => {
      expect(lastLoginDate({ last_login_date_time: undefined })).toEqual('');
    });
  });

  describe('#translateOffice', () => {
    const offices = [
      { office_id: 'north', office_name: 'North Office' },
      { office_id: 'south', office_name: 'South Office' },
    ];
    it('renders the name of an office given a record containing office_id', () => {
      expect(translateOffice({ office_id: 'north' }, offices)).toEqual(
        'North Office'
      );
    });

    it('renders the id if no office was found', () => {
      expect(translateOffice({ office_id: 'wrong' }, offices)).toEqual('wrong');
    });

    it('renders a safe message if no office was assigned', () => {
      expect(translateOffice({ first_name: 'Someone' }, offices)).toEqual('');
    });
  });

  describe('#getOfficeTranslator', () => {
    const translate = getOfficeTranslator([
      { office_id: 'north', office_name: 'North Office' },
      { office_id: 'south', office_name: 'South Office' },
    ]);

    it('returns a translator function which can translate office_ids', () => {
      expect(translate({ office_id: 'north' })).toEqual('North Office');
      expect(translate({ office_id: 'south' })).toEqual('South Office');
    });

    it('returns a translator which returns the office_id itself when not found', () => {
      expect(translate({ office_id: 'west' })).toEqual('west');
    });

    it('returns a translator which returns empty-string when no office id is supplied', () => {
      expect(translate({})).toEqual('');
    });
  });
});
