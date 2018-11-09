import { userName } from './globalHeaderSelectors'

describe('globalHeaderSelectors', () => {
  describe('#userName', () => {
    it('selects the firstName and lastName when available', () => {
      const state = {
        userList: {
          userLastName: 'lastName',
          userFirstName: 'firstName',
        },
      }
      expect(userName(state)).toEqual('firstName lastName')
    })

    it('display empty string when there is no first name and no last name ', () => {
      const state = {
        userList: {
          userFirstName: '',
          userLastName: '',
        },
      }
      expect(userName(state)).toEqual(' ')
    })
  })
})
