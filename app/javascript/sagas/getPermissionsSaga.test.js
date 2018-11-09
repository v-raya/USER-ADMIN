import UserService from '../_services/users'
import { getPermissions, permissionsSaga } from './getPermissionsSaga'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = permissionsSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.FETCH_PERMISSIONS_API_CALL_REQUEST, getPermissions))
  })

  describe('#getPermissions', () => {
    beforeEach(() => {
      UserService.fetchPermissionsList = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const gen = getPermissions()
        expect(gen.next().value).toEqual(call(UserService.fetchPermissionsList))
        expect(gen.next(['Hello', 'Bye']).value).toEqual(
          put({
            type: actionTypes.FETCH_PERMISSIONS_API_CALL_SUCCESS,
            permissions: ['Hello', 'Bye'],
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const gen = getPermissions()
        expect(gen.next().value).toEqual(call(UserService.fetchPermissionsList))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.FETCH_PERMISSIONS_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
