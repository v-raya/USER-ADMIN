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

  describe('#handleEmail()  function', () => {
    it('it handle that sets state', () => {
      const instance = wrapper.instance();
      instance.handleEmail({
        target: { value: 'abcd@gmail.com' },
      });
      expect(instance.state.email).toEqual('abcd@gmail.com');
    });

    it('sets disableActionBtn state ', () => {
      expect(wrapper.instance().state.disableActionBtn).toEqual(true);
      const instance = wrapper.instance();
      instance.setState({
        racfid: 'ABCD',
        errorMessage: { emailError: '' },
      });
      instance.handleEmail({
        target: { value: 'foo@gmail.com' },
      });
      expect(wrapper.instance().state.disableActionBtn).toEqual(false);
    });
  });

  describe('#validateField', () => {
    it('validates email when correct format and special characters are given as input', () => {
      const instance = wrapper.instance();
      instance.validateField('foo@gmail.com');
      expect(wrapper.instance().state.errorMessage.emailError).toEqual('');
      instance.validateField(`foo!#$%^....&*-_+={'?/@gmail.com`);
      expect(wrapper.instance().state.errorMessage.emailError).toEqual('');
    });

    it('validates email when not allowed characters are given as input', () => {
      const instance = wrapper.instance();
      instance.validateField('foo@<|}][()>@gmail.com');
      expect(wrapper.instance().state.errorMessage.emailError).toEqual(
        'Please enter a valid email.'
      );
      instance.validateField('fo@o@gmail.com');
      expect(wrapper.instance().state.errorMessage.emailError).toEqual(
        'Please enter a valid email.'
      );
      instance.validateField('someValue');
      expect(wrapper.instance().state.errorMessage.emailError).toEqual(
        'Please enter a valid email.'
      );
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

  describe('#verifyUser()', () => {
    it('renders VerifyUser Component', () => {
      wrapper.instance().verifyUser();
      wrapper.setState({ addUser: true });
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
            fetchPermissionsActions: () => {},
          }}
        />
      );
      component.instance().onVerify();
      expect(component.instance().state.verify).toBe(true);
    });
  });

  describe('#onAddUser', () => {
    it('sets state', () => {
      const component = shallow(
        <AddUser
          actions={{
            addUserActions: () => {},
          }}
        />
      );
      component.setState({
        verifyNewUserDetails: {
          user: {
            first_name: 'username1',
            id: '2',
            county_name: 'mycounty',
          },
        },
      });

      component.instance().onAddUser();
      expect(component.instance().state.addUser).toBe(false);
      expect(component.instance().state.verify).toBe(false);
    });
  });

  describe('renders components', () => {
    it('renders PageHeader component', () => {
      wrapper.setState({ verify: true, addUser: true });
      expect(wrapper.find('PageHeader').length).toBe(1);
    });

    it('renders navigation link to Dashboard', () => {
      wrapper.setState({ verify: true, addUser: true });
      expect(
        wrapper
          .find('Link')
          .at(0)
          .html()
      ).toContain('Dashboard');
    });

    it('first link is pointed at dashboard', () => {
      wrapper.setState({ verify: true, addUser: true });
      expect(wrapper.find('Link').get(0).props['href']).toEqual('/');
    });

    it('default props', () => {
      expect(AddUser.defaultProps.dashboardUrl).toEqual('/');
      expect(AddUser.defaultProps.dashboardClickHandler).not.toThrow();
    });
  });
});
