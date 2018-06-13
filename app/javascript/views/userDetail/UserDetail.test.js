import React from 'react';
import { shallow } from 'enzyme';
import UserDetail from './UserDetail.jsx';
import UserService from '../../_services/users';

describe('UserDetail', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <UserDetail
        details={{}}
        dashboardUrl={'dburl'}
        userListUrl={'myUserList'}
      />
    );
  });

  describe('#componentWillReceiveProps()', () => {
    it('should change the details state', () => {
      const value = { status: true };
      const wrapper = shallow(<UserDetail details={value} />);
      wrapper.setProps({ details: value });
      expect(wrapper.state('details')).toEqual(value);
    });
  });

  describe('Setting state', () => {
    describe('#onStatusChange() function', () => {
      it('should set the Status state when event is triggered', () => {
        const expectedvalue = { enabled: true };
        const instance = wrapper.instance();
        const myFunction = instance.onStatusChange('enabled');
        expect(() => myFunction({ value: true })).not.toThrow();
        expect(instance.state.details).toEqual(expectedvalue);
        expect(instance.state.enableSave).toBe(false);
      });
    });

    describe('#onRoleChange()  function', () => {
      it('should set the Permissions state when event is triggered', () => {
        const expectedValue = { permissions: { 0: 'Hotline-rollout' } };
        const instance = wrapper.instance();
        const myFunction = instance.onRoleChange;
        expect(() => myFunction({ 0: 'Hotline-rollout' })).not.toThrow();
        expect(instance.state.details).toEqual(expectedValue);
        expect(instance.state.enableSave).toBe(false);
      });
    });

    it('toggles the isEdit flag', () => {
      const instance = wrapper.instance();
      instance.onEditClick();
      expect(instance.state.isEdit).toEqual(true);
      instance.onEditClick();
      expect(instance.state.isEdit).toEqual(false);
    });
  });

  describe('#alert()', () => {
    it('displays <Alert/>', () => {
      wrapper.setState({ alert: true });
      expect(wrapper.find('Alert').length).toBe(1);
      expect(wrapper.find('Alert').props().children).toBe(
        'Your changes have been made successfuly'
      );
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

    beforeEach(() => {
      serviceSpy = jest.spyOn(UserService, 'saveUserDetails');
    });

    it('calls the service to patch the user record', () => {
      const instance = wrapper.instance();
      const mySaveFunction = instance.onSaveDetails;
      expect(() => mySaveFunction()).not.toThrow();
      mySaveFunction();
      expect(serviceSpy).toHaveBeenCalledWith('blank', {});
    });
  });

  describe('renders components', () => {
    it('renders component "GlobalHeader"', () => {
      expect(wrapper.find('GlobalHeader').length).toBe(1);
    });

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
        expect(wrapper.find('UserDetailEdit').props().enableSave).toBe(true);
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
      expect(UserDetail.defaultProps.userListUrl).toEqual(
        process.env.RAILS_RELATIVE_URL_ROOT
      );
      expect(UserDetail.defaultProps.dashboardUrl).toEqual('/');
      expect(UserDetail.defaultProps.userListClickHandler).not.toThrow();
      expect(UserDetail.defaultProps.dashboardClickHandler).not.toThrow();
    });
  });
});
