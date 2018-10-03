import React from 'react';
import { mount, shallow } from 'enzyme';
import UsersList from './UsersList.jsx';
import { Link } from 'react-router-dom';

describe('UsersList', () => {
  let wrapper;
  let mockSetPageActions;
  let mockSetPageSizeActions;
  let mockSetSortActions;
  let mockSetNextSearchActions;
  let mockSetOfficesListAction;

  const query = [
    {
      field: 'last_name',
      value: 'last_name_value',
    },
    {
      field: 'office_ids',
      value: ['north', 'south', 'east', 'west'],
    },
  ];

  beforeEach(() => {
    mockSetPageActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockSetPageSizeActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockSetSortActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockSetNextSearchActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockSetOfficesListAction = jest.fn().mockReturnValue(Promise.resolve([]));

    wrapper = shallow(
      <UsersList
        dashboardUrl={'dburl'}
        actions={{
          setPage: mockSetPageActions,
          setPageSize: mockSetPageSizeActions,
          setSort: mockSetSortActions,
          setNextSearch: mockSetNextSearchActions,
          setOfficesList: mockSetOfficesListAction,
        }}
        loggedInUserAccount={{ county_name: 'SomeCountyName' }}
        query={query}
        selectedOfficesList={['somevalue']}
      />,
      {
        disableLifecycleMethods: true,
      }
    );
  });

  describe('renders components', () => {
    it('renders card component', () => {
      expect(wrapper.find('Cards').length).toBeGreaterThan(0);
    });

    it('checks card component props', () => {
      expect(wrapper.find('Cards').props().cardHeaderButton).toBe(true);
      expect(wrapper.find('Cards').props().cardHeaderText).toBe(
        'County: SomeCountyName'
      );
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

  describe('#Alert', () => {
    it('sets state based on the user action', () => {
      wrapper.setProps({ error: 'IfSomeErrorShowsUp' });
      expect(wrapper.find('Alert').length).toEqual(1);
    });
  });

  describe('#handlePageChange', () => {
    it('calls the setPage Actions', () => {
      let pageIndex = 'someValue';
      wrapper.instance().handlePageChange(pageIndex);
      expect(mockSetPageActions).toHaveBeenCalledWith(pageIndex);
    });
  });

  describe('#handleOfficesListChange', () => {
    it('calls the setOfficesList Actions', () => {
      wrapper.instance().handleOfficesListChange(['newValue']);
      expect(mockSetOfficesListAction).toHaveBeenCalledWith(['newValue']);
    });
  });

  describe('#handlePageSizeChange', () => {
    it('calls the setPageSize Actions', () => {
      let pageIndex = 'someValue';
      let pageSize = 30;
      wrapper.instance().handlePageSizeChange(pageSize, pageIndex);
      expect(mockSetPageSizeActions).toHaveBeenCalledWith(pageSize);
    });
  });

  describe('#handleSearchChange', () => {
    it('calls the setNextSearch Actions', () => {
      wrapper.instance().handleSearchChange({ target: { value: 'newValue' } });
      expect(mockSetNextSearchActions).toHaveBeenCalledWith('newValue');
    });
  });

  describe('#submitSearch', () => {
    it('calls the setSearch Actions', () => {
      let mockSetSearchActions;
      mockSetSearchActions = jest.fn().mockReturnValue(Promise.resolve([]));
      const wrapperLocal = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          loggedInUserAccount={{ county_name: 'SomeCountyName' }}
          query={query}
          nextSearch="last_name_value"
          selectedOfficesList={['north', 'south', 'east', 'west']}
        />
      );
      const event = { preventDefault: () => {} };
      wrapperLocal.instance().submitSearch(event);
      expect(mockSetSearchActions).toHaveBeenCalledWith(query);
    });
  });

  describe('#handleSortChange', () => {
    it('calls the sortChange Actions', () => {
      let shiftKey = 'someKey';
      let column = 'Full Name';
      let newSorted = [
        {
          id: 'someId',
          desc: 'someValue',
        },
      ];
      wrapper.instance().handleSortChange(newSorted, column, shiftKey);
      expect(mockSetSortActions).toHaveBeenCalledWith([
        { desc: 'someValue', field: 'someId' },
      ]);
    });
  });

  describe('#initialLoadQuery', () => {
    const query = [
      { field: 'last_name', value: 'last_name_value' },
      { field: 'office_ids', value: ['east', 'north', 'south', 'west'] },
    ];
    it('limits the default query to the user admin office for office-admins', () => {
      expect(
        wrapper.instance().initialLoadQuery({
          admin_office_ids: ['a', 'b'],
          roles: ['Office-admin'],
        })
      ).toEqual([
        { field: 'last_name', value: '' },
        { field: 'office_ids', value: ['a', 'b'] },
      ]);
    });

    it('selects the default office ids in the select-list', () => {
      wrapper.instance().initialLoadQuery({
        admin_office_ids: ['a', 'b'],
        roles: ['Office-admin'],
      });
      expect(mockSetOfficesListAction).toHaveBeenCalledWith(['a', 'b']);
    });

    it('does not limit the default query for county-admins', () => {
      expect(
        wrapper.instance().initialLoadQuery({
          admin_office_ids: ['a', 'b'],
          roles: ['County-admin', 'Office-admin'],
        })
      ).toEqual(query);
    });

    it('does not limit the default query for state-admins', () => {
      expect(
        wrapper.instance().initialLoadQuery({
          admin_office_ids: ['a', 'b'],
          roles: ['State-admin', 'County-admin', 'Office-admin'],
        })
      ).toEqual(query);
    });
  });

  describe('#isDisabledSearchBtn', () => {
    let query = [
      {
        field: 'last_name',
        value: 'last_name_value',
      },
      {
        field: 'office_ids',
        value: ['somevalue'],
      },
    ];
    it('returns true when query and entered search criteria are same', () => {
      const component = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
          }}
          loggedInUserAccount={{ county_name: 'SomeCountyName' }}
          query={query}
          nextSearch="last_name_value"
          selectedOfficesList={['somevalue']}
        />
      );
      expect(component.instance().isDisabledSearchBtn()).toEqual(true);
    });

    it('returns false when search query and entered search criteria are different', () => {
      const component = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
          }}
          loggedInUserAccount={{ county_name: 'SomeCountyName' }}
          query={query}
          nextSearch="new_last_name"
          selectedOfficesList={['new_value']}
        />
      );
      expect(component.instance().isDisabledSearchBtn()).toEqual(false);
    });
  });

  describe('getTotalPages', () => {
    it('retuns 1 when resultset is empty', () => {
      wrapper.setProps({ size: 10, userList: [], total: 419 });
      expect(wrapper.instance().getTotalPages()).toEqual(1);
    });

    it('calculates correct page count (total / size) + 1 if there is a remainder.', () => {
      wrapper.setProps({ size: 10, userList: [{}], total: 419 });
      expect(wrapper.instance().getTotalPages()).toEqual(42);
      wrapper.setProps({ size: 10, total: 420, userList: [{}] });
      expect(wrapper.instance().getTotalPages()).toEqual(42);
      wrapper.setProps({ size: 10, total: 421, userList: [{}] });
      expect(wrapper.instance().getTotalPages()).toEqual(43);
    });

    it('returns -1 (indeterminate) when total numPages can not be calculated', () => {
      wrapper.setProps({ size: undefined, userList: [{}], total: undefined });
      expect(wrapper.instance().getTotalPages()).toEqual(-1);
      wrapper.setProps({ size: 0, userList: [{}], total: 0 });
      expect(wrapper.instance().getTotalPages()).toEqual(-1);
    });
  });

  describe('#UNSAFE_componentDidMount', () => {
    let mockFetchAccountActions;
    let mockFetchOfficeListActions;

    beforeEach(() => {
      mockFetchAccountActions = jest.fn();
      mockFetchOfficeListActions = jest.fn();
      mount(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            fetchAccountActions: mockFetchAccountActions,
            fetchOfficesActions: mockFetchOfficeListActions,
          }}
          loggedInUserAccount={{ county_name: 'SomeCountyName' }}
          query={query}
          selectedOfficesList={['somevalue']}
        />
      );
    });

    it('fetches the account', () => {
      expect(mockFetchAccountActions).toHaveBeenCalledWith();
    });

    it('fetches the office list', () => {
      expect(mockFetchOfficeListActions).toHaveBeenCalledWith();
    });
  });

  describe('#componentDidUpdate', () => {
    let mockSearchUsers;

    beforeEach(() => {
      mockSearchUsers = jest.fn();
      const wrapperLocal = mount(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            searchUsers: mockSearchUsers,
            setOfficesList: mockSetOfficesListAction,
          }}
          loggedInUserAccount={{
            county_name: 'SomeCountyName',
            admin_office_ids: ['42'],
            roles: ['Office-admin', 'other-role'],
          }}
          from={0}
          sort={[]}
          size={50}
          query={query}
          nextSearch="some_value"
          selectedOfficesList={['somevalue']}
        />
      );

      wrapperLocal.instance().componentDidUpdate({
        loggedInUserAccount: {},
      });
    });

    it('fetches users', () => {
      // TODO: make a stronger expectation of args based on API query DSL (when it emerges)
      expect(mockSearchUsers).toHaveBeenCalledWith({
        from: 0,
        query: [
          { field: 'last_name', value: 'some_value' },
          { field: 'office_ids', value: ['42'] },
        ],
        size: 50,
        sort: [],
      });
    });
  });

  describe('#isOfficeAdmin', () => {
    it('accepts Office-admin role only if not state or county admin', () => {
      const component = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
          }}
          loggedInUserAccount={{
            county_name: 'SomeCountyName',
            roles: ['Office-admin', 'County-admin'],
          }}
          query={query}
          selectedOfficesList={['somevalue']}
        />
      );
      expect(component.instance().isOfficeAdmin()).toBe(false);
    });
  });

  describe('#isCountyAdmin', () => {
    it('accepts Office-admin role only if not state', () => {
      const component = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
          }}
          loggedInUserAccount={{
            county_name: 'SomeCountyName',
            roles: ['Office-admin', 'County-admin', 'State-admin'],
          }}
          query={query}
          selectedOfficesList={['somevalue']}
        />
      );
      expect(component.instance().isOfficeAdmin()).toBe(false);
    });
  });

  describe('#UserList output', () => {
    it('contains Table and headers', () => {
      const component = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
          }}
          loggedInUserAccount={{ county_name: 'SomeCountyName' }}
          sort={[
            {
              field: 'last_name',
              desc: 'value',
            },
          ]}
          query={query}
          selectedOfficesList={['somevalue']}
        />
      );

      let value = 'value';
      let original = {
        id: '1234AGFS',
      };
      expect(wrapper.find('ReactTable').length).toBe(1);
      expect(wrapper.find('ReactTable').prop('columns').length).toBe(5);
      expect(wrapper.find('ReactTable').prop('columns')[0]['id']).toBe(
        'last_name'
      );
      expect(wrapper.find('ReactTable').prop('columns')[1]['id']).toBe(
        'enabled'
      );
      expect(wrapper.find('ReactTable').prop('columns')[2]['id']).toBe(
        'last_login_date_time'
      );
      expect(wrapper.find('ReactTable').prop('columns')[3]['accessor']).toBe(
        'racfid'
      );
      expect(component.find('ReactTable').prop('sorted')).toEqual([
        { desc: 'value', id: 'last_name' },
      ]);
      expect(
        wrapper
          .find('ReactTable')
          .prop('columns')[0]
          ['Cell']({ value, original })
      ).toEqual(<Link to="/user_details/1234AGFS">value</Link>);
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
