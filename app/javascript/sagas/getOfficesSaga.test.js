import UserService from '../_services/users'
import { getOffices, officesSaga } from './getOfficesSaga'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = officesSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.FETCH_OFFICES_API_CALL_REQUEST, getOffices))
  })

  describe('#getOffices', () => {
    beforeEach(() => {
      UserService.fetchOfficesList = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const gen = getOffices()
        expect(gen.next().value).toEqual(call(UserService.fetchOfficesList))
        expect(gen.next(['Hello', 'Bye']).value).toEqual(
          put({
            type: actionTypes.FETCH_OFFICES_API_CALL_SUCCESS,
            offices: ['Hello', 'Bye'],
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const gen = getOffices()
        expect(gen.next().value).toEqual(call(UserService.fetchOfficesList))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_OFFICES_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
