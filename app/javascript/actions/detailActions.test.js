import {
  fetchDetailsActions,
  clearDetails,
  saveUserDetailsActions,
} from './detailActions';
import {
  FETCH_DETAILS_API_CALL_REQUEST,
  SAVE_USER_DETAILS_API_CALL_REQUEST,
  CLEAR_USER_DETAILS,
} from './actionTypes';

describe('#fetchDetailsActions', () => {
  it('returns type and payload', () => {
    const id = 'SOMEID';
    expect(fetchDetailsActions(id)).toEqual({
      type: FETCH_DETAILS_API_CALL_REQUEST,
      payload: { id: id },
    });
  });
});

describe('#saveUserDetailsActions', () => {
  it('returns type and payload', () => {
    const id = 'SOMEID';
    const details = {
      first_name: 'firstName',
      last_name: 'lastName',
      racfid: 'SOMETHING',
      email: 'Email@email.ocm',
      phone: '000000000',
    };
    expect(saveUserDetailsActions(id, details)).toEqual({
      type: SAVE_USER_DETAILS_API_CALL_REQUEST,
      payload: { id: id, details: details },
    });
  });
});

describe('#clearDetails', () => {
  it('returns type ', () => {
    expect(clearDetails()).toEqual({
      type: CLEAR_USER_DETAILS,
    });
  });
});
