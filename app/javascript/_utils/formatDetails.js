/* eslint camelcase: 0 */

export function formatPhoneNumber(details) {
  const phone = details.phone_number ? details.phone_number : '';
  const ext =
    details.phone_number &&
    details.phone_extension_number &&
    details.phone_extension_number !== '0'
      ? ` Ext ${details.phone_extension_number}`
      : '';
  return phone + ext;
}
