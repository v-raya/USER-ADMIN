import { makeLogoutUrl } from './makeLogoutUrl';

describe('Home', () => {
  describe('makeLogoutUrl', () => {
    let originalUrlRoot;

    beforeEach(() => {
      originalUrlRoot = process.env.RAILS_RELATIVE_URL_ROOT;
    });

    afterEach(() => {
      process.env.RAILS_RELATIVE_URL_ROOT = originalUrlRoot;
    });

    it('returns the right path and encodes user ids for relative', () => {
      process.env.RAILS_RELATIVE_URL_ROOT = '/cap';
      expect(makeLogoutUrl()).toEqual('/cap/logout');
    });

    it('returns the right path and encodes user ids for root path', () => {
      process.env.RAILS_RELATIVE_URL_ROOT = '/';
      expect(makeLogoutUrl()).toEqual('/logout');
    });

    it('returns the right path and encodes user ids even when no RAILS_RELATIVE_URL_ROOT is provided', () => {
      delete process.env.RAILS_RELATIVE_URL_ROOT;
      expect(makeLogoutUrl()).toEqual('/logout');
    });
  });
});
