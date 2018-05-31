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

    if (details['permissions'] && details['permissions'].length > 0) {
      details['permissions'].forEach(value => {
        params.push('permissions' + '=' + encodeURIComponent(value));
      });
    } else {
      params.push('permissions=');
    }

    const query = params.join('&');

    return ApiService.patch(`/user_detail/${id}&${query}`).then(
      response => response.data
    );
  }
}

export default UserService;
