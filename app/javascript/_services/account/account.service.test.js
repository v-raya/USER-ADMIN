import AccountService from './account.service';

jest.mock('../api');
const ApiService = require('../api').default;

describe('AccountService', () => {
  describe('#fetchCurrent', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve(42));
      expect(getSpy).not.toHaveBeenCalled();
      AccountService.fetchCurrent();
      expect(getSpy).toHaveBeenCalledWith('/account');
    });
  });
});
