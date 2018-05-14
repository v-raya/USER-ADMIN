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
      getSpy.mockReturnValue(Promise.resolve({}));
      expect(getSpy).not.toHaveBeenCalled();
      UserService.fetch();
      expect(getSpy).toHaveBeenCalledWith('/user_list/');
    });

    it('calls #fetchUsersDetails ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      UserService.fetchUserDetails(id);
      expect(getSpy).toHaveBeenCalledWith('/user_detail/id');
    });
  });
});
