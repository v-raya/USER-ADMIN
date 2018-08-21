export const makeLogoutUrl = () => {
  var relativeRoot = process.env.RAILS_RELATIVE_URL_ROOT
    ? process.env.RAILS_RELATIVE_URL_ROOT
    : '/';
  if (!relativeRoot.endsWith('/')) {
    relativeRoot = relativeRoot + '/';
  }
  return relativeRoot + 'logout';
};
