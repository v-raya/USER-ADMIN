import { userName } from './globalHeaderSelectors';

describe('accountSelectors', () => {
  describe('#userName', () => {
    it('selects the firstName and lastName when availble', () => {
      const state = {
        userList: {
          account: {
            XHRStatus: 'ready',
            user: 'RACFID',
            staff_id: '0X5',
            county_code: '20',
            county_name: 'Sacramento',
            last_name: 'lastname',
            first_name: 'firstname',
          },
        },
      };
      expect(userName(state)).toEqual('firstname lastname');
    });

    it('display empty string when there is no name', () => {
      const state = {
        userList: {
          XHRStatus: 'ready',
          user: 'RACFID',
          staff_id: '0X5',
          county_code: '20',
        },
      };
      expect(userName(state)).toEqual(' ');
    });
  });
});
