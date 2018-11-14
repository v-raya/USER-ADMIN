import fetchOffices from './officesReducers'
import * as actionTypes from '../actions/actionTypes'

describe('reducer', () => {
  it('handles FETCH_OFFICES_API_CALL_REQUEST', () => {
    const requestAction = {
      type: actionTypes.FETCH_OFFICES_API_CALL_REQUEST,
    }
    const state = { offices: null, fetching: false }
    expect(fetchOffices(state, requestAction)).toEqual({
      fetching: true,
      offices: null,
      error: null,
    })
  })

  it('handles FETCH_OFFICES_API_CALL_SUCCESS', () => {
    const responseAction = {
      type: actionTypes.FETCH_OFFICES_API_CALL_SUCCESS,
      offices: ['Hello', 'Bye'],
    }
    const state = { offices: null, fetching: true, error: null }

    expect(fetchOffices(state, responseAction)).toEqual({
      fetching: false,
      offices: ['Hello', 'Bye'],
      error: null,
    })
  })

  it('handles FETCH_OFFICES_API_CALL_FAILURE', () => {
    const failureAction = {
      type: actionTypes.FETCH_OFFICES_API_CALL_FAILURE,
      offices: null,
      error: 'error happened',
    }
    const state = { offices: null, fetching: true, error: null }
    expect(fetchOffices(state, failureAction)).toEqual({
      fetching: false,
      offices: null,
      error: 'error happened',
    })
  })

  it('handles unexpected actions by ignoring them', () => {
    const randomAction = {
      type: 'unknownAction',
      foreignObject: [],
    }
    const state = { offices: null, fetching: true, error: null }
    expect(fetchOffices(state, randomAction)).toEqual({
      offices: null,
      fetching: true,
      error: null,
    })
  })

  it('handles when state is undefined', () => {
    const randomAction = {
      type: null,
      foreignObject: {},
    }
    const state = { offices: null, fetching: false }
    expect(fetchOffices(undefined, randomAction)).toEqual(state)
  })
})
