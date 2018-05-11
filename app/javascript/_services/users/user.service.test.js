import UserService from './user.service';

jest.mock('../api');
const ApiService = require('../api').default;

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
  });
});
