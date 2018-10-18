/* eslint camelcase: ["off"] */

import { checkDate } from '../_utils/formatters';

export const STATUS = [
  { value: true, label: 'Active' },
  { value: false, label: 'Inactive' },
];

export const officesListToOptions = items =>
  items.map(({ office_id, office_name }) => ({
    value: office_id,
    label: office_name,
  }));

export const permissionListToOptions = items =>
  items.map(({ name, description }) => ({ value: name, label: description }));

export const roleListToOptions = items =>
  items.map(({ id, name }) => ({ value: id, label: name }));

export const toFullName = ({ first_name, last_name }) =>
  `${last_name}, ${first_name}`;

export const userStatusFormat = ({ enabled }) => {
  return enabled ? 'Active' : 'Inactive';
};

export const lastLoginDate = ({ last_login_date_time }) => {
  return checkDate(last_login_date_time);
};

export const translateOffice = (userObject, officesList) => {
  const { office_id } = userObject;
  if (!office_id) return '';

  const recordFound = officesList.find(record => {
    return record.office_id === office_id;
  });
  return recordFound ? recordFound.office_name : office_id;
};

export const translateOfficeMap = (userObject, officeMap) => {
  const { office_id } = userObject;
  if (!office_id) return '';

  const recordFound = officeMap[office_id];
  return recordFound ? recordFound.office_name : office_id;
};

export const getOfficeTranslator = officesList => {
  const officeMap = [];
  officesList.forEach(office => {
    officeMap[office.office_id] = office;
  });
  return user => translateOfficeMap(user, officeMap);
};

export const possibleRolesOptions = (possibleRoles, rolesList) => {
  let options = [];
  rolesList.forEach(role => {
    possibleRoles.forEach(item => {
      if (item === role.id) {
        options.push({ value: role.id, label: role.name });
      }
    });
  });

  return options;
};
