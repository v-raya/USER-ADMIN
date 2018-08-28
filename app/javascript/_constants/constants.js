/* eslint camelcase: ["off"] */

import { formatDate } from '../_utils/formatters';

export const STATUS = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export const permissionListToOptions = items =>
  items.map(({ name, description }) => ({ value: name, label: description }));

export const toFullName = ({ first_name, last_name }) =>
  `${last_name}, ${first_name}`;

export const userStatusFormat = ({ enabled }) => {
  return enabled ? 'Active' : 'Inactive';
};

export const lastLoginDate = ({ last_login_date_time }) => {
  return formatDate(last_login_date_time);
};
