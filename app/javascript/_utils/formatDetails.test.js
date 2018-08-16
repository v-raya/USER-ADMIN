import { formatPhoneNumber } from './formatDetails';

describe('formatPhoneNumber', () => {
  describe('When phone and extension is available ', () => {
    it('returns both with phone Ext ', () => {
      const details = {
        phone_number: '1234567890',
        phone_extension_number: '011',
      };
      expect(
        formatPhoneNumber(details.phone_number, details.phone_extension_number)
      ).toEqual('1234567890 Ext 011');
    });
  });

  describe('When only phone exists & extension is not available ', () => {
    it('returns just phone ', () => {
      const details = {
        phone_number: '1234567890',
      };
      expect(
        formatPhoneNumber(details.phone_number, details.phone_extension_number)
      ).toEqual('1234567890');
    });
  });

  describe('When only phone exists & extension is 0 ', () => {
    it('returns just phone ', () => {
      const details = {
        phone_number: '1234567890',
        phone_extension_number: '0',
      };
      expect(
        formatPhoneNumber(details.phone_number, details.phone_extension_number)
      ).toEqual('1234567890');
    });
  });

  describe('When only phone extension is available without phone ', () => {
    it('returns empty ', () => {
      const details = {
        phone_extension_number: '12345',
      };
      expect(
        formatPhoneNumber(details.phone_number, details.phone_extension_number)
      ).toEqual('');
    });
  });
});
