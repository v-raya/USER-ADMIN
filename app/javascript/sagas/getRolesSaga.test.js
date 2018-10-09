import UserService from '../_services/users';
import { getRoles, rolesSaga } from './getRolesSaga';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = rolesSaga();
    expect(gen.next().value).toEqual(
      takeLatest(actionTypes.FETCH_ROLES_API_CALL_REQUEST, getRoles)
    );
  });

  describe('#getRoles', () => {
    beforeEach(() => {
      UserService.fetchRolesList = jest.fn();
    });

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const gen = getRoles();
        expect(gen.next().value).toEqual(call(UserService.fetchRolesList));
        expect(gen.next(['Hero', 'Villain']).value).toEqual(
          put({
            type: actionTypes.FETCH_ROLES_API_CALL_SUCCESS,
            roles: ['Hero', 'Villain'],
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const gen = getRoles();
        expect(gen.next().value).toEqual(call(UserService.fetchRolesList));
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_ROLES_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });
  });
});
