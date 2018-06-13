import { makeUserDetailPath } from './makeUserDetailPath';

describe('Home', () => {
  describe('makeUserDetailPath', () => {
    let originalUrlRoot;

    beforeEach(() => {
      originalUrlRoot = process.env.RAILS_RELATIVE_URL_ROOTx;
    });

    afterEach(() => {
      process.env.RAILS_RELATIVE_URL_ROOT = originalUrlRoot;
    });

    it('returns the right path and encodes user ids for relative', () => {
      process.env.RAILS_RELATIVE_URL_ROOT = '/cap';
      expect(makeUserDetailPath('some+user+id')).toEqual(
        '/cap/user_details/some%2Buser%2Bid'
      );
    });

    it('returns the right path and encodes user ids for root path', () => {
      process.env.RAILS_RELATIVE_URL_ROOT = '/';
      expect(makeUserDetailPath('some+user+id')).toEqual(
        '/user_details/some%2Buser%2Bid'
      );
    });

    it('returns the right path and encodes user ids even when no RAILS_RELATIVE_URL_ROOT is provided', () => {
      delete process.env.RAILS_RELATIVE_URL_ROOT;
      expect(makeUserDetailPath('some+user+id')).toEqual(
        '/user_details/some%2Buser%2Bid'
      );
    });
  });
});
