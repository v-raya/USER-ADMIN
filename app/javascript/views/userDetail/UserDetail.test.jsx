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

  describe('renders 5 components', () => {
    it('renders component "Cards" ', () => {
      expect(wrapper.find('Cards').length).toBe(1);
    });

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

  describe('when label and className props are passed', () => {
    it('renders the label inside the grid wrapper', () => {
      wrapper = shallow(<UserDetail details={details} />);
      expect(wrapper.find('ShowField').length).toBe(10);

      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().label
      ).toEqual('Full Name');
      expect(
        wrapper
          .find('ShowField')
          .at(1)
          .props().label
      ).toEqual('Office Name');
      expect(
        wrapper
          .find('ShowField')
          .at(2)
          .props().label
      ).toEqual('CWS Login');
      expect(
        wrapper
          .find('ShowField')
          .at(3)
          .props().label
      ).toEqual('Last Login');
      expect(
        wrapper
          .find('ShowField')
          .at(4)
          .props().label
      ).toEqual('Email');
      expect(
        wrapper
          .find('ShowField')
          .at(5)
          .props().label
      ).toEqual('Office Phone Number');
      expect(
        wrapper
          .find('ShowField')
          .at(6)
          .props().label
      ).toEqual('Start Date');
      expect(
        wrapper
          .find('ShowField')
          .at(7)
          .props().label
      ).toEqual('End Date');
      expect(
        wrapper
          .find('ShowField')
          .at(8)
          .props().label
      ).toEqual('Status');
      expect(
        wrapper
          .find('ShowField')
          .at(9)
          .props().label
      ).toEqual('Assigned Roles');
    });
  });
});
