import AccountService from '../_services/account';

import { accountSaga, getAccount } from './getAccountSaga';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = accountSaga();
    expect(gen.next().value).toEqual(
      takeLatest(actionTypes.FETCH_ACCOUNT_API_CALL_REQUEST, getAccount)
    );
  });

  describe('#getAccount', () => {
    beforeEach(() => {
      AccountService.fetch = jest.fn();
    });

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const response = {
          admin_office_ids: ['12345'],
          roles: ['Office-admin'],
        };
        const gen = getAccount();
        expect(gen.next().value).toEqual(call(AccountService.fetchCurrent));
        expect(gen.next(response).value).toEqual(
          put({
            type: actionTypes.FETCH_ACCOUNT_API_CALL_SUCCESS,
            payload: {
              admin_office_ids: ['12345'],
              roles: ['Office-admin'],
            },
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const gen = getAccount();
        expect(gen.next().value).toEqual(call(AccountService.fetchCurrent));
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_ACCOUNT_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });
  });
});
