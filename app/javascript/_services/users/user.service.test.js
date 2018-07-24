import UserService from './user.service';

jest.mock('../api');
const ApiService = require('../api').default;

const id = 'someid';

describe('UserService', () => {
  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls fetch ApiService', () => {
      const lastName = 'don';
      getSpy.mockReturnValue(Promise.resolve({}));
      expect(getSpy).not.toHaveBeenCalled();
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
  });
});
