import { fetchPermissionsActions } from './permissionsActions'
import { FETCH_PERMISSIONS_API_CALL_REQUEST } from './actionTypes'

describe('#fetchPermissionsActions', () => {
  it('returns type and payload', () => {
    expect(fetchPermissionsActions()).toEqual({
      type: FETCH_PERMISSIONS_API_CALL_REQUEST,
    })
  })
})
