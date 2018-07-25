import React from 'react';
import { mount, shallow } from 'enzyme';
import UsersList, { toFullName } from './UsersList.jsx';

describe('UsersList', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UsersList dashboardUrl={'dburl'} actions={{}} />, {
      disableLifecycleMethods: true,
    });
  });

  describe('renders components', () => {
    it('renders card component', () => {
      expect(wrapper.find('Cards').length).toBeGreaterThan(0);
    });

    it('checks card component props', () => {
      expect(wrapper.find('Cards').props().cardHeaderButton).toBe(true);
      expect(wrapper.find('Cards').props().headerBtnName).toBe('+ Add a user');
    });

    it('renders PageHeader component', () => {
      expect(wrapper.find('PageHeader').length).toBe(1);
    });
  });

  describe('#handleOnAdd', () => {
    it('sets state based on the user action', () => {
      wrapper.instance().handleOnAdd();
      expect(wrapper.instance().state.addUser).toEqual(true);
    });
  });

  describe('getTotalPages', () => {
    it('calculates total pages of 1 when the records are not actually loaded', () => {
      wrapper.setProps({ size: 10, userList: [], total: 419 });
      expect(wrapper.instance().getTotalPages()).toEqual(1);
    });

    it('calculates correct page count (total / size) + 1 if there is a remainder.', () => {
      wrapper.setProps({
        size: 10,
        usersList: [{}, {}, {}],
        total: 419,
      });
      expect(wrapper.instance().getTotalPages()).toEqual(42);
    });

    it('gives up and returns -1 when we have results but the total is 0', () => {
      wrapper.setProps({
        size: 10,
        usersList: [{}, {}, {}],
        total: 0,
      });
      expect(wrapper.instance().getTotalPages()).toEqual(-1);
    });
  });

  describe('#UNSAFE_componentDidMount', () => {
    let mockFetchAccountActions;
    let mockSearchUsers;

    beforeEach(() => {
      mockFetchAccountActions = jest.fn();
      mockSearchUsers = jest.fn();
      mount(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            fetchAccountActions: mockFetchAccountActions,
            searchUsers: mockSearchUsers,
          }}
        />
      );
    });

    it('fetches users', () => {
      // TODO: make a stronger expectation of args based on API query DSL (when it emerges)
      expect(mockSearchUsers).toHaveBeenCalledWith({
        from: undefined,
        query: undefined,
        size: undefined,
        sort: [],
      });
    });

    it('fetches the account', () => {
      expect(mockFetchAccountActions).toHaveBeenCalledWith();
    });

    describe('helpers', () => {
      describe('toFullName', () => {
        it('renders a full name', () => {
          expect(
            toFullName({ first_name: 'First', last_name: 'Last' })
          ).toEqual('Last, First');
        });
      });
    });
  });

  describe('#UserList output', () => {
    it('contains Table and headers', () => {
      expect(wrapper.find('ReactTable').length).toBe(1);
      expect(wrapper.find('ReactTable').prop('columns').length).toBe(5);
    });

    it('renders navigation link to Dashboard', () => {
      expect(
        wrapper
          .find('Link')
          .at(0)
          .html()
      ).toContain('Dashboard');
    });

    it('first link is pointed at dashboard', () => {
      expect(wrapper.find('Link').get(0).props['href']).toEqual('dburl');
    });

    it('default props', () => {
      expect(UsersList.defaultProps.dashboardUrl).toEqual('/');
      expect(UsersList.defaultProps.dashboardClickHandler).not.toThrow();
    });
  });
});
