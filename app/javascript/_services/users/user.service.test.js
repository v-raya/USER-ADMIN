import UserService from './user.service';

jest.mock('../api');
const ApiService = require('../api').default;

const id = 'someid';

describe('UserService', () => {
  describe('#search', () => {
    let getSearchSpy23;
    beforeEach(() => {
      getSearchSpy23 = jest.spyOn(ApiService, 'get');
    });

    it('calls #search ApiService', () => {
      const q = encodeURIComponent(
        JSON.stringify({
          query: [],
          sort: [],
          size: 10,
          from: 0,
        })
      );
      getSearchSpy23.mockReturnValue(Promise.resolve({}));
      UserService.search(q);
      expect(getSearchSpy23).toHaveBeenCalledWith(`/user_list?q=${q}`);
    });
  });

  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls fetch ApiService', () => {
      const lastName = 'don';
      getSpy.mockReturnValue(Promise.resolve({}));
      UserService.fetch(lastName);
      expect(getSpy).toHaveBeenCalledWith(`/user_list?last_name=${lastName}`);
    });
  });

  describe('#fetchUserDetails', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls #fetchUsersDetails ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      UserService.fetchUserDetails(id);
      expect(getSpy).toHaveBeenCalledWith('/user_detail/someid');
    });

    it('calls #fetchPermissionList ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      UserService.fetchPermissionsList();
      expect(getSpy).toHaveBeenCalledWith('/permissions_list/');
    });

    it('calls #fetchOfficesList ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      UserService.fetchOfficesList();
      expect(getSpy).toHaveBeenCalledWith('/offices_list/');
    });
  });

  describe('#saveUserDetails', () => {
    let patchSpy;

    beforeEach(() => {
      patchSpy = jest.spyOn(ApiService, 'patch');
    });

    it('calls #patch ApiService', () => {
      patchSpy.mockReturnValue(Promise.resolve({}));
      const body = {
        enabled: true,
        permissions: ['drivethebus', 'getapuppy'],
      };
      UserService.saveUserDetails(id, {
        enabled: 'Active',
        permissions: 'drivethebus,getapuppy',
        first_name: 'Pidgeon',
      });
      expect(patchSpy).toHaveBeenCalledWith(
        '/user_detail/someid/save_user',
        body
      );
    });

    it('calls #patch ApiService when permission are empty', () => {
      patchSpy.mockReturnValue(Promise.resolve({}));
      const body = {
        enabled: true,
        permissions: [],
      };
      UserService.saveUserDetails(id, {
        enabled: 'Active',
        permissions: '',
        first_name: 'firstName',
      });
      expect(patchSpy).toHaveBeenCalledWith(
        '/user_detail/someid/save_user',
        body
      );
    });

    it('succeeds when the permissins are still an array from loading', () => {
      patchSpy.mockReturnValue(Promise.resolve({}));
      const body = {
        enabled: true,
        permissions: ['drivethebus', 'getapuppy'],
      };
      UserService.saveUserDetails(id, {
        enabled: 'Active',
        permissions: ['drivethebus', 'getapuppy'],
        first_name: 'Pidgeon',
      });
      expect(patchSpy).toHaveBeenCalledWith(
        '/user_detail/someid/save_user',
        body
      );
    });

    describe('calls #patchSpy Api Service catch block', () => {
      it('calls #patch ApiService error block with valid error response', () => {
        const errorResponse = {
          response: 'error',
        };
        patchSpy.mockReturnValue(Promise.reject(errorResponse));
        const body = {
          enabled: true,
          permissions: ['drivethebus', 'getapuppy'],
        };
        UserService.saveUserDetails(id, {
          enabled: 'Active',
          permissions: 'drivethebus,getapuppy',
          first_name: 'Pidgeon',
        });
        expect(patchSpy).toHaveBeenCalledWith(
          '/user_detail/someid/save_user',
          body
        );
      });

      it('calls #patch ApiService error block with invalid error response', () => {
        const errorResponse = 'error';
        patchSpy.mockReturnValue(Promise.reject(errorResponse));
        const body = {
          enabled: true,
          permissions: ['drivethebus', 'getapuppy'],
        };
        UserService.saveUserDetails(id, {
          enabled: 'Active',
          permissions: 'drivethebus,getapuppy',
          first_name: 'Pidgeon',
        });
        expect(patchSpy).toHaveBeenCalledWith(
          '/user_detail/someid/save_user',
          body
        );
      });
    });
  });

  describe('#validateUser', () => {
    let getSpy2;

    beforeEach(() => {
      getSpy2 = jest.spyOn(ApiService, 'get');
    });

    it('calls #validateUser ApiService', () => {
      const email = 'email+Special@example.com';
      const racfid = 'some-racfid';
      getSpy2.mockReturnValue(Promise.resolve({}));
      UserService.validateUser(email, racfid);
      expect(getSpy2).toHaveBeenCalledWith(
        `/verify_user?email=${encodeURIComponent(email)}&racfid=${racfid}`
      );
    });

    describe('#validateUser catch block', () => {
      it('calls #validateUser ApiService with valid error response', () => {
        const error = {
          response: { data: 'error' },
        };
        const email = 'email+Special@example.com';
        const racfid = 'some-racfid';
        getSpy2.mockReturnValue(Promise.reject(error));
        UserService.validateUser(email, racfid);
        expect(getSpy2).toHaveBeenCalledWith(
          `/verify_user?email=${encodeURIComponent(email)}&racfid=${racfid}`
        );
      });

      it('calls #validateUser ApiService with not valid response', () => {
        const error = 'error';
        const email = 'email+Special@example.com';
        const racfid = 'some-racfid';
        getSpy2.mockReturnValue(Promise.reject(error));
        UserService.validateUser(email, racfid);
        expect(getSpy2).toHaveBeenCalledWith(
          `/verify_user?email=${encodeURIComponent(email)}&racfid=${racfid}`
        );
      });
    });
  });

  describe('#addUser', () => {
    let getSpy2;

    beforeEach(() => {
      getSpy2 = jest.spyOn(ApiService, 'post');
    });

    it('calls #addUser ApiService', () => {
      const newUser = {
        email: 'example@example.com',
        first_name: 'ExampleName',
        last_name: 'ExampleLastName',
        county_name: 'Madera',
        racfid: 'RACFID1',
      };
      getSpy2.mockReturnValue(Promise.resolve({}));
      UserService.addUser(newUser);
      expect(getSpy2).toHaveBeenCalledWith(`/add_user`, newUser);
    });

    it('calls #addUser ApiService error block', () => {
      const newUser = {
        email: 'example@example.com',
        first_name: 'ExampleName',
        last_name: 'ExampleLastName',
        county_name: 'Madera',
        racfid: 'RACFID1',
      };
      const errorResponse = {
        response: 'error',
      };
      getSpy2.mockReturnValue(Promise.reject(errorResponse));
      UserService.addUser(newUser);
      expect(getSpy2).toHaveBeenCalledWith(`/add_user`, newUser);
    });
  });
});
