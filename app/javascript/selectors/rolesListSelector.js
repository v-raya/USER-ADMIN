export const rolesList = state => {
  const roles = state.fetchRoles ? state.fetchRoles.roles : null;
  const rolesList = roles
    ? roles.map(({ id, name }) => ({ value: id, label: name }))
    : [];
  return rolesList;
};
