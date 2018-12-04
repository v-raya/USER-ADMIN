import { userName } from './globalHeaderSelectors'

describe('globalHeaderSelectors', () => {
  describe('#userName', () => {
    it('selects the firstName and lastName when available', () => {
      const state = {
        userList: {
          userAccountDetails: {
            last_name: 'lastName',
            first_name: 'firstName',
          },
        },
      }
      expect(userName(state)).toEqual('firstName lastName')
    })

    it('display empty string when there is no first name and no last name ', () => {
      const state = {
        userList: {
          userAccountDetails: {
            first_name: '',
            last_name: '',
          },
        },
      }
      expect(userName(state)).toEqual(' ')
    })
  })
})
