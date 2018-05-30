import React from 'react';
import { shallow } from 'enzyme';
import UserDetail from './UserDetail.jsx';

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
  });

  describe('#alert()', () => {
    it('should display <Alert/>', () => {
      wrapper.setState({ alert: true });
      expect(wrapper.find('Alert').length).toBe(1);
      expect(wrapper.find('Alert').props().children).toBe(
        'Your changes have been made successfuly'
      );
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
  });
});
