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

  static validateUser(email, racfid) {
    return ApiService.get(`/verify_user?email=${email}&racfid=${racfid}`).then(
      response => response.data
    );
  }

  static saveUserDetails(id, details) {
    const permissions = [];
    if (Array.isArray(details.permissions)) {
      [].push.apply(permissions, details['permissions']);
    } else if (details['permissions']) {
      details['permissions'].split(',').forEach(value => {
        permissions.push(value);
      });
    }

    const isEnabled = details['enabled'] === 'Active';
    const data = { enabled: isEnabled, permissions: permissions };

    return ApiService.patch(`/user_detail/${id}/save_user`, data).then(
      response => response.data
    );
  }

  static fetchPermissionsList() {
    return ApiService.get(`/permissions_list/`).then(response => response.data);
  }

  static createUser(newUser) {
    return ApiService.post(`/create_user`, newUser).then(
      response => response.data
    );
  }
}

export default UserService;
