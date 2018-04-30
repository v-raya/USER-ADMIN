import ApiService from '../api';

class UserService {
  static fetch() {
    return ApiService.get('https://dog.ceo/api/breeds/image/random').then(
      response => response.data
    );
  }
}

export default UserService;
