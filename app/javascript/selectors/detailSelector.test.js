import { selectDetailRecords } from './detailSelector';

describe('selectors', () => {
  describe('#selectDetailRecords', () => {
    it('selects the user detail records when enabled is true', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              county_name: 'first',
              enabled: true,
              id: '12',
              name: 'third',
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        id: '12',
        enabled: 'Active',
        name: 'third',
      });
    });

    it('selects the user detail records when enabled is false', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              county_name: 'first',
              enabled: false,
              id: '12',
              name: 'third',
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        id: '12',
        enabled: 'Inactive',
        name: 'third',
      });
    });

    it('selects empty user details', () => {
      const state = {
        fetch: {},
        other_stuff: { bad: 'ignore' },
      };
      expect(selectDetailRecords(state)).toEqual({ enabled: '' });
    });

    it('selects no user details', () => {
      const state = {
        other_stuff: { bad: 'ignore' },
      };
      expect(selectDetailRecords(state)).toEqual({ enabled: '' });
    });
  });
});
