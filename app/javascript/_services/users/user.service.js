import ApiService from '../api';

class UserService {
  static fetch(lastName) {
    return ApiService.get(`/user_list?last_name=${lastName}`).then(
      response => response.data
    );
  }

  static fetchUserDetails(id) {
    return ApiService.get(`/user_detail/${id}`).then(response => response.data);
  }

  static saveUserDetails(id, details) {
    let params = [];
    params.push('enabled' + '=' + encodeURIComponent(details['enabled']));

    const permissions = [];
    if (details['permissions']) {
      details['permissions'].split(',').forEach(value => {
        permissions.push(value);
      });
    }

    const j = { enabled: details['enabled'], permissions: permissions };
    const query = params.join('&');

    return ApiService.patch(`/user_detail/${id}/save_user`, j).then(
      response => response.data
    );
  }
}

export default UserService;
