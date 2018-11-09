export const makeLogoutUrl = () => {
  let relativeRoot = process.env.RAILS_RELATIVE_URL_ROOT ? process.env.RAILS_RELATIVE_URL_ROOT : '/'
  if (!relativeRoot.endsWith('/')) {
    relativeRoot += '/'
  }
  return `${relativeRoot}logout`
}
