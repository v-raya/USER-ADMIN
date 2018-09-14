import { addUserActions } from './addUserActions';
import { ADD_USER_API_CALL_REQUEST } from './actionTypes';

describe('#addUserActions', () => {
  it('returns type and payload', () => {
    const newUser = {
      first_name: 'first_name',
      last_name: 'last_name',
      racfid: 'SOMEID',
      email: 'someEmail@email.com',
    };
    expect(addUserActions(newUser)).toEqual({
      type: ADD_USER_API_CALL_REQUEST,
      payload: { newUser: newUser },
    });
  });
});
