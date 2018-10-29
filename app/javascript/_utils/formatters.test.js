import {
  formatPhoneNumberWithExt,
  formatDate,
  formatSelectedPermissions,
  formatPhoneNumber,
  checkDate,
  formatSelectedRoles,
} from './formatters';

describe('#formatPhoneNumberWithExt', () => {
  describe('When phone & extension exists ', () => {
    it('returns phone & Extension with Ext text ', () => {
      const details = {
        phone_number: '1112222333',
        phone_extension_number: '011',
      };
      expect(formatPhoneNumberWithExt(details)).toEqual(
        '(111) 222-2333 Ext 011'
      );
    });
  });

  describe('When phone_number exists without extension', () => {
    it('returns phone with ext ', () => {
      const details = {
        phone_number: '1114445555',
        phone_extension_number: undefined,
      };
      expect(formatPhoneNumberWithExt(details)).toEqual('(111) 444-5555 Ext');
    });
  });

  describe('When phone_extension_number exists without phone_number ', () => {
    it('returns just empty ', () => {
      const details = {
        phone_number: null,
        phone_extension_number: '111',
      };
      expect(formatPhoneNumberWithExt(details)).toEqual('');
    });
  });

  describe('When no phone and no extension', () => {
    it('returns just empty ', () => {
      const details = {};
      expect(formatPhoneNumberWithExt(details)).toEqual('');
    });
  });

  describe('#formatPhoneNumber ', () => {
    it('processes an empty string', () => {
      expect(formatPhoneNumber('')).toEqual(null);
    });

    it('should return formatted number when given a 10 digit number', () => {
      expect(formatPhoneNumber('1234567890')).toEqual('(123) 456-7890');
    });

    it('should return null when given a less than 10 digit number', () => {
      expect(formatPhoneNumber('12345')).toEqual(null);
    });

    it('should return null when given a greater than 10 digit number', () => {
      expect(formatPhoneNumber('12345678901')).toEqual(null);
    });

    it('should return null when used alphabets', () => {
      expect(formatPhoneNumber('abcd')).toEqual(null);
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

describe('#checkDate', () => {
  it('when data not exists returns just empty ', () => {
    const details = {
      last_login_date: null,
    };
    expect(checkDate(details.last_login_date)).toEqual('');
  });

  it('formats the date as required', () => {
    const details = {
      last_login_date: '2001-09-01 08:23:18',
    };
    expect(checkDate(details.last_login_date)).toEqual('09/01/2001 08:23:18');
  });
});

describe('#formatSelectedPermissions', () => {
  it('return a concatenated comma-delimmited string ', () => {
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
    expect(formatSelectedPermissions([], list)).toEqual(false);
    expect(formatSelectedPermissions([''], list)).toEqual('');
    expect(formatSelectedPermissions(['qux'], [])).toEqual('');
  });
});

describe('#formatSelectedRoles', () => {
  const list = [
    { id: 'foo', name: 'FOO_DESC' },
    { id: 'bar', name: 'BAR_DESC' },
    { id: 'quo', name: 'QUO_DESC' },
    { id: 'qux', name: 'QUX_DESC' },
  ];
  it('return first index of the array ', () => {
    expect(formatSelectedRoles(['foo', 'bar'], list)).toEqual('FOO_DESC');
    expect(formatSelectedRoles(['qux'], list)).toEqual('QUX_DESC');
  });

  it('return empty when there is no role ', () => {
    expect(formatSelectedRoles('', list)).toEqual('');
  });

  it('return original-id when it is not in the list ', () => {
    expect(formatSelectedRoles(['bad'], list)).toEqual('bad');
  });

  it('return empty string when role is empty array', () => {
    expect(formatSelectedRoles([], list)).toEqual('');
  });

  it('return original ID when empty list is passed', () => {
    expect(formatSelectedRoles(['good'], [])).toEqual('good');
  });
});
