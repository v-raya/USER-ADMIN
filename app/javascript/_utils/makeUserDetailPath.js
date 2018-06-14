export function makeUserDetailPath(userId) {
  var relativeRoot = process.env.RAILS_RELATIVE_URL_ROOT
    ? process.env.RAILS_RELATIVE_URL_ROOT
    : '/';
  if (!relativeRoot.endsWith('/')) {
    relativeRoot = relativeRoot + '/';
  }
  return relativeRoot + ['user_details', encodeURIComponent(userId)].join('/');
}
