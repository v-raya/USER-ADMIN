import ApiService from '../api';

class AccountService {
  static fetchCurrent() {
    return ApiService.get('/account').then(response => response.data);
  }
}

export default AccountService;
