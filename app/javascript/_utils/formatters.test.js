import { formatPhoneExtension, formatDate } from './formatters';

describe('formatPhoneExtension', () => {
  describe('When phone & extension exists ', () => {
    it('returns phone & Extension with Ext text ', () => {
      const details = {
        phone_number: '1112222333',
        phone_extension_number: '011',
      };
      expect(formatPhoneExtension(details)).toEqual('1112222333 Ext 011');
    });
  });

  describe('When phone  and extension does not exists ', () => {
    it('returns just empty ', () => {
      const details = {
        phone_number: '1114445555',
        phone_extension_number: undefined,
      };
      expect(formatPhoneExtension(details)).toEqual('1114445555 Ext');
    });
  });

  describe('When no phone  and extension exists ', () => {
    it('returns just empty ', () => {
      const details = {
        phone_number: null,
        phone_extension_number: '111',
      };
      expect(formatPhoneExtension(details)).toEqual('');
    });
  });

  describe('When no phone  and no extension exists ', () => {
    it('returns just empty ', () => {
      const details = {};
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
