import {
  formatPhoneExtension,
  formatDate,
  formatPermissions,
} from './formatters';

describe('formatPhoneExtension', () => {
  describe('When extension is available ', () => {
    it('returns Extension with Ext text ', () => {
      const details = {
        phone_extension_number: '011',
      };
      expect(formatPhoneExtension(details)).toEqual(' Ext 011');
    });
  });

  describe('When extension is not available ', () => {
    it('returns just empty ', () => {
      const details = {
        phone_number: '1234567890',
      };
      expect(formatPhoneExtension(details)).toEqual('');
    });
  });
});

describe('#formatDate', () => {
  describe('When date exists ', () => {
    it('with different format', () => {
      const details = {
        start_date: '2001-09-01',
      };
      expect(formatDate(details.start_date)).toEqual('09/01/2001');
    });
  });

  describe('When date not exists ', () => {
    it('returns just empty ', () => {
      const details = {
        start_date: null,
      };
      expect(formatDate(details.start_date)).toEqual('');
    });
  });
});

describe('#formattedPermissions', () => {
  it('handles undefined', () => {
    expect(formatPermissions(undefined)).toEqual([]);
  });

  it('handles nil', () => {
    expect(formatPermissions(null)).toEqual([]);
  });

  it('handles a string', () => {
    expect(formatPermissions('abc,123,xyz')).toEqual(['abc', '123', 'xyz']);
  });

  it('handles an array', () => {
    expect(formatPermissions(['abc', '123', 'xyz'])).toEqual([
      'abc',
      '123',
      'xyz',
    ]);
  });
});
