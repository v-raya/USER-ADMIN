/* eslint camelcase: 0 */

import { DateTime } from 'luxon';

export const formatPhoneNumber = phone_number => {
  if (phone_number && phone_number.replace) {
    phone_number = phone_number.replace(/[^\d]/g, '');
    const length = 10;
    if (phone_number.length === length) {
      const phoneNumber = phone_number.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '($1) $2-$3'
      );
      return phoneNumber;
    }
  }
  return null;
};

export function formatPhoneNumberWithExt({
  phone_number,
  phone_extension_number,
}) {
  const phoneNumber =
    phone_number && phone_extension_number
      ? `${formatPhoneNumber(phone_number)} Ext ${phone_extension_number}`
      : phone_number && !phone_extension_number
        ? `${formatPhoneNumber(phone_number)} Ext`
        : '';
  return phoneNumber;
}

export function checkDate(date) {
  return date ? formatLastLogin(date.split(' ')) : '';
}

export function formatDate(date) {
  let formattedDate = date ? DateTime.fromISO(date).toFormat('MM/dd/yyyy') : '';
  return formattedDate;
}

function formatLastLogin(array) {
  let hoursMinutes = array[1].slice(0, -3);
  let time = hoursMinutes.split(':');
  let hours = time[0] > 12 ? `${time[0] - 12}` : time[0];
  let hour = hours < 10 ? '0' + hours : hours;
  let formattedTime =
    time[0] < 12 ? `${hoursMinutes} AM` : `${hour + ':' + time[1]} PM`;
  return `${DateTime.fromISO(array[0]).toFormat('DDD')} ${formattedTime}`;
}

export function formatSelectedRoles(assignedRoles, rolesList) {
  let role = '';
  if (!Array.isArray(assignedRoles)) return '';
  if (assignedRoles && assignedRoles.length !== 0) {
    role = assignedRoles
      .map(role => rolesList.find(d => d.value === role))
      .filter(value => value)
      .map(({ value, label }) => label)[0];
  }
  if (role === undefined) {
    role = assignedRoles[0];
  }
  return role;
}
