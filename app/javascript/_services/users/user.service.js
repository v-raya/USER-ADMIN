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

  static updateUser(id, data) {
    return ApiService.post(`/user_detail/${id}`, data).then(
      response => response.data
    );
  }
}

export default UserService;
