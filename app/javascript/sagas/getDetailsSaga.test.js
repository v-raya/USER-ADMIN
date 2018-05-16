import UserService from '../_services/users';

import { detailsSaga, getDetails } from './getDetailsSaga';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

const id = 'id';
UserService.fetchUserDetails(id);

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = detailsSaga();
    expect(gen.next().value).toEqual(
      takeLatest(actionTypes.FETCH_DETAILS_API_CALL_REQUEST, getDetails)
    );
  });

  describe('#getDetails', () => {
    beforeEach(() => {
      UserService.fetch = jest.fn();
    });

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const gen = getDetails();
        expect(gen.next().value).toEqual(
          call(UserService.fetchUserDetails, id)
        );
        expect(gen.next({ id: 12, name: 'username' }).value).toEqual(
          put({
            type: actionTypes.FETCH_DETAILS_API_CALL_SUCCESS,
            details: { id: 12, name: 'username' },
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const gen = getDetails();
        expect(gen.next().value).toEqual(
          call(UserService.fetchUserDetails, id)
        );
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_DETAILS_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });
  });
});
