import React from 'react';
import { shallow } from 'enzyme';
import Home from './home';
import { Provider } from 'react-redux';
import { makeUserDetailPath } from './home';
describe('Home', () => {
  let wrapper;

  describe('makeUserDetailPath', () => {
    let original_url_root;
    beforeEach(() => {
      original_url_root = process.env.RAILS_RELATIVE_URL_ROOTx;
    });

    afterEach(() => {
      process.env.RAILS_RELATIVE_URL_ROOT = original_url_root;
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
