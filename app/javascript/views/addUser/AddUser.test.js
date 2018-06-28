import React from 'react';
import { shallow } from 'enzyme';
import AddUser from './AddUser.jsx';

describe('VerifyUser', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddUser />, {
      disableLifecycleMethods: true,
    });
  });

  describe('#handleEmail', () => {
    it('sets state based on the text changing', () => {
      wrapper.instance().handleEmail({ target: { value: 'abcd@gmail.com' } });
      expect(wrapper.instance().state.email).toEqual('abcd@gmail.com');
    });

    it('sets disableActionBtn state ', () => {
      expect(wrapper.instance().state.disableActionBtn).toEqual(true);
      wrapper.instance().setState({ racfid: 'ABCD' });
      wrapper.instance().handleEmail({ target: { value: 'abcd@gmail.com' } });
      expect(wrapper.instance().state.disableActionBtn).toEqual(false);
    });
  });

  describe('#handleRacfid', () => {
    it('sets state based on the text changing', () => {
      wrapper.instance().handleRacfid({ target: { value: 'ABCD1234POP' } });
      expect(wrapper.instance().state.racfid).toEqual('ABCD1234POP');
    });

    it('sets disableActionBtn state', () => {
      expect(wrapper.instance().state.disableActionBtn).toEqual(true);
      wrapper.instance().setState({ email: 'abcd@gmail.com' });
      wrapper.instance().handleRacfid({ target: { value: 'ABCD1234POP' } });
      expect(wrapper.instance().state.disableActionBtn).toEqual(false);
    });
  });

  describe('#componentWillReceiveProps', () => {
    it('passes along the props', () => {
      const instance = wrapper.instance();
      instance.componentWillReceiveProps({
        id: 'some_id',
        verifyNewUserDetails: { test_prop: 'prop_value' },
      });
      expect(instance.state.verifyNewUserDetails.test_prop).toEqual(
        'prop_value'
      );
    });
  });

  describe('#verifyUser()', () => {
    it('renders VerifyUser Component', () => {
      expect(wrapper.find('VerifyUser').length).toBe(1);
    });
  });

  describe('#addUser()', () => {
    it('renders AddVerifyUser Component', () => {
      wrapper.instance().addUser();
      wrapper.setState({ verify: true });

      expect(wrapper.find('AddVerifiedUser').length).toBe(0);
    });
  });

  describe('#onVerify', () => {
    it('sets verfify state', () => {
      const component = shallow(
        <AddUser
          actions={{
            validateNewUserActions: () => {},
          }}
        />
      );
      component.instance().onVerify();
      expect(component.instance().state.verify).toBe(true);
    });
  });

  describe('renders components', () => {
    it('renders PageHeader component', () => {
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

    it('first link is pointed at dashboard', () => {
      expect(wrapper.find('Link').get(0).props['href']).toEqual('/');
    });

    it('default props', () => {
      expect(AddUser.defaultProps.dashboardUrl).toEqual('/');
      expect(AddUser.defaultProps.dashboardClickHandler).not.toThrow();
    });
  });
});
