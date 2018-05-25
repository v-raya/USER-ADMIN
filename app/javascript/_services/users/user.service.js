import ApiService from '../api';

class UserService {
  static fetch(id) {
    return ApiService.get(`/user_list/`).then(response => response.data);
  }

  static usersByLastName(id) {
    return ApiService.get(`/search_user/${id}`).then(response => response.data);
  }

  static fetchUserDetails(id) {
    return ApiService.get(`/user_detail/${id}`).then(response => response.data);
  }
}

export default UserService;
