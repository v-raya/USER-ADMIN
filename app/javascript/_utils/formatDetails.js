/* eslint camelcase: 0 */

export function formatPhoneNumber({ phone_number, phone_extension_number }) {
  const phone = phone_number !== undefined ? phone_number : '';
  const ext =
    phone_number && phone_extension_number && phone_extension_number !== '0'
      ? ` Ext ${phone_extension_number}`
      : '';
  return phone + ext;
}
