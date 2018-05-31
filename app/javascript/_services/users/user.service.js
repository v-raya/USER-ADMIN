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

    details['permissions'].forEach(value => {
      params.push('permissions' + '=' + encodeURIComponent(value));
    });

    const query = params.join('&');

    return ApiService.patch(`/user_detail/${id}&${query}`).then(
      response => response.data
    );
  }
}

export default UserService;
