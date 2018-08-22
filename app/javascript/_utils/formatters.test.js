import { formatPhoneExtension, formatDate } from './formatters';

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
