import UserService from './user.service';

jest.mock('../api');
const ApiService = require('../api').default;

const id = 'id';

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
      expect(getSpy).toHaveBeenCalledWith('/user_detail/id');
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
      expect(patchSpy).toHaveBeenCalledWith('/user_detail/id/save_user', body);
    });
  });
});
