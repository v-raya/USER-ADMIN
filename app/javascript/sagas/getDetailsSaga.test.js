import UserService from '../_services/users';
import { detailsSaga, getDetails } from './getDetailsSaga';
import * as actionTypes from '../actions/actionTypes';
import { takeLatest, call, put } from 'redux-saga/effects';

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = detailsSaga();
    expect(gen.next().value).toEqual(
      takeLatest(actionTypes.FETCH_DETAILS_API_CALL_REQUEST, getDetails)
    );
  });

  describe('#getDetails', () => {
    beforeEach(() => {
      UserService.fetchUserDetails = jest.fn();
    });

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const action = { payload: { id: 'man1232' } };
        const gen = getDetails(action);
        expect(gen.next().value).toEqual(
          call(UserService.fetchUserDetails, action.payload.id)
        );
        expect(gen.next([1234, 5678]).value).toEqual(
          put({
            type: actionTypes.FETCH_DETAILS_API_CALL_SUCCESS,
            details: [1234, 5678],
          })
        );
        expect(gen.next().done).toBe(true);
      });
    });

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const action = { payload: { id: 'man' } };
        const gen = getDetails(action);
        expect(gen.next().value).toEqual(
          call(UserService.fetchUserDetails, action.payload.id)
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
