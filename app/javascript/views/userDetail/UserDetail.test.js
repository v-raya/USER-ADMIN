import React from 'react';
import { shallow } from 'enzyme';
import { Link, MemoryRouter } from 'react-router-dom';
import { Link as LinkRWD } from 'react-wood-duck';
import UserDetail from './UserDetail';

describe('UserDetail', () => {
  let container;
  let wrapper;
  let mockFetchDetailsActions;
  let mockSaveUserDetailsActions;
  let mockFetchPermissionsActions;
  let mockFetchRolesActions;
  let mockClearDetailsActions;
  let mockResendRegistrationEmailActions;

  beforeEach(() => {
    // Register mock dispatchActions
    mockFetchDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockSaveUserDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockClearDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockResendRegistrationEmailActions = jest
      .fn()
      .mockReturnValue(Promise.resolve([]));
    mockFetchPermissionsActions = jest
      .fn()
      .mockReturnValue(Promise.resolve([]));
    mockFetchRolesActions = jest.fn().mockReturnValue(Promise.resolve([]));
    container = shallow(
      <MemoryRouter>
        <UserDetail
          userEditOption={{ editable: true }}
          details={{}}
          dashboardUrl="dburl"
          userListUrl="myUserList"
          actions={{
            fetchDetailsActions: mockFetchDetailsActions,
            fetchPermissionsActions: mockFetchPermissionsActions,
            fetchRolesActions: mockFetchRolesActions,
            clearDetails: mockClearDetailsActions,
            saveUserDetailsActions: mockSaveUserDetailsActions,
            resendRegistrationEmailActions: mockResendRegistrationEmailActions,
          }}
        />
      </MemoryRouter>
    );
    wrapper = container.find('UserDetail').dive();
  });

  describe('statics', () => {
    describe('defaultProps', () => {
      it('default props', () => {
        expect(UserDetail.defaultProps.dashboardUrl).toEqual('/');
        expect(UserDetail.defaultProps.dashboardClickHandler).not.toThrow();
      });
    });
  });

  describe('Setting state', () => {
    describe('#handleDropDownChange() function', () => {
      it('should set the Status state when event is triggered', () => {
        const instance = wrapper.instance();
        const myFunction = instance.handleDropDownChange('enabled');
        expect(() => myFunction({ value: true })).not.toThrow();
        expect(instance.state.details).toEqual({ enabled: true });
        expect(instance.state.disableActionBtn).toBe(false);
      });
    });

    describe('#handleOnRoleChange', () => {
      it('will set the details state with updated roles when event is triggered ', () => {
        const instance = wrapper.instance();
        const myFunc = instance.handleOnRoleChange('roles');
        expect(() => myFunc({ value: 'role2' })).not.toThrow();
        expect(instance.state.details).toEqual({ roles: ['role2'] });
        expect(instance.state.disableActionBtn).toBe(false);
      });
    });

    describe('#handleOnPermissionChange', () => {
      it('should set the Permissions state when event is triggered', () => {
        const expectedValue = { permissions: { 0: 'Hotline-rollout' } };
        const instance = wrapper.instance();
        const myFunction = instance.handleOnPermissionChange;
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
        expect(instance.state.disableActionBtn).toEqual(true);
        expect(instance.state.alert).toEqual(false);
      });
    });
  });

  describe('#emailSent()', () => {
    it('displays <Alert/>', () => {
      wrapper.setState({ resendEmailAlert: true });
      wrapper.setProps({ resendEmailStatus: 'Success' });
      expect(wrapper.find('Alert').length).toBe(1);
      expect(wrapper.find('Alert').props().children).toBe(
        'Registration email has been sent successfully'
      );
    });
  });

  describe('#onResendInvite', () => {
    it('calls the service to resendRegistrationEmail', () => {
      wrapper.instance().onResendInvite();
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('blank');
    });
  });

  describe('#onCancel', () => {
    it('calls the appropriate function', () => {
      wrapper.instance().onCancel();
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('blank');
      wrapper.instance().onCancel();
      expect(wrapper.instance().state.isEdit).toEqual(false);
      expect(wrapper.instance().state.alert).toEqual(false);
    });
  });

  describe('#componentDidMount', () => {
    it('fetches details', () => {
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('blank');
    });

    it('fetches the permissions', () => {
      expect(mockFetchPermissionsActions).toHaveBeenCalledWith();
    });

    it('fetches the roles', () => {
      expect(mockFetchRolesActions).toHaveBeenCalledWith();
    });
  });

  describe('#componentWillUnmount', () => {
    it('componentWillUnmount should be called on unmount', () => {
      const componentWillUnmount = jest.spyOn(
        wrapper.instance(),
        'componentWillUnmount'
      );
      wrapper.unmount();
      expect(componentWillUnmount).toHaveBeenCalledWith();
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

  describe('#onSaveDetails', () => {
    it('calls the service to patch the user record', () => {
      wrapper.instance().onSaveDetails();
      expect(mockSaveUserDetailsActions).toHaveBeenCalledWith('blank', {});
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
        wrapper.setState({
          isEdit: false,
          details: { id: '12345' },
          XHRStatus: 'ready',
        });
        expect(wrapper.find('UserDetailShow').length).toBe(1);
      });

      it('should display <UserDetailEdit/>', () => {
        wrapper.setState({
          isEdit: true,
          details: { id: '12345' },
          XHRStatus: 'ready',
        });
        expect(wrapper.find('UserDetailEdit').length).toBe(1);
        expect(wrapper.find('UserDetailEdit').props().disableActionBtn).toBe(
          true
        );
      });
    });

    describe('breadcrumb', () => {
      it('has a link to User List', () => {
        const link = wrapper.find(Link).at(0);
        expect(link.children().text()).toContain('User List');
        expect(link.prop('to')).toEqual('/');
      });

      it('has a link to the CARES dashboard', () => {
        const link = wrapper.find(LinkRWD).at(0);
        expect(link.prop('href')).toEqual('dburl');
      });
    });
  });

  describe('#showAlert()', () => {
    it('displays error <Alert/>', () => {
      const props = { user_message: 'Cognito user validation is failed' };
      wrapper.setState({ alert: true });
      wrapper.setProps({ userDetailError: props });
      const alertBox = wrapper.find('ErrorMessage');
      expect(alertBox.length).toBe(1);
      expect(alertBox.dive().props().children).toBe(props.user_message);
      expect(alertBox.dive().props().alertCross).toEqual(false);
    });

    it('displays success <Alert/>', () => {
      wrapper.setState({ alert: true });
      wrapper.setProps({ userDetailError: null });
      const alertBox = wrapper.find('Alert');
      expect(alertBox.length).toBe(1);
      expect(alertBox.props().children).toBe(
        'Your changes have been made successfully'
      );
      expect(alertBox.props().alertCross).toEqual(false);
    });

    it('does not display <Alert/>', () => {
      wrapper.setState({ alert: false });
      wrapper.setProps({ userDetailError: null });
      const alertBox = wrapper.find('ErrorMessage');
      expect(alertBox.length).toBe(0);
    });
  });
});
