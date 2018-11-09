import { fetchRolesActions } from './rolesActions'
import { FETCH_ROLES_API_CALL_REQUEST } from './actionTypes'

describe('#fetchRolesActions', () => {
  it('returns type and payload', () => {
    expect(fetchRolesActions()).toEqual({
      type: FETCH_ROLES_API_CALL_REQUEST,
    })
  })
})
