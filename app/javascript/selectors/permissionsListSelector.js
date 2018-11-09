export const permissionsList = state => {
  const list = state.fetchPermissions ? state.fetchPermissions.permissions : null
  const permissionsList = list
    ? list.map(({ name, description }) => ({
        value: name,
        label: description,
      }))
    : []
  return permissionsList
}
