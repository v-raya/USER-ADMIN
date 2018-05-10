import ApiService from '../api';

class UserService {
  static fetch() {
    return ApiService.get('/user_list/').then(response => response.data);
  }
}

export default UserService;
