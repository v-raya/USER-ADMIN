import { selectCounty, userName } from './accountSelectors';

describe('accountSelectors', () => {
  describe('#selectCounty', () => {
    it('selects the county when availble', () => {
      const state = {
        fetchAccount: {
          account: {
            XHRStatus: 'ready',
            account: {
              user: 'RACFID',
              staff_id: '0X5',
              county_code: '20',
              county_name: 'Sacramento',
            },
          },
        },
      };
      expect(selectCounty(state)).toEqual('Sacramento');
    });

    it('display empty string when county is not known', () => {
      const state = {
        fetchAccount: {
          XHRStatus: 'ready',
          user: 'RACFID',
          staff_id: '0X5',
          county_code: '20',
        },
      };
      expect(selectCounty(state)).toEqual('');
    });
  });

  describe('#userName', () => {
    it('selects the firstName and lastName when availble', () => {
      const state = {
        fetchAccount: {
          account: {
            XHRStatus: 'ready',
            account: {
              user: 'RACFID',
              staff_id: '0X5',
              county_code: '20',
              county_name: 'Sacramento',
              last_name: 'lastname',
              first_name: 'firstname',
            },
          },
        },
      };
      expect(userName(state)).toEqual('lastname firstname');
    });

    it('display empty string when county is not known', () => {
      const state = {
        fetchAccount: {
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
