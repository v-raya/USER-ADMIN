import fetchPermissions from './permissionsReducers'
import * as actionTypes from '../actions/actionTypes'

describe('reducer', () => {
  it('handles FETCH_PERMISSIONS_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_PERMISSIONS_API_CALL_REQUEST,
    }
    const state = { permissions: null, fetching: false }
    expect(fetchPermissions(state, requestAction)).toEqual({
      fetching: true,
      permissions: null,
      error: null,
    })
  })

  it('handles FETCH_PERMISSIONS_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.FETCH_PERMISSIONS_API_CALL_SUCCESS,
      permissions: ['Hello', 'Bye'],
    }
    const state = { permissions: null, fetching: true, error: null }

    expect(fetchPermissions(state, responseAction)).toEqual({
      fetching: false,
      permissions: ['Hello', 'Bye'],
      error: null,
    })
  })

  it('handles FETCH_PERMISSIONS_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_PERMISSIONS_API_CALL_FAILURE,
      permissions: null,
      error: 'error happened',
    }
    const state = { permissions: null, fetching: true, error: null }
    expect(fetchPermissions(state, failureAction)).toEqual({
      fetching: false,
      permissions: null,
      error: 'error happened',
    })
  })

  it('handles unexpected actions by ignoring them', () => {
    const randomAction = {
      type: 'unknownAction',
      foreignObject: [],
    }
    const state = { permissions: null, fetching: true, error: null }
    expect(fetchPermissions(state, randomAction)).toEqual({
      permissions: null,
      fetching: true,
      error: null,
    })
  })

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    }
    const state = { permissions: null, fetching: false }
    expect(fetchPermissions(undefined, randomAction)).toEqual(state)
  })
})
