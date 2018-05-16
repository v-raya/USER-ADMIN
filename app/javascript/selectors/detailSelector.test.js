import { selectDetailRecords } from './detailSelector';

describe('selectors', () => {
  describe('#selectUserRecords', () => {
    it('selects the user records', () => {
      const state = {
        fetchDetails: {
          details: {
            records: { county_name: 'first', id: '12', name: 'third' },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        id: '12',
        name: 'third',
      });
    });

    it('selects empty users', () => {
      const state = {
        fetch: {},
        other_stuff: { bad: 'ignore' },
      };
      expect(selectDetailRecords(state)).toEqual({});
    });

    it('selects no users', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(selectDetailRecords(state)).toEqual({});
    });
  });
});
