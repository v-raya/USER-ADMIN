import UserService from '../_services/users'
import { addUserSaga, addUser } from './addUserSaga'
import * as actionTypes from '../actions/actionTypes'
import { takeLatest, call, put } from 'redux-saga/effects'

describe('sagas', () => {
  it('starts the worker fetch saga', () => {
    const gen = addUserSaga()
    expect(gen.next().value).toEqual(takeLatest(actionTypes.ADD_USER_API_CALL_REQUEST, addUser))
  })

  describe('#addUser', () => {
    beforeEach(() => {
      UserService.addUser = jest.fn()
    })

    describe('when successful', () => {
      it('executes the happy-path saga', () => {
        const action = { payload: { newUser: 'man1324' } }
        const gen = addUser(action)
        expect(gen.next().value).toEqual(call(UserService.addUser, action.payload.newUser))
        expect(gen.next([1234, 5678]).value).toEqual(
          put({
            type: actionTypes.ADD_USER_API_CALL_SUCCESS,
            addNewUser: [1234, 5678],
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('when failures come back from the fetch', () => {
      it('handles the error', () => {
        const action = { payload: { newUser: 'man1234' } }
        const gen = addUser(action)
        expect(gen.next().value).toEqual(call(UserService.addUser, action.payload.newUser))
        expect(gen.throw('I have made a huge mistake').value).toEqual(
          put({
            type: actionTypes.ADD_USER_API_CALL_FAILURE,
            error: 'I have made a huge mistake',
          })
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
