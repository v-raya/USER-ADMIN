import React from 'react';
import { shallow } from 'enzyme';
import { Link, MemoryRouter } from 'react-router-dom';
import { Link as LinkRWD } from 'react-wood-duck';
import UserDetail from './UserDetail';

describe('UserDetail', () => {
  let container;
  let wrapper;
  let instance;
  let mockFetchDetailsActions;
  let mockSaveUserDetailsActions;
  let mockFetchPermissionsActions;
  let mockFetchRolesActions;
  let mockClearDetailsActions;
  let mockResendRegistrationEmailActions;
  let mockClearAddedUserDetailActions;
  let mockHandleDropDownChangeAction;
  let mockHandleEditButtonChangeAction;

  beforeEach(() => {
    // Register mock dispatchActions
    mockFetchDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockSaveUserDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockClearDetailsActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockClearAddedUserDetailActions = jest
      .fn()
      .mockReturnValue(Promise.resolve([]));
    mockResendRegistrationEmailActions = jest
      .fn()
      .mockReturnValue(Promise.resolve([]));
    mockFetchPermissionsActions = jest
      .fn()
      .mockReturnValue(Promise.resolve([]));
    mockFetchRolesActions = jest.fn().mockReturnValue(Promise.resolve([]));
    mockHandleDropDownChangeAction = jest.fn();
    mockHandleEditButtonChangeAction = jest.fn();
    container = shallow(
      <MemoryRouter>
        <UserDetail
          userEditOption={{ editable: true }}
          details={{}}
          dashboardUrl="dburl"
          userListUrl="myUserList"
          isRolesDisabled={true}
          actions={{
            fetchDetailsActions: mockFetchDetailsActions,
            fetchPermissionsActions: mockFetchPermissionsActions,
            fetchRolesActions: mockFetchRolesActions,
            clearDetails: mockClearDetailsActions,
            saveUserDetailsActions: mockSaveUserDetailsActions,
            handleDropdownChangeAction: mockHandleDropDownChangeAction,
            handleEditButtonChangeAction: mockHandleEditButtonChangeAction,
            resendRegistrationEmailActions: mockResendRegistrationEmailActions,
            clearAddedUserDetailActions: mockClearAddedUserDetailActions,
          }}
        />
      </MemoryRouter>
    );
    wrapper = container.find('UserDetail').dive();
    instance = wrapper.instance();
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
        const myFunction = instance.handleDropDownChange('enabled');
        expect(() => myFunction({ value: true })).not.toThrow();
        expect(instance.state.disableActionBtn).toBe(false);
      });

      it('will set the details state with updated roles when event is triggered ', () => {
        const myFunc = instance.handleDropDownChange('roles');
        expect(() => myFunc({ value: 'role2' })).not.toThrow();
        expect(instance.state.disableActionBtn).toBe(false);
      });
    });

    describe('#handleOnPermissionChange', () => {
      it('should set the Permissions state when event is triggered', () => {
        const myFunction = instance.handleOnPermissionChange;
        expect(() => myFunction({ 0: 'Hotline-rollout' })).not.toThrow();
        expect(instance.state.disableActionBtn).toBe(false);
      });
    });

    describe('#onEditClick', () => {
      it('toggles the isEdit flag', () => {
        instance.onEditClick();
        expect(instance.state.disableActionBtn).toEqual(true);
        expect(instance.state.alert).toEqual(false);
        expect(wrapper.instance().state.addedUserID).toEqual(undefined);
      });
    });

    describe('#showAddAlert', () => {
      it('verifies alert component', () => {
        wrapper.setState({ addedUserID: 'SOME_ID' });
        instance.showAddAlert();
        expect(wrapper.find('Alert').length).toEqual(1);
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
      instance.onResendInvite();
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('blank');
    });
  });

  describe('#onCancel', () => {
    it('calls the appropriate function', () => {
      instance.onCancel();
      expect(mockFetchDetailsActions).toHaveBeenCalledWith('blank');
      instance.onCancel();
      expect(mockHandleEditButtonChangeAction).toHaveBeenCalledWith(false);
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
      const componentWillUnmount = jest.spyOn(instance, 'componentWillUnmount');
      wrapper.unmount();
      expect(componentWillUnmount).toHaveBeenCalledWith();
    });
  });

  describe('#UNSAFE_componentWillReceiveProps', () => {
    it('passes along the props', () => {
      instance.UNSAFE_componentWillReceiveProps({
        id: 'some_id',
        details: { test_prop: 'prop_value' },
      });
      expect(instance.state.details.test_prop).toEqual('prop_value');
    });
  });

  describe('#onSaveDetails', () => {
    it('calls the service to patch the user record', () => {
      instance.onSaveDetails();
      expect(mockSaveUserDetailsActions).toHaveBeenCalledWith(
        'blank',
        {},
        true
      );
      expect(instance.state.alert).toEqual(true);
      expect(instance.state.addedUserID).toEqual(undefined);
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
        wrapper.setProps({
          isEdit: true,
        });
        wrapper.setState({
          details: { id: '12345' },
          XHRStatus: 'ready',
        });
        expect(wrapper.find('UserDetailEdit').length).toBe(1);
        expect(wrapper.find('UserDetailEdit').props().disableActionBtn).toBe(
          true
        );
      });

      it('renders card with text indicating no user found', () => {
        wrapper.setState({ isEdit: true, XHRStatus: 'ready' });
        expect(wrapper.find('Cards').length).toBe(1);
        expect(wrapper.find('Cards').props().cardHeaderText).toBe(
          'User not found'
        );
      });

      it('renders card with text indicating loading', () => {
        wrapper.setProps({ XHRStatus: 'anything but ready' });
        const cards = wrapper.find('Cards');
        expect(cards.length).toBe(1);
        expect(cards.children().text()).toContain('Loading...');
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
