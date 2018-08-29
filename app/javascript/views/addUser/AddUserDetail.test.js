import React from 'react';
import { shallow } from 'enzyme';
import AddUserDetail from './AddUserDetail';

describe('AddUserDetail', () => {
  let wrapper;
  let mockFetchDetailsActions;
  let mockSaveUserDetailsActions;

  beforeEach(() => {
    mockFetchDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockSaveUserDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]));
    wrapper = shallow(
      <AddUserDetail
        details={{}}
        id=""
        dashboardUrl={'dburl'}
        userListUrl={'myUserList'}
        permissionRoles={['list1', 'list2']}
        actions={{
          fetchDetailsActions: mockFetchDetailsActions,
          saveUserDetailsActions: mockSaveUserDetailsActions,
        }}
      />,
      { disableLifecycleMethods: true }
    );
  });

  describe('Setting the state', () => {
    describe('#onStatusChange() function', () => {
      it('should set the Status state when event is triggered', () => {
        const expectedvalue = { enabled: true };
        const instance = wrapper.instance();
        const myFunction = instance.onStatusChange('enabled');
        myFunction({ value: true });
        expect(instance.state.details).toEqual(expectedvalue);
        expect(instance.state.disableActionBtn).toBe(false);
      });
    });

    describe('#onRoleChange', () => {
      it('should set the Permissions state when event is triggered', () => {
        const expectedValue = { permissions: { 0: 'Hotline-rollout' } };
        const instance = wrapper.instance();
        const myFunction = instance.onRoleChange;
        expect(() => myFunction({ 0: 'Hotline-rollout' })).not.toThrow();
        expect(instance.state.details).toEqual(expectedValue);
        expect(instance.state.disableActionBtn).toBe(false);
      });
    });

    describe('#onEditClick', () => {
      it('toggles the isEdit flag', () => {
        const instance = wrapper.instance();
        instance.onEditClick();
        expect(instance.state.isEdit).toEqual(true);
        instance.onEditClick();
        expect(instance.state.isEdit).toEqual(false);
      });
    });
  });

  describe('#alert()', () => {
    it('displays <Alert/>', () => {
      wrapper.setState({ alert: true });
      const alertBox = wrapper.find('Alert');
      expect(alertBox.length).toBe(1);
      expect(alertBox.props().children).toBe(
        'Your changes have been made successfully'
      );
      expect(alertBox.props().alertCross).toEqual(false);
    });
  });

  describe('#onCancel', () => {
    it('calls the appropriate function', () => {
      wrapper.setState({ id: 'id' });
      wrapper.instance().onCancel();
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('id');
      wrapper.instance().onCancel();
      expect(wrapper.instance().state.isEdit).toEqual(false);
      expect(wrapper.instance().state.alert).toEqual(false);
    });
  });

  describe('#UNSAFE_componentWillReceiveProps', () => {
    it('passes along the props', () => {
      const instance = wrapper.instance();
      instance.UNSAFE_componentWillReceiveProps({
        id: 'some_id',
        details: { test_prop: 'prop_value' },
      });
      expect(instance.state.details.test_prop).toEqual('prop_value');
    });
  });

  describe('#componentDidUpdate', () => {
    it('passes along the props', () => {
      const instance = wrapper.instance();
      expect(mockFetchDetailsActions).not.toHaveBeenCalled();
      instance.setState({ id: 'some_id' });
      instance.componentDidUpdate({});
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('some_id');
    });
  });

  describe('#onSaveDetails', () => {
    it('calls the service to patch the user record', () => {
      wrapper.instance().onSaveDetails();
      expect(mockSaveUserDetailsActions).toHaveBeenCalledWith('', {});
      wrapper.instance().onSaveDetails();
      expect(wrapper.instance().state.isEdit).toEqual(false);
      expect(wrapper.instance().state.alert).toEqual(true);
    });
  });

  describe('renders components', () => {
    it('renders component "PageHeader"', () => {
      expect(wrapper.find('PageHeader').length).toBe(1);
    });

    it('renders navigation link to Dashboard', () => {
      expect(
        wrapper
          .find('Link')
          .at(0)
          .html()
      ).toContain('Dashboard');
    });

    describe('renders cards', () => {
      it('should display <UserDetailShow/>', () => {
        wrapper.setState({ isEdit: false, details: { id: '12345' } });
        expect(wrapper.find('UserDetailShow').length).toBe(1);
        expect(wrapper.find('UserDetailShow').props().permissionsList).toEqual([
          'list1',
          'list2',
        ]);
      });

      it('should display <UserDetailEdit/>', () => {
        wrapper.setState({ isEdit: true, details: { id: '12345' } });
        expect(wrapper.find('UserDetailEdit').length).toBe(1);
        expect(wrapper.find('UserDetailEdit').props().disableActionBtn).toBe(
          true
        );
      });
    });

    describe('Link to user list', () => {
      let link;

      beforeEach(() => {
        link = wrapper.find('Link').at(1);
      });

      it('link is labeled User List', () => {
        expect(link.html()).toContain('User List');
      });
    });

    it('first link is pointed at dashboard', () => {
      expect(wrapper.find('Link').get(0).props['href']).toEqual('dburl');
    });

    it('link is pointed at user list', () => {
      expect(wrapper.find('Link').get(1).props['href']).toEqual('myUserList');
    });

    it('default props', () => {
      expect(AddUserDetail.defaultProps.userListUrl).toEqual('/');
      expect(AddUserDetail.defaultProps.dashboardUrl).toEqual('/');
      expect(AddUserDetail.defaultProps.userListClickHandler).not.toThrow();
      expect(AddUserDetail.defaultProps.dashboardClickHandler).not.toThrow();
    });
  });
});
