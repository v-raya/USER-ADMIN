import {
  selectDetailRecords,
  checkEditDisable,
  fetchingStatus,
  selectUserDetailObject,
  disableRolesDropDown,
  selectStartDate,
  userStatusDescription,
  userStatus,
  selectPossibleRolesList,
  selectAccountStatus,
  selectAssignedPermissions,
  officeName,
  selectPossiblePermissionsList,
} from './detailSelector'

describe('selectors', () => {
  const editDetails = {
    edit_details: {
      editable: true,
      roles: { possible_values: ['role1', 'role2'] },
    },
    user: {},
  }
  const initialState = {
    fetchDetails: {
      details: {
        XHRStatus: 'ready',
        records: editDetails,
      },
    },
  }

  const getState = ({
    isEnabled,
    startDate,
    countyName,
    assignedPermissions,
    possibleRoles,
    isRolesEditable,
    isDetailsEditable,
    status,
    rolesList,
    permissionsList,
    possiblePermissions,
    officeId,
  }) => {
    return {
      fetchDetails: {
        details: {
          records: {
            edit_details: {
              editable: isDetailsEditable,
              permissions: {
                possible_values: possiblePermissions,
                editable: true,
              },
              roles: {
                possible_values: possibleRoles,
                editable: isRolesEditable,
              },
            },
            user: {
              enabled: isEnabled,
              start_date: startDate,
              county_name: countyName,
              permissions: assignedPermissions,
              status: status,
              office_id: officeId,
            },
          },
        },
      },
      fetchPermissions: {
        permissions: permissionsList,
      },
      fetchRoles: {
        roles: rolesList,
      },
      fetchOffices: {
        offices: [
          { office_id: 'north', office_name: 'North Office' },
          { office_id: 'south', office_name: 'South Office' },
        ],
      },
    }
  }

  describe('#selectUserDetailObject', () => {
    it('selects the user detail object when records exists', () => {
      expect(selectUserDetailObject(initialState)).toEqual(editDetails)
    })

    it('selects the user detail object when fetchDetails does not exist', () => {
      const state = {}
      expect(selectUserDetailObject(state)).toEqual(null)
    })

    it('selects the user detail object when fetchDetails exist', () => {
      const state = {
        fetchDetails: {},
      }
      expect(selectUserDetailObject(state)).toEqual(null)
    })

    it('selects the user detail object when details are empty', () => {
      const state = {
        fetchDetails: {
          details: {},
        },
      }
      expect(selectUserDetailObject(state)).toEqual(undefined)
    })
  })

  describe('#accountStatus', () => {
    it('return Active when enabled is true ', () => {
      const state = getState({ isEnabled: true })
      expect(selectAccountStatus(state)).toEqual('Active')
    })

    it('return Inactive when enabled is false ', () => {
      const state = getState({ isEnabled: false })
      expect(selectAccountStatus(state)).toEqual('Inactive')
    })
  })

  describe('#selectStartDate', () => {
    describe('When date exists ', () => {
      it('returns formated date', () => {
        const state = getState({ startDate: '2001-09-01' })
        expect(selectStartDate(state)).toEqual('09/01/2001')
      })
    })

    describe('When date is an empty string', () => {
      it('returns empty string ', () => {
        const state = getState({ startDate: '' })
        expect(selectStartDate(state)).toEqual('')
      })
    })
  })

  describe('#officeName', () => {
    describe('When officeId exists ', () => {
      it('returns officeName', () => {
        const state = getState({ officeId: 'north' })
        expect(officeName(state)).toEqual('North Office')
      })
    })

    describe('When officeId is an empty string', () => {
      it('returns empty string ', () => {
        const state = getState({ officeId: '' })
        expect(officeName(state)).toEqual('')
      })
    })
  })

  describe('#selectDetailRecords', () => {
    it('selects the user detail records ', () => {
      const state = getState({
        isEnabled: false,
        countyName: 'first',
        startDate: '11/11/1111',
        assignedPermissions: ['a', 'b'],
        status: 'Hello',
      })
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        enabled: false,
        permissions: ['a', 'b'],
        start_date: '11/11/1111',
        status: 'Hello',
      })
    })

    it('returns empty when fetchDetails does not exit', () => {
      const state = {}
      expect(selectDetailRecords(state)).toEqual({})
    })
  })

  describe('#selectAssignedPermissions', () => {
    const permissionsList = [
      { description: 'permissionOne', name: 'permission1' },
      { description: 'permissionTwo', name: 'permission2' },
    ]

    it('renders the permissions value as string when given as id in array', () => {
      const assignedPermissions = ['permission1', 'permission2']
      const state = getState({
        assignedPermissions: assignedPermissions,
        permissionsList: permissionsList,
      })
      expect(selectAssignedPermissions(state)).toEqual('permissionOne, permissionTwo')
    })

    it('renders empty string when given empty string ', () => {
      const assignedPermissions = ''
      const state = getState({
        assignedPermissions: assignedPermissions,
        permissionsList: permissionsList,
      })
      expect(selectAssignedPermissions(state)).toEqual('')
    })

    it('renders false when given empty array ', () => {
      const assignedPermissions = []
      const state = getState({
        assignedPermissions: assignedPermissions,
        permissionsList: permissionsList,
      })
      expect(selectAssignedPermissions(state)).toEqual(false)
    })
  })

  describe('#selectPossiblePermissionsList', () => {
    const permissionsList = [
      { name: 'permission1', description: 'permissionOne' },
      { name: 'permission2', description: 'permissionTwo' },
      { name: 'permission3', description: 'permissionThree' },
    ]
    it('renders the description of a permission given possiblePermission with permission name', () => {
      const possiblePermissions = ['permission1', 'permission2']
      const expectedValue = [
        { value: 'permission1', label: 'permissionOne' },
        { value: 'permission2', label: 'permissionTwo' },
      ]
      const state = getState({
        possiblePermissions: possiblePermissions,
        permissionsList: permissionsList,
      })
      expect(selectPossiblePermissionsList(state)).toEqual(expectedValue)
    })
  })

  describe('#selectPossibleRolesList', () => {
    const rolesList = [
      { id: 'role1', name: 'roleOne' },
      { id: 'role2', name: 'roleTwo' },
      { id: 'role3', name: 'roleThree' },
    ]
    it('renders the name of a role given possibleRoles with role_id', () => {
      const possibleRoles = ['role1', 'role2']
      const expectedValue = [{ value: 'role1', label: 'roleOne' }, { value: 'role2', label: 'roleTwo' }]
      const state = getState({
        possibleRoles: possibleRoles,
        rolesList: rolesList,
      })
      expect(selectPossibleRolesList(state)).toEqual(expectedValue)
    })
  })

  describe('#checkEditDisable', () => {
    it('return true when editable is false', () => {
      const state = getState({ isDetailsEditable: false })
      expect(checkEditDisable(state)).toEqual(true)
    })

    it('return the false if editable is true', () => {
      const state = getState({ isDetailsEditable: true })
      expect(checkEditDisable(state)).toEqual(false)
    })

    it('return the true if editable is null', () => {
      const state = getState({ isDetailsEditable: null })
      expect(checkEditDisable(state)).toEqual(true)
    })

    it('return true if editable is undefined ', () => {
      const state = getState({ isDetailsEditable: undefined })
      expect(checkEditDisable(state)).toEqual(true)
    })
  })

  describe('#userStatusDescription', () => {
    describe('return a description based on user status value ', () => {
      it('return description when status is UNCONFIRMED', () => {
        const state = getState({ status: 'UNCONFIRMED' })
        expect(userStatusDescription(state)).toEqual('User has been created but not confirmed.')
      })

      it('return description when status is CONFIRMED ', () => {
        const state = getState({ status: 'CONFIRMED' })
        expect(userStatusDescription(state)).toEqual('User has been confirmed.')
      })

      it('return description when status is ARCHIVED  ', () => {
        const state = getState({ status: 'ARCHIVED' })
        expect(userStatusDescription(state)).toEqual('User is no longer active.')
      })

      it('return description when status is COMPROMISED  ', () => {
        const state = getState({ status: 'COMPROMISED' })
        expect(userStatusDescription(state)).toEqual('User is disabled due to a potential security threat.')
      })

      it('return description when status is UNKNOWN  ', () => {
        const state = getState({ status: 'UNKNOWN' })
        expect(userStatusDescription(state)).toEqual('User status is not known.')
      })

      it('return description when status is RESET_REQUIRED ', () => {
        const state = getState({ status: 'RESET_REQUIRED' })
        expect(userStatusDescription(state)).toEqual('Need to reset user.')
      })

      it('return description when status is FORCE_CHANGE_PASSWORD ', () => {
        const state = getState({ status: 'FORCE_CHANGE_PASSWORD' })
        expect(userStatusDescription(state)).toEqual('User has never logged in.')
      })

      it('return empty string when status is other ', () => {
        const state = getState({ status: 'ASDFGADFASD' })
        expect(userStatusDescription(state)).toEqual('')
      })

      it('return empty string when status is empty ', () => {
        const state = getState({ status: '' })
        expect(userStatusDescription(state)).toEqual('')
      })
    })
  })

  describe('#userStatus', () => {
    describe('return user friendly text based on user status value ', () => {
      it('return userStatus friendly text when status is CONFIRMED ', () => {
        const state = getState({ status: 'CONFIRMED' })
        expect(userStatus(state)).toEqual('Confirmed')
      })

      it('return userStatus friendly text when status is FORCE_CHANGE_PASSWORD ', () => {
        const state = getState({ status: 'FORCE_CHANGE_PASSWORD' })
        expect(userStatus(state)).toEqual('Registration Incomplete')
      })

      it('return empty when status is other ', () => {
        const state = getState({ status: 'ASDFGADFASD' })
        expect(userStatus(state)).toEqual('')
      })

      it('return empty when status is empty ', () => {
        const state = getState({ status: '' })
        expect(userStatus(state)).toEqual('')
      })
    })
  })

  describe('#disableRolesDropDown', () => {
    it('return true when editable is false', () => {
      const state = getState({ isRolesEditable: false })
      expect(disableRolesDropDown(state)).toEqual(true)
    })

    it('return false if editable is true', () => {
      const state = getState({ isRolesEditable: true })
      expect(disableRolesDropDown(state)).toEqual(false)
    })

    it('return true if editable is null', () => {
      const state = getState({ isRolesEditable: null })
      expect(disableRolesDropDown(state)).toEqual(true)
    })

    it('return true if editable is undefined ', () => {
      const state = getState({ isRolesEditable: undefined })
      expect(disableRolesDropDown(state)).toEqual(true)
    })
  })

  describe('#fetchingStatus', () => {
    it('return the value of the details XHR status', () => {
      expect(fetchingStatus(initialState)).toEqual('ready')
    })
  })
})
