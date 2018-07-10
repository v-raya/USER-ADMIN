import React from 'react';
import { mount, shallow } from 'enzyme';
import AddUserDetail from './AddUserDetail';
import UserService from '../../_services/users';

describe('AddUserDetail', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AddUserDetail
        details={{}}
        dashboardUrl={'dburl'}
        userListUrl={'myUserList'}
        actions={{}}
      />,
      { disableLifecycleMethods: true }
    );
  });

  describe('Setting state', () => {
    describe('#onStatusChange() function', () => {
      it('should set the Status state when event is triggered', () => {
        const expectedvalue = { enabled: true };
        const instance = wrapper.instance();
        const myFunction = instance.onStatusChange('enabled');
        expect(() => myFunction({ value: true })).not.toThrow();
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
      expect(wrapper.find('Alert').length).toBe(1);
      expect(wrapper.find('Alert').props().children).toBe(
        'Your changes have been made successfully'
      );
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
    let mockFetchDetailsActions;

    beforeEach(() => {
      mockFetchDetailsActions = jest.fn();
    });

    it('passes along the props', () => {
      const wrapper = mount(
        <AddUserDetail
          details={{}}
          dashboardUrl={'dburl'}
          userListUrl={'myUserList'}
          actions={{
            fetchDetailsActions: mockFetchDetailsActions,
          }}
        />
      );
      const instance = wrapper.instance();
      instance.componentDidUpdate({});
      instance.setState({ id: 'some_id' });
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('some_id');
    });
  });

  describe('#formattedPermissions', () => {
    let myFormattedPermissions;

    beforeEach(() => {
      const instance = wrapper.instance();
      myFormattedPermissions = instance.formattedPermissions;
    });

    it('handles undefined', () => {
      expect(myFormattedPermissions(undefined)).toEqual([]);
    });

    it('handles nil', () => {
      expect(myFormattedPermissions(null)).toEqual([]);
    });

    it('handles a string', () => {
      expect(myFormattedPermissions('abc,123,xyz')).toEqual([
        'abc',
        '123',
        'xyz',
      ]);
    });

    it('handles an array', () => {
      expect(myFormattedPermissions(['abc', '123', 'xyz'])).toEqual([
        'abc',
        '123',
        'xyz',
      ]);
    });
  });

  describe('#onSaveDetails', () => {
    let serviceSpy;
    let wrapper;
    let id = '12345';

    beforeEach(() => {
      wrapper = shallow(
        <AddUserDetail
          details={{}}
          id={id}
          dashboardUrl={'dburl'}
          userListUrl={'myUserList'}
          actions={{}}
        />,
        { disableLifecycleMethods: true }
      );
      serviceSpy = jest.spyOn(UserService, 'saveUserDetails');
    });

    it('calls the service to patch the user record', () => {
      const instance = wrapper.instance();
      const mySaveFunction = instance.onSaveDetails;
      expect(() => mySaveFunction()).not.toThrow();
      mySaveFunction();
      expect(serviceSpy).toHaveBeenCalledWith('12345', {});
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

    it('first link is pointed at dashboardf', () => {
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
