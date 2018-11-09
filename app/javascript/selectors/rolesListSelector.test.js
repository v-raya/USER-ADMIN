import { rolesList } from './rolesListSelector'

describe('#rolesList', () => {
  const getState = rolesList => {
    return {
      fetchRoles: {
        roles: rolesList,
      },
    }
  }
  it('selects the roles when available', () => {
    const expectedValue = [{ value: 'foo-id', label: 'foo-name' }, { value: 'bar-id', label: 'bar-name' }]
    const state = getState([{ id: 'foo-id', name: 'foo-name' }, { id: 'bar-id', name: 'bar-name' }])

    expect(rolesList(state)).toEqual(expectedValue)
  })

  it('returns empty array when there is no fetchRoles object', () => {
    const state = {}
    expect(rolesList(state)).toEqual([])
  })

  it('returns empty array when roles is an empty array', () => {
    const state = getState([])
    expect(rolesList(state)).toEqual([])
  })
})
