import React from 'react';
import { shallow } from 'enzyme';
import UserDetail from './UserDetail.jsx';

describe('UserDetail', () => {
  const details = {
    id: 'id',
    first_name: 'Firstname0',
    last_name: 'Lastname0',
    county_name: 'MyCounty',
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <UserDetail
        details={details}
        dashboardUrl={'dburl'}
        userListUrl={'myUserList'}
      />
    );
  });

  describe('Setting enableSave state', () => {
    describe('#onStatusChange', () => {
      it('should set the enableSave state onStatusChange', () => {
        const instance = wrapper.instance();
        instance.onStatusChange();
        expect(instance.state.enableSave).toBe(false);
      });
    });

    describe('#onRoleChange', () => {
      it('should set the enableSave state onRoleChange', () => {
        const instance = wrapper.instance();
        instance.onRoleChange();
        expect(instance.state.enableSave).toBe(false);
      });
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
