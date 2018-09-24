import {
  searchUsers,
  setPageSize,
  setPage,
  setSearch,
  setNextSearch,
  setOfficesList,
  setSort,
} from './userListActions';
import {
  FETCH_USERS_API_CALL_REQUEST,
  USER_LIST_SET_PAGE_SIZE,
  USER_LIST_SET_PAGE,
  USER_LIST_SET_SEARCH,
  USER_LIST_SET_SORT,
  USER_LIST_SET_NEXT_SEARCH,
  USER_LIST_SET_OFFICE_LIST,
} from './actionTypes';

describe('UserList Actions', () => {
  describe('#searchUsers', () => {
    it('returns type and payload', () => {
      const params = { query: {} };
      expect(searchUsers(params)).toEqual({
        type: FETCH_USERS_API_CALL_REQUEST,
        payload: params,
      });
    });
  });

  describe('#setPageSize', () => {
    it('returns type and payload', () => {
      expect(setPageSize(20)).toEqual({
        type: USER_LIST_SET_PAGE_SIZE,
        payload: 20,
      });
    });
  });

  describe('#setPage', () => {
    it('returns type and payload', () => {
      expect(setPage(2)).toEqual({
        type: USER_LIST_SET_PAGE,
        payload: 2,
      });
    });
  });

  describe('#setSearch', () => {
    it('returns type and payload', () => {
      const query = {};
      expect(setSearch(query)).toEqual({
        type: USER_LIST_SET_SEARCH,
        payload: query,
      });
    });
  });

  describe('#setNextSearch', () => {
    it('returns type and payload', () => {
      const nextSearch = {};
      expect(setNextSearch(nextSearch)).toEqual({
        type: USER_LIST_SET_NEXT_SEARCH,
        payload: nextSearch,
      });
    });
  });

  describe('#setOfficesList', () => {
    it('returns type and payload', () => {
      const officesList = {};
      expect(setOfficesList(officesList)).toEqual({
        type: USER_LIST_SET_OFFICE_LIST,
        payload: officesList,
      });
    });
  });

  describe('#setSort', () => {
    it('returns type and payload', () => {
      const sort = [];
      expect(setSort(sort)).toEqual({
        type: USER_LIST_SET_SORT,
        payload: sort,
      });
    });
  });
});
