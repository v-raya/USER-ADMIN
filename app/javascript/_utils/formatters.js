/* eslint camelcase: 0 */

import { DateTime } from 'luxon';

export function formatPhoneExtension({ phone_number, phone_extension_number }) {
  const phoneExtension = !phone_number
    ? ''
    : phone_number && phone_extension_number
      ? `${phone_number} Ext ${phone_extension_number}`
      : phone_number && !phone_extension_number
        ? `${phone_number} Ext`
        : '';
  return phoneExtension;
}

export function formatDate(date) {
  let formattedDate = date ? DateTime.fromISO(date).toFormat('MM/dd/yyyy') : '';
  return formattedDate;
}
