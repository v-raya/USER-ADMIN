import { formatPhoneNumberWithExt, formatPhoneNumber, checkDate, formatSelectedRoles, formatDate } from './formatters'

describe('#formatPhoneNumberWithExt', () => {
  describe('When phone & extension exists ', () => {
    it('returns phone & Extension with Ext text ', () => {
      const phoneNumber = '1112222333'
      const phoneExtensionNumber = '011'

      expect(formatPhoneNumberWithExt(phoneNumber, phoneExtensionNumber)).toEqual('(111) 222-2333 Ext 011')
    })
  })

  describe('When phone_number exists without extension', () => {
    it('returns phone with ext ', () => {
      const phoneNumber = '1114445555'
      const phoneExtensionNumber = undefined
      expect(formatPhoneNumberWithExt(phoneNumber, phoneExtensionNumber)).toEqual('(111) 444-5555 Ext')
    })
  })

  describe('When phone_extension_number exists without phone_number ', () => {
    it('returns just empty ', () => {
      const phoneNumber = null
      const phoneExtensionNumber = '111'
      expect(formatPhoneNumberWithExt(phoneNumber, phoneExtensionNumber)).toEqual('')
    })
  })

  describe('When no phone and no extension', () => {
    it('returns just empty ', () => {
      expect(formatPhoneNumberWithExt(null, null)).toEqual('')
    })
  })

  describe('#formatPhoneNumber ', () => {
    it('processes an empty string', () => {
      expect(formatPhoneNumber('')).toEqual('')
    })

    it('should return formatted number when given a 10 digit number', () => {
      expect(formatPhoneNumber('1234567890')).toEqual('(123) 456-7890')
    })

    it('should return null when given a less than 10 digit number', () => {
      expect(formatPhoneNumber('12345')).toEqual('')
    })

    it('should return null when given a greater than 10 digit number', () => {
      expect(formatPhoneNumber('12345678901')).toEqual('')
    })

    it('should return null when used alphabets', () => {
      expect(formatPhoneNumber('abcd')).toEqual('')
    })
  })
})

describe('#formatDate', () => {
  describe('When date exists ', () => {
    it('with different format', () => {
      const details = {
        start_date: '2001-09-01',
      }
      expect(formatDate(details.start_date)).toEqual('09/01/2001')
    })
  })

  describe('When date not exists ', () => {
    it('returns just empty ', () => {
      const details = {
        start_date: null,
      }
      expect(formatDate(details.start_date)).toEqual('')
    })
  })
})

describe('#checkDate', () => {
  it('when data not exists returns just empty ', () => {
    const details = {
      last_login_date: null,
    }
    expect(checkDate(details.last_login_date)).toEqual('')
  })

  it('formats the date, time to 12hr format when time is given in 24hr format', () => {
    const details = {
      last_login_date: '2001-09-01 21:23:18',
    }
    expect(checkDate(details.last_login_date)).toEqual('September 1, 2001 09:23 PM')
  })

  it('formats the date & time to 12hr format and 0 infront of hrs when hrs > 12', () => {
    const details = {
      last_login_date: '2001-09-01 20:23:18',
    }
    expect(checkDate(details.last_login_date)).toEqual('September 1, 2001 08:23 PM')
  })

  it('returns empty when date is null', () => {
    const details = {
      last_login_date: null,
    }
    expect(checkDate(details.last_login_date)).toEqual('')
  })

  it('returns empty when date is undefined', () => {
    const details = {
      last_login_date: undefined,
    }
    expect(checkDate(details.last_login_date)).toEqual('')
  })

  it('returns 1st as date when date is passed with year and month', () => {
    const details = {
      last_login_date: '2013-03 08:23:18',
    }
    expect(checkDate(details.last_login_date)).toEqual('March 1, 2013 08:23 AM')
  })

  it('formats the date & time to 12hr format when time is in 24hr format & hours is equal to 12', () => {
    const details = {
      last_login_date: '2001-09-01 12:23:18',
    }
    expect(checkDate(details.last_login_date)).toEqual('September 1, 2001 12:23 PM')
  })
})

describe('#formatSelectedRoles', () => {
  const list = [
    { value: 'foo', label: 'FOO_DESC' },
    { value: 'bar', label: 'BAR_DESC' },
    { value: 'quo', label: 'QUO_DESC' },
    { value: 'qux', label: 'QUX_DESC' },
  ]
  it('return first index of the array ', () => {
    expect(formatSelectedRoles(['foo', 'bar'], list)).toEqual('FOO_DESC')
    expect(formatSelectedRoles(['qux'], list)).toEqual('QUX_DESC')
  })

  it('return empty when there is no role ', () => {
    expect(formatSelectedRoles('', list)).toEqual('')
  })

  it('return original-id when it is not in the list ', () => {
    expect(formatSelectedRoles(['bad'], list)).toEqual('bad')
  })

  it('return empty string when role is empty array', () => {
    expect(formatSelectedRoles([], list)).toEqual('')
  })

  it('return original ID when empty list is passed', () => {
    expect(formatSelectedRoles(['good'], [])).toEqual('good')
  })
})
