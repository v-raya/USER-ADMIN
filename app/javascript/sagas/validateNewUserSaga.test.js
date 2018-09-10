import UserService from '../_services/users';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';
import { validateNewUserSaga, validateNewUser } from './validateNewUserSaga';

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = validateNewUserSaga();
    expect(gen.next().value).toEqual(
      takeLatest(
        actionTypes.VALIDATE_NEW_USER_API_CALL_REQUEST,
        validateNewUser
      )
    );
  });

  describe('#ValidateNewUser', () => {
    const email = 'email@example.com';
    const racfid = 'some-racfid';
    beforeEach(() => {
      UserService.validateUser = jest.fn();
    });

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const action = { payload: { email: email, racfid: racfid } };
        const gen = validateNewUser(action);

        expect(gen.next().value).toEqual(
          call(UserService.validateUser, email, racfid)
        );
        expect(
          gen.next({
            email: email,
            racfid: racfid,
            county_name: 'Sacramento',
          }).value
        ).toEqual(
          put({
            type: actionTypes.VALIDATE_NEW_USER_API_CALL_SUCCESS,
            verifyUserDetails: {
              verifiedUserDetails: {
                email: email,
                racfid: racfid,
                county_name: 'Sacramento',
              },
              verify: {
                email: email,
                racfid: racfid,
              },
            },
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });

    describe('when failures come back from the validation', () => {
      it('handles the error', () => {
        const action = { payload: { email: email, racfid: racfid } };
        const gen = validateNewUser(action);

        expect(gen.next().value).toEqual(
          call(UserService.validateUser, email, racfid)
        );
        expect(gen.throw('database not accessible').value).toEqual(
          put({
            type: actionTypes.VALIDATE_NEW_USER_API_CALL_FAILURE,
            error: 'database not accessible',
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });
  });
});
