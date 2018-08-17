/* eslint camelcase: 0 */

export function formatPhoneNumber({ phone_extension_number }) {
  const phoneExtension = phone_extension_number
    ? ` Ext ${phone_extension_number}`
    : '';
  return phoneExtension;
}
