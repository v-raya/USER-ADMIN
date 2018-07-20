import ApiService from '../api';

class UserService {
  static fetch(lastName) {
    return ApiService.get(`/user_list?last_name=${lastName}`).then(
      response => response.data
    );
  }

  static search({ query = [], sort = [], size = 10, from = 0 }) {
    const q = encodeURIComponent(
      JSON.stringify({
        query,
        sort,
        size,
        from,
      })
    );
    return ApiService.get(`/user_list?q=${q}`).then(({ data }) => data);
    // let timeout = new Promise((resolve, reject) => {
    //   let id = setTimeout(() => {
    //     clearTimeout(id);
    //     resolve({
    //       records: [
    //         { first_name: 'Danny', last_name: 'Eck' },
    //         { first_name: 'Danny', last_name: 'Eck' },
    //         { first_name: 'Danny', last_name: 'Eck' },
    //         { first_name: 'Danny', last_name: 'Eck' },
    //         { first_name: 'Danny', last_name: 'Eck' },
    //       ],
    //       meta: {
    //         total: 1000,
    //         request: {
    //           from: 50,
    //           size: 50,
    //           query: [{ field: 'last_name', value: 'Eck' }],
    //           sort: [{ field: 'last_name', desc: false }],
    //         },
    //       },
    //     });
    //   }, 1000);
    // });
    // return timeout;
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

  static addUser(newUser) {
    return ApiService.post('/add_user', newUser).then(
      response => response.data.location
    );
  }
}

export default UserService;
