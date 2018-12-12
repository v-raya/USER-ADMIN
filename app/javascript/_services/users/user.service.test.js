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

    it('calls #search ApiService', () => {
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
    describe('calls #patchSpy Api Service when promise is resolved', () => {
      beforeEach(() => {
        patchSpy = jest.spyOn(ApiService, 'patch')
        patchSpy.mockReturnValue(Promise.resolve({}))
      })

      it('calls #patch ApiService', () => {
        const updatedDetails = {
          enabled: true,
          permissions: 'drivethebus, getapuppy',
          roles: 'RoleOneTwo',
          email: 'abcdefg@gmail.com',
        }
        UserService.saveUserDetails(id, updatedDetails)
        expect(patchSpy).toHaveBeenCalledWith('/user_detail/someid/save_user', {
          enabled: true,
          permissions: 'drivethebus, getapuppy',
          roles: 'RoleOneTwo',
          email: 'abcdefg@gmail.com',
        })
      })

      describe('calls #patchSpy Api Service catch block', () => {
        const updatedDetails = {
          enabled: true,
          permissions: 'drivethebus, getapuppy',
          roles: 'RoleOne',
        }
        it('calls #patch ApiService error block with valid error response', () => {
          const errorResponse = {
            response: 'error',
          }
          patchSpy.mockReturnValue(Promise.reject(errorResponse))
          UserService.saveUserDetails(id, updatedDetails)
          expect(patchSpy).toHaveBeenCalledWith('/user_detail/someid/save_user', updatedDetails)
        })

        it('calls #patch ApiService error block with invalid error response', () => {
          const errorResponse = 'error'
          patchSpy.mockReturnValue(Promise.reject(errorResponse))
          UserService.saveUserDetails(id, updatedDetails)
          expect(patchSpy).toHaveBeenCalledWith('/user_detail/someid/save_user', updatedDetails)
        })
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
