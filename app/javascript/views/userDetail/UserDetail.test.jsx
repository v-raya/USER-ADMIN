import React from 'react';
import { shallow } from 'enzyme';
import UserDetail from './UserDetail.jsx';

describe('UserDetail', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserDetail />);
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

    it('renders navigation link to User List', () => {
      expect(
        wrapper
          .find('Link')
          .at(1)
          .html()
      ).toContain('Manage Users');
    });
  });

  describe('when label and className props are passed', () => {
    it('renders the label inside the grid wrapper', () => {
      wrapper = shallow(<UserDetail />);
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
