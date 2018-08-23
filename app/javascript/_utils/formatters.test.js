import {
  formatPhoneExtension,
  formatDate,
  formatSelectedPermissions,
} from './formatters';

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

  describe('When phone_number exists without extension', () => {
    it('returns phone with ext ', () => {
      const details = {
        phone_number: '1114445555',
        phone_extension_number: undefined,
      };
      expect(formatPhoneExtension(details)).toEqual('1114445555 Ext');
    });
  });

  describe('When phone_extension_number exists without phone_number ', () => {
    it('returns just empty ', () => {
      const details = {
        phone_number: null,
        phone_extension_number: '111',
      };
      expect(formatPhoneExtension(details)).toEqual('');
    });
  });

  describe('When no phone and no extension', () => {
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

describe('renderPermissions', () => {
  it('return a concatenated comma-delimmited string', () => {
    const list = [
      { name: 'foo', description: 'FOO_DESC' },
      { name: 'bar', description: 'BAR_DESC' },
      { name: 'quo', description: 'QUO_DESC' },
      { name: 'qux', description: 'QUX_DESC' },
    ];
    expect(formatSelectedPermissions(['foo', 'bar'], list)).toEqual(
      'FOO_DESC, BAR_DESC'
    );
    expect(formatSelectedPermissions('', list)).toEqual('');
    expect(formatSelectedPermissions(['qux'], list)).toEqual('QUX_DESC');
  });
});
