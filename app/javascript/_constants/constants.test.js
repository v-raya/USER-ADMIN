import { toFullName, userStatusFormat, lastLoginDate } from './constants';

describe('helpers', () => {
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
      expect(lastLoginDate({ last_login_date_time: '2013-03-05' })).toEqual(
        '03/05/2013'
      );
    });

    it('renders empty when date does not exists', () => {
      expect(lastLoginDate({ last_login_date_time: undefined })).toEqual('');
    });
  });
});
