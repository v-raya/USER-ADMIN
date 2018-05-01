import UserService from '../_services/users';

import getUserListSaga, { countyUsersList } from './getUserListSaga';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

UserService.fetch();

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = getUserListSaga();
    expect(gen.next().value).toEqual(
      takeLatest(actionTypes.FETCH_USERS_API_CALL_REQUEST, countyUsersList)
    );
  });

  describe('#countyUsersList', () => {
    beforeEach(() => {
      UserService.fetch = jest.fn();
    });

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const gen = countyUsersList();
        expect(gen.next().value).toEqual(call(UserService.fetch));
        expect(gen.next([1234, 5678]).value).toEqual(
          put({
            type: actionTypes.FETCH_USERS_API_CALL_SUCCESS,
            userList: [1234, 5678],
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const gen = countyUsersList();
        expect(gen.next().value).toEqual(call(UserService.fetch));
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_USERS_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });
  });
});
