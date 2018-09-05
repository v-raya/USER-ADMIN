import { fetchAccountActions } from './accountActions';
import { FETCH_ACCOUNT_API_CALL_REQUEST } from './actionTypes';

describe('#fetchAccountActions', () => {
  it('returns type and payload', () => {
    const token = 'ABCDEFGHIJKLMOPQRST';
    expect(fetchAccountActions(token)).toEqual({
      type: FETCH_ACCOUNT_API_CALL_REQUEST,
      payload: { token: token },
    });
  });
});
