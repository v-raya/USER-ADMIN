/* eslint camelcase: ["off"] */

import { checkDate } from '../_utils/formatters';

export const STATUS = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export const permissionListToOptions = items =>
  items.map(({ name, description }) => ({ value: name, label: description }));

export const officesListToOptions = items =>
  items.map(({ office_name }) => ({
    value: office_name,
    label: office_name,
  }));

export const toFullName = ({ first_name, last_name }) =>
  `${last_name}, ${first_name}`;

export const userStatusFormat = ({ enabled }) => {
  return enabled ? 'Active' : 'Inactive';
};

export const lastLoginDate = ({ last_login_date_time }) => {
  return checkDate(last_login_date_time);
};
