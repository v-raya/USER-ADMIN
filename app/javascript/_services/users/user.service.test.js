import UserService from './user.service'

jest.mock('../api')
const ApiService = require('../api').default
const id = 'someid'

describe('UserService', () => {
  let getSpy

  beforeEach(() => {
    getSpy = jest.spyOn(ApiService, 'get')
  })

  describe('#search', () => {
    let getSearchSpy23
    beforeEach(() => {
      getSearchSpy23 = jest.spyOn(ApiService, 'get')
    })

    it('calls #search ApiService when query is empty', () => {
      const q = encodeURIComponent(
        JSON.stringify({
          query: [],
          sort: [],
          size: 10,
          from: 0,
        })
      )
      getSearchSpy23.mockReturnValue(Promise.resolve({}))
      UserService.search(q)
      expect(getSearchSpy23).toHaveBeenCalledWith(`/user_list?q=${q}`)
    })

    it('checks if enabled parameter value is converted to string when query is not empty', () => {
      const query = [
        {
          field: 'last_name',
          value: 'last_name_value',
        },
        {
          field: 'office_ids',
          value: ['north', 'south', 'east', 'west'],
        },
        { field: 'enabled', value: true },
      ]

      UserService.search({ query })
      const enabledQuery = query.find(obj => {
        return obj.field === 'enabled'
      })
      expect(enabledQuery.value).toEqual('true')
    })
  })

  describe('#fetch', () => {
    it('calls fetch ApiService', () => {
      const lastName = 'don'
      getSpy.mockReturnValue(Promise.resolve({}))
      UserService.fetch(lastName)
      expect(getSpy).toHaveBeenCalledWith(`/user_list?last_name=${lastName}`)
    })
  })

  describe('#fetchUserDetails', () => {
    it('calls #fetchUsersDetails ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}))
      UserService.fetchUserDetails(id)
      expect(getSpy).toHaveBeenCalledWith('/user_detail/someid')
    })
  })

  describe('#fetchPermissionsList', () => {
    it('calls #fetchPermissionsList ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}))
      UserService.fetchPermissionsList()
      expect(getSpy).toHaveBeenCalledWith('/permissions_list/')
    })
  })

  describe('#fetchOfficesList', () => {
    it('calls #fetchOfficesList ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}))
      UserService.fetchOfficesList()
      expect(getSpy).toHaveBeenCalledWith('/offices_list/')
    })
  })

  describe('#fetchRolesList', () => {
    it('calls #fetchRolesList ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}))
      UserService.fetchRolesList()
      expect(getSpy).toHaveBeenCalledWith('/roles_list/')
    })
  })

  describe('#resendRegistrationEmail', () => {
    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get')
    })

    it('calls #resendRegistrationEmail ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}))
      UserService.resendRegistrationEmail(id)
      expect(getSpy).toHaveBeenCalledWith('/resend_registration_email?id=someid')
    })
  })

  describe('#saveUserDetails', () => {
    let patchSpy
    const body = {
      enabled: true,
      permissions: ['drivethebus', 'getapuppy'],
      roles: 'RoleOne',
    }

    describe('calls #patchSpy Api Service when promise is resolved', () => {
      beforeEach(() => {
        patchSpy = jest.spyOn(ApiService, 'patch')
        patchSpy.mockReturnValue(Promise.resolve({}))
      })

      it('calls #patch ApiService', () => {
        UserService.saveUserDetails(id, {
          enabled: true,
          permissions: ['drivethebus', 'getapuppy'],
          roles: 'RoleOne',
          first_name: 'Pidgeon',
        })
        expect(patchSpy).toHaveBeenCalledWith('/user_detail/someid/save_user', body)
      })

      it('calls #patch ApiService when permission & roles are empty', () => {
        body.permissions = []
        body.roles = ''
        UserService.saveUserDetails(id, {
          enabled: true,
          permissions: [],
          roles: '',
          first_name: 'firstName',
        })
        expect(patchSpy).toHaveBeenCalledWith('/user_detail/someid/save_user', body)
      })

      it('calls #patch ApiService when isRolesDisabled is false', () => {
        UserService.saveUserDetails(
          id,
          {
            enabled: true,
            permissions: [],
            roles: ['RoleOne'],
            first_name: 'firstName',
          },
          false
        )
        expect(patchSpy).toHaveBeenCalledWith('/user_detail/someid/save_user', body)
      })

      it('calls #patch ApiService when isRolesDisabled is true', () => {
        body.roles = undefined
        UserService.saveUserDetails(
          id,
          {
            enabled: true,
            permissions: [],
            roles: ['Some-value'],
            first_name: 'firstName',
          },
          true
        )
        expect(patchSpy).toHaveBeenCalledWith('/user_detail/someid/save_user', body)
      })
    })

    describe('calls #patchSpy Api Service catch block', () => {
      it('calls #patch ApiService error block with valid error response', () => {
        const errorResponse = {
          response: 'error',
        }
        patchSpy.mockReturnValue(Promise.reject(errorResponse))
        UserService.saveUserDetails(id, {
          enabled: true,
          permissions: ['drivethebus', 'getapuppy'],
          roles: 'RoleOne',
          first_name: 'Pidgeon',
        })
        expect(patchSpy).toHaveBeenCalledWith('/user_detail/someid/save_user', body)
      })

      it('calls #patch ApiService error block with invalid error response', () => {
        const errorResponse = 'error'
        patchSpy.mockReturnValue(Promise.reject(errorResponse))
        UserService.saveUserDetails(id, {
          enabled: true,
          permissions: ['drivethebus', 'getapuppy'],
          roles: 'RoleOne',
          first_name: 'Pidgeon',
        })
        expect(patchSpy).toHaveBeenCalledWith('/user_detail/someid/save_user', body)
      })
    })
  })

  describe('#validateUser', () => {
    let getSpy2
    beforeEach(() => {
      getSpy2 = jest.spyOn(ApiService, 'get')
    })

    it('calls #validateUser ApiService', () => {
      const email = 'email+Special@example.com'
      const racfid = 'some-racfid'
      getSpy2.mockReturnValue(Promise.resolve({}))
      UserService.validateUser(email, racfid)
      expect(getSpy2).toHaveBeenCalledWith(`/verify_user?email=${encodeURIComponent(email)}&racfid=${racfid}`)
    })

    describe('#validateUser catch block', () => {
      it('calls #validateUser ApiService with valid error response', () => {
        const error = {
          response: { data: 'error' },
        }
        const email = 'email+Special@example.com'
        const racfid = 'some-racfid'
        getSpy2.mockReturnValue(Promise.reject(error))
        UserService.validateUser(email, racfid)
        expect(getSpy2).toHaveBeenCalledWith(`/verify_user?email=${encodeURIComponent(email)}&racfid=${racfid}`)
      })

      it('calls #validateUser ApiService with not valid response', () => {
        const error = 'error'
        const email = 'email+Special@example.com'
        const racfid = 'some-racfid'
        getSpy2.mockReturnValue(Promise.reject(error))
        UserService.validateUser(email, racfid)
        expect(getSpy2).toHaveBeenCalledWith(`/verify_user?email=${encodeURIComponent(email)}&racfid=${racfid}`)
      })
    })
  })

  describe('#addUser', () => {
    let getSpy2
    const newUser = {
      email: 'example@example.com',
      first_name: 'ExampleName',
      last_name: 'ExampleLastName',
      county_name: 'Madera',
      racfid: 'RACFID1',
    }
    beforeEach(() => {
      getSpy2 = jest.spyOn(ApiService, 'post')
    })

    it('calls #addUser ApiService', () => {
      getSpy2.mockReturnValue(Promise.resolve({}))
      UserService.addUser(newUser)
      expect(getSpy2).toHaveBeenCalledWith(`/add_user`, newUser)
    })

    it('calls #addUser ApiService error block', () => {
      const errorResponse = {
        response: 'error',
      }
      getSpy2.mockReturnValue(Promise.reject(errorResponse))
      UserService.addUser(newUser)
      expect(getSpy2).toHaveBeenCalledWith(`/add_user`, newUser)
    })
  })
})
