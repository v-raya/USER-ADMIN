import { fetchOfficesActions } from './officesActions';
import { FETCH_OFFICES_API_CALL_REQUEST } from './actionTypes';

describe('#fetchOfficesActions', () => {
  it('returns type and payload', () => {
    expect(fetchOfficesActions()).toEqual({
      type: FETCH_OFFICES_API_CALL_REQUEST,
    });
  });
});
