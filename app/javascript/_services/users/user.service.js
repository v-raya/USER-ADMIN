import ApiService from '../api';

class UserService {
  static fetch() {
    return ApiService.get('https://dog.ceo/api/breeds/image/random').then(response => response.data);
    console.log(response);
  }
}

export default UserService;
