import React from 'react'
import { mount, shallow } from 'enzyme'
import UsersList from './UsersList.jsx'
import { Link } from 'react-router-dom'

describe('UsersList', () => {
  let wrapper
  let mockSetPageActions
  let mockSetPageSizeActions
  let mockSetSortActions
  let mockSetNextSearchActions
  let mockSetOfficesListAction
  let mockHandleSearchChange
  let mockClearAddedUserDetailActions
  let mockHandleCheckBoxChangeActions
  let mockSetSearchActions

  const query = [
    {
      field: 'last_name',
      value: 'last_name_value',
    },
    {
      field: 'office_ids',
      value: ['north', 'south', 'east', 'west'],
    },
    { field: 'enabled', value: true },
  ]

  beforeEach(() => {
    mockSetPageActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetPageSizeActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetSortActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetNextSearchActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetOfficesListAction = jest.fn().mockReturnValue(Promise.resolve([]))
    mockHandleSearchChange = jest.fn().mockReturnValue(Promise.resolve([]))
    mockClearAddedUserDetailActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockSetSearchActions = jest.fn().mockReturnValue(Promise.resolve([]))
    mockHandleCheckBoxChangeActions = jest.fn()

    wrapper = shallow(
      <UsersList
        dashboardUrl={'dburl'}
        actions={{
          setPage: mockSetPageActions,
          setPageSize: mockSetPageSizeActions,
          setSort: mockSetSortActions,
          setNextSearch: mockSetNextSearchActions,
          setOfficesList: mockSetOfficesListAction,
          handleSearchChange: mockHandleSearchChange,
          clearAddedUserDetailActions: mockClearAddedUserDetailActions,
          handleCheckBoxChangeActions: mockHandleCheckBoxChangeActions,
          setSearch: mockSetSearchActions,
        }}
        cardHeaderValue="County: CountyName"
        query={query}
        includeInactive={false}
      />,
      {
        disableLifecycleMethods: true,
      }
    )
  })

  describe('renders components', () => {
    it('renders card component', () => {
      expect(wrapper.find('Cards').length).toBeGreaterThan(0)
    })

    it('checks card component props', () => {
      expect(wrapper.find('Cards').props().cardHeaderButton).toBe(true)
      expect(wrapper.find('Cards').props().cardHeaderText).toBe('County: CountyName')
      expect(wrapper.find('Cards').props().headerBtnName).toBe('+ Add a user')
    })

    it('cardHeaderText is passed to Card props as value', () => {
      const wrapperLocal = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          adminAccountDetails={{ roles: ['State-admin'] }}
          query={query}
          lastName="last_name_value"
          officeNames={['north', 'south', 'east', 'west']}
          includeInactive={false}
          officeList={[
            { value: 'someOffice1', label: 'someOfficeOne' },
            { value: 'someOffice2', label: 'someOfficeTwo' },
          ]}
          cardHeaderValue="State Administrator view"
        />
      )
      expect(wrapperLocal.find('Cards').props().cardHeaderButton).toBe(true)
      expect(wrapperLocal.find('Cards').props().cardHeaderText).toBe('State Administrator view')
      expect(wrapperLocal.find('Cards').props().headerBtnName).toBe('+ Add a user')
    })

    it('renders PageHeader component', () => {
      expect(wrapper.find('PageHeader').length).toBe(1)
    })
  })

  describe('#handleOnAdd', () => {
    it('sets state based on the user action', () => {
      wrapper.instance().handleOnAdd()
      expect(wrapper.instance().state.addUser).toEqual(true)
    })
  })

  describe('#Alert', () => {
    it('sets state based on the user action', () => {
      wrapper.setProps({ error: 'IfSomeErrorShowsUp' })
      expect(wrapper.find('Alert').length).toEqual(1)
    })
  })

  describe('#handlePageChange', () => {
    it('calls the setPage Actions', () => {
      const pageIndex = 'someValue'
      wrapper.instance().handlePageChange(pageIndex)
      expect(mockSetPageActions).toHaveBeenCalledWith(pageIndex)
    })
  })

  describe('#handleSearchInputChange', () => {
    it('office name change calls handleSearchChange Actions', () => {
      const value = [{ value: 'someOffice1', label: 'someOfficeOne' }, { value: 'someOffice2', label: 'someOfficeTwo' }]
      wrapper.find('#searchOfficeName').simulate('change', value)
      expect(mockHandleSearchChange).toHaveBeenCalledWith('officeNames', ['someOffice1', 'someOffice2'])
    })

    it('last name change calls handleSearchChange Actions', () => {
      wrapper.find('#searchLastName').simulate('change', { target: { value: 'someLastName' } })
      expect(mockHandleSearchChange).toHaveBeenCalledWith('lastName', 'someLastName')
    })
  })

  describe('#handlePageSizeChange', () => {
    it('calls the setPageSize Actions', () => {
      const pageIndex = 'someValue'
      const pageSize = 30
      wrapper.instance().handlePageSizeChange(pageSize, pageIndex)
      expect(mockSetPageSizeActions).toHaveBeenCalledWith(pageSize)
    })
  })

  describe('#submitSearch', () => {
    it('calls the setSearch Actions', () => {
      const wrapperLocal = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          query={query}
          lastName="last_name_value"
          officeNames={['north', 'south', 'east', 'west']}
          includeInactive={false}
        />
      )
      const newQuery = [
        {
          field: 'last_name',
          value: 'last_name_value',
        },
        {
          field: 'office_ids',
          value: ['east', 'north', 'south', 'west'],
        },
        { field: 'enabled', value: true },
      ]
      const event = { preventDefault: () => {} }
      wrapperLocal.instance().submitSearch(event)
      expect(mockSetSearchActions).toHaveBeenCalledWith(newQuery)
    })

    it('calls the setSearch Actions with includeInactive props as true', () => {
      const wrapperLocal = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
            setSearch: mockSetSearchActions,
          }}
          query={query}
          lastName="last_name_value"
          officeNames={['north', 'south', 'east', 'west']}
          includeInactive={true}
        />
      )
      const newQuery = [
        {
          field: 'last_name',
          value: 'last_name_value',
        },
        {
          field: 'office_ids',
          value: ['east', 'north', 'south', 'west'],
        },
        { field: 'enabled', value: '' },
      ]
      const event = { preventDefault: () => {} }
      wrapperLocal.instance().submitSearch(event)
      expect(mockSetSearchActions).toHaveBeenCalledWith(newQuery)
    })
  })

  describe('#handleSortChange', () => {
    it('calls the sortChange Actions', () => {
      const shiftKey = 'someKey'
      const column = 'Full Name'
      const newSorted = [
        {
          id: 'someId',
          desc: 'someValue',
        },
      ]
      wrapper.instance().handleSortChange(newSorted, column, shiftKey)
      expect(mockSetSortActions).toHaveBeenCalledWith([{ desc: 'someValue', field: 'someId' }])
    })
  })

  describe('#handleCheckBoxChange', () => {
    it('calls the handleCheckBoxChange Actions with includeInactive props as false', () => {
      const query = [
        {
          field: 'last_name',
          value: '',
        },
        {
          field: 'office_ids',
          value: [],
        },
        { field: 'enabled', value: '' },
      ]
      wrapper.instance().handleCheckBoxChange()
      expect(mockHandleCheckBoxChangeActions).toHaveBeenCalledWith()
      expect(mockSetSearchActions).toHaveBeenCalledWith(query)
    })

    it('calls the handleCheckBoxChange Actions with includeInactive props as true ', () => {
      const query = [
        {
          field: 'last_name',
          value: '',
        },
        {
          field: 'office_ids',
          value: [],
        },
        { field: 'enabled', value: true },
      ]
      wrapper.setProps({ includeInactive: true })
      wrapper.instance().handleCheckBoxChange()
      expect(mockHandleCheckBoxChangeActions).toHaveBeenCalledWith()
      expect(mockSetSearchActions).toHaveBeenCalledWith(query)
    })
  })

  describe('#isDisabledSearchBtn', () => {
    const query = [
      {
        field: 'last_name',
        value: 'last_name_value',
      },
      {
        field: 'office_ids',
        value: ['somevalue'],
      },
    ]
    it('returns true when query and entered search criteria are same', () => {
      const component = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setSearch: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
          }}
          query={query}
          lastName="last_name_value"
          officeNames={['somevalue']}
          includeInactive={false}
        />
      )
      expect(component.instance().isDisabledSearchBtn()).toEqual(true)
    })

    it('returns false when search query and entered search criteria are different', () => {
      const component = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setSearch: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
          }}
          query={query}
          lastName="new_last_name"
          officeNames={['new_value']}
          includeInactive={false}
        />
      )
      expect(component.instance().isDisabledSearchBtn()).toEqual(false)
    })
  })

  describe('getTotalPages', () => {
    it('retuns 1 when resultset is empty', () => {
      wrapper.setProps({ size: 10, userList: [], total: 419 })
      expect(wrapper.instance().getTotalPages()).toEqual(1)
    })

    it('calculates correct page count (total / size) + 1 if there is a remainder.', () => {
      wrapper.setProps({ size: 10, userList: [{}], total: 419 })
      expect(wrapper.instance().getTotalPages()).toEqual(42)
      wrapper.setProps({ size: 10, total: 420, userList: [{}] })
      expect(wrapper.instance().getTotalPages()).toEqual(42)
      wrapper.setProps({ size: 10, total: 421, userList: [{}] })
      expect(wrapper.instance().getTotalPages()).toEqual(43)
    })

    it('returns -1 (indeterminate) when total numPages can not be calculated', () => {
      wrapper.setProps({ size: undefined, userList: [{}], total: undefined })
      expect(wrapper.instance().getTotalPages()).toEqual(-1)
      wrapper.setProps({ size: 0, userList: [{}], total: 0 })
      expect(wrapper.instance().getTotalPages()).toEqual(-1)
    })
  })

  describe('#componentDidMount', () => {
    let mockFetchAccountActions
    let mockFetchOfficeListActions
    let mockFetchRolesActions
    let mockSetSearch
    let mockSetPage
    let component
    let mockClearAddedUserDetailActions

    beforeEach(() => {
      mockFetchAccountActions = jest.fn()
      mockFetchOfficeListActions = jest.fn()
      mockFetchRolesActions = jest.fn()
      mockSetSearch = jest.fn()
      mockSetPage = jest.fn()
      mockClearAddedUserDetailActions = jest.fn()
      component = mount(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            fetchAccountActions: mockFetchAccountActions,
            fetchOfficesActions: mockFetchOfficeListActions,
            fetchRolesActions: mockFetchRolesActions,
            setSearch: mockSetSearch,
            setPage: mockSetPage,
            clearAddedUserDetailActions: mockClearAddedUserDetailActions,
          }}
          from={0}
          sort={[]}
          size={50}
          total={25}
          query={query}
          lastName="some_value"
          officeNames={['north']}
          inputData={{ officeNames: ['north'] }}
          selectedOfficesList={['somevalue']}
          includeInactive={false}
        />
      )
    })

    it('fetch the updated user list', () => {
      component.instance().componentDidMount()
      expect(mockSetSearch).toHaveBeenCalledWith([
        { field: 'last_name', value: 'some_value' },
        { field: 'office_ids', value: ['north'] },
        { field: 'enabled', value: true },
      ])
    })

    it('fetch the updated user list with both and inactive users', () => {
      component.setProps({ includeInactive: true })
      component.instance().componentDidMount()
      expect(mockSetSearch).toHaveBeenCalledWith([
        { field: 'last_name', value: 'some_value' },
        { field: 'office_ids', value: ['north'] },
        { field: 'enabled', value: '' },
      ])
    })

    it('fetches the account details', () => {
      expect(mockFetchAccountActions).toHaveBeenCalledWith()
    })

    it('sets the pageIndex', () => {
      expect(mockSetPage).toHaveBeenCalledWith(0)
    })

    it('fetches the office list', () => {
      expect(mockFetchOfficeListActions).toHaveBeenCalledWith()
    })

    it('fetches the roles list', () => {
      expect(mockFetchRolesActions).toHaveBeenCalledWith()
    })
  })

  describe('#componentDidUpdate', () => {
    let mockSetSearch
    let wrapperLocal
    const query = [
      {
        field: 'last_name',
        value: 'last_name_value',
      },
      {
        field: 'office_ids',
        value: ['north'],
      },
    ]

    beforeEach(() => {
      mockSetSearch = jest.fn()
      wrapperLocal = mount(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setPage: () => {},
            setSearch: mockSetSearch,
            setOfficesList: mockSetOfficesListAction,
            clearAddedUserDetailActions: () => {},
          }}
          from={0}
          sort={[]}
          size={50}
          total={25}
          query={query}
          lastName="some_value"
          officeNames={['north']}
          inputData={{ officeNames: ['north'] }}
          includeInactive={false}
        />
      )
    })

    it('fetches users called', () => {
      // TODO: make a stronger expectation of args based on API query DSL (when it emerges)
      const prevProps = { inputData: {} }

      wrapperLocal.instance().componentDidUpdate(prevProps)
      expect(mockSetSearch).toHaveBeenCalledWith([
        { field: 'last_name', value: 'some_value' },
        { field: 'office_ids', value: ['north'] },
        { field: 'enabled', value: true },
      ])
    })

    it('fetch users who are inactive and active based on includeInactive props', () => {
      const prevProps = { inputData: {} }
      wrapperLocal.setProps({ includeInactive: true })

      wrapperLocal.instance().componentDidUpdate(prevProps)
      expect(mockSetSearch).toHaveBeenCalledWith([
        { field: 'last_name', value: 'some_value' },
        { field: 'office_ids', value: ['north'] },
        { field: 'enabled', value: '' },
      ])
    })

    it('fetches users not called with prevProps', () => {
      const prevProps = {
        inputData: { field: 'lastName', value: 'someValiue' },
      }
      wrapperLocal.instance().componentDidUpdate(prevProps)
      expect(mockSetSearch).not.toHaveBeenCalledWith(prevProps)
    })
  })

  describe('#UserList output', () => {
    it('contains Table and headers', () => {
      const component = shallow(
        <UsersList
          dashboardUrl={'dburl'}
          actions={{
            searchUsers: () => {},
            fetchAccountActions: () => {},
            fetchOfficesActions: () => {},
            fetchRolesActions: () => {},
            setSearch: () => {},
            setPage: () => {},
            clearAddedUserDetailActions: () => {},
          }}
          from={0}
          size={50}
          total={25}
          query={query}
          sort={[
            {
              field: 'last_name',
              desc: 'value',
            },
          ]}
          selectedOfficesList={['somevalue']}
          includeInactive={false}
        />
      )

      const value = 'value'
      const original = {
        id: '1234AGFS',
      }
      expect(wrapper.find('ReactTable').length).toBe(1)
      expect(wrapper.find('ReactTable').prop('columns').length).toBe(6)
      expect(wrapper.find('ReactTable').prop('columns')[0].id).toBe('last_name')
      expect(wrapper.find('ReactTable').prop('columns')[1].id).toBe('enabled')
      expect(wrapper.find('ReactTable').prop('columns')[2].id).toBe('last_login_date_time')
      expect(wrapper.find('ReactTable').prop('columns')[3].accessor).toBe('racfid')
      expect(component.find('ReactTable').prop('sorted')).toEqual([{ desc: 'value', id: 'last_name' }])
      expect(
        wrapper
          .find('ReactTable')
          .prop('columns')[0]
          .Cell({ value, original })
      ).toEqual(<Link to="/user_details/1234AGFS">value</Link>)
    })

    it('renders navigation link to Dashboard', () => {
      expect(
        wrapper
          .find('Link')
          .at(0)
          .html()
      ).toContain('Dashboard')
    })

    it('first link is pointed at dashboard', () => {
      expect(wrapper.find('Link').get(0).props.href).toEqual('dburl')
    })

    it('default props', () => {
      expect(UsersList.defaultProps.dashboardUrl).toEqual('/')
      expect(UsersList.defaultProps.dashboardClickHandler).not.toThrow()
    })
  })
})
