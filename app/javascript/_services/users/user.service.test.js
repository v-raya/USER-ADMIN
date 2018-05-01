import UserService from './user.service';

jest.mock('../api');
const ApiService = require('../api').default;

const id = 'FeLX5t8aah';

describe('UserService', () => {
  it('exists', () => {
    expect(!!UserService).toBeTruthy();
  });

  describe('#fetch', () => {
    let getSpy;

    beforeEach(() => {
      getSpy = jest.spyOn(ApiService, 'get');
    });

    it('calls fetch ApiService', () => {
      getSpy.mockReturnValue(Promise.resolve({}));
      expect(getSpy).not.toHaveBeenCalled();
      UserService.fetch(id);
      expect(getSpy).toHaveBeenCalledWith(
        'https://dog.ceo/api/breeds/image/random'
      );
    });
  });
});
