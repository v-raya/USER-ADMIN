import React from 'react';
import { mount, shallow } from 'enzyme';
import UsersList from './UsersList.jsx';

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

  describe('#nameFormat', () => {
    it('shows nameFormat', () => {
      const anchor = wrapper
        .instance()
        .nameFormat('any', { last_name: 'Surname', first_name: 'Given' });
      expect(anchor.props.children.join('')).toEqual('Surname, Given');
    });
  });

  describe('#userStatusFormat', () => {
    it('returns "Enabled" for true', () => {
      expect(
        wrapper.instance().userStatusFormat('any', { enabled: true })
      ).toBe('Active');
    });

    it('returns "Inactive" for false', () => {
      expect(
        wrapper.instance().userStatusFormat('any', { enabled: false })
      ).toBe('Inactive');
    });
  });

  describe('#handleOnClick', () => {
    const mockFetchUsersActions = jest.fn();

    beforeEach(() => {
      wrapper.setProps({
        actions: { fetchUsersActions: mockFetchUsersActions },
      });
      wrapper.setState({ searchKey: 'SomeSearchKey' });
    });

    afterEach(() => {
      mockFetchUsersActions.mockRestore();
    });

    it('calls the appropriate function', () => {
      wrapper.instance().handleOnClick();
      expect(mockFetchUsersActions).toHaveBeenCalledWith('SomeSearchKey');
    });
  });

  describe('#handleTextChange', () => {
    it('sets state based on the text changing', () => {
      wrapper
        .instance()
        .handleTextChange({ target: { value: 'search value' } });
      expect(wrapper.instance().state.searchKey).toEqual('search value');
    });
  });

  describe('#handleOnAdd', () => {
    it('sets state based on the user action', () => {
      wrapper.instance().handleOnAdd();
      expect(wrapper.instance().state.addUser).toEqual(true);
    });
  });

  describe('#componentDidMount', () => {
    let mockFetchUsersActions;
    let mockFetchAccountActions;

    beforeEach(() => {
      mockFetchUsersActions = jest.fn();
      mockFetchAccountActions = jest.fn();
      mount(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            fetchUsersActions: mockFetchUsersActions,
            fetchAccountActions: mockFetchAccountActions,
          }}
        />
      );
    });

    it('fetches users', () => {
      expect(mockFetchUsersActions).toHaveBeenCalledWith('');
    });

    it('fetches the account', () => {
      expect(mockFetchAccountActions).toHaveBeenCalledWith();
    });
  });

  describe('#UserList output', () => {
    it('contains Table and headers', () => {
      expect(wrapper.find('BootstrapTable').length).toBe(1);
      expect(wrapper.find('TableHeaderColumn').length).toBe(5);
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
