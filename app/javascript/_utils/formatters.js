/* eslint camelcase: 0 */

import { DateTime } from 'luxon';

const phoneNumberFormatter = phone_number => {
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

export function formatPhoneExtension({ phone_number, phone_extension_number }) {
  const formattedPhoneNumber =
    phone_number && phone_extension_number
      ? `${phoneNumberFormatter(phone_number)} Ext ${phone_extension_number}`
      : phone_number && !phone_extension_number
        ? `${phoneNumberFormatter(phone_number)} Ext`
        : '';
  return formattedPhoneNumber;
}

export function formatDate(date) {
  let formattedDate = date ? DateTime.fromISO(date).toFormat('MM/dd/yyyy') : '';
  return formattedDate;
}
