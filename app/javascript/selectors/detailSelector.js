import safeGet from 'lodash.get'
import { formatDate } from '../_utils/formatters'
import { rolesList } from './rolesListSelector'
import { permissionsList } from './permissionsListSelector'

export const selectUserDetailObject = state => {
  const usersObject = state.fetchDetails ? state.fetchDetails.details : null
  const userData = usersObject ? usersObject.records : null
  return userData
}

export const selectDetailRecords = state => {
  const userData = selectUserDetailObject(state)
  const userDetails = userData ? userData.user : {}
  return userDetails
}

export const selectAssignedPermissions = state => {
  const assignedPermissions = safeGet(state, 'fetchDetails.details.records.user.permissions')
  const permissionList = permissionsList(state)
  if (!Array.isArray(assignedPermissions)) return ''
  return (
    assignedPermissions &&
    assignedPermissions.length > 0 &&
    assignedPermissions
      .map(permission => permissionList.find(d => d.value === permission))
      .filter(value => Boolean(value))
      .map(({ value, label }) => label)
      .join(', ')
  )
}

export const selectPossibleRolesList = state => {
  const possibleRoles = safeGet(state, 'fetchDetails.details.records.edit_details.roles.possible_values', [])
  const roles = rolesList(state)
  const options = []
  roles.forEach(role => {
    possibleRoles.forEach(item => {
      if (item === role.value) {
        options.push({ value: role.value, label: role.label })
      }
    })
  })
  return options
}

export const checkEditDisable = state => !safeGet(state, 'fetchDetails.details.records.edit_details.editable')

export const disableRolesDropDown = state => !safeGet(state, 'fetchDetails.details.records.edit_details.roles.editable')

export const fetchingStatus = state => safeGet(state, 'fetchDetails.details.XHRStatus')

export const selectStartDate = state => {
  const date = safeGet(state, 'fetchDetails.details.records.user.start_date')
  return formatDate(date)
}

export const selectAccountStatus = state => {
  const status = safeGet(state, 'fetchDetails.details.records.user.enabled')
  const accountStatus = {
    true: 'Active',
    false: 'Inactive',
  }
  return accountStatus[status]
}

const status = state => safeGet(state, 'fetchDetails.details.records.user.status')

export const userStatusDescription = state => {
  const userStatus = status(state)
  const description = {
    UNCONFIRMED: 'User has been created but not confirmed.',
    CONFIRMED: 'User has been confirmed.',
    ARCHIVED: 'User is no longer active.',
    COMPROMISED: 'User is disabled due to a potential security threat.',
    UNKNOWN: 'User status is not known.',
    RESET_REQUIRED: 'Need to reset user.',
    FORCE_CHANGE_PASSWORD: 'User has never logged in.',
  }
  return description[userStatus] || ''
}

export const userStatus = state => {
  const userStatus = status(state)
  const userText = {
    CONFIRMED: 'Confirmed',
    FORCE_CHANGE_PASSWORD: 'Registration Incomplete',
  }
  return userText[userStatus] || ''
}
