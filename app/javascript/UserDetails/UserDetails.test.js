import React from 'react';
import { shallow } from 'enzyme';
import UserDetails from './UserDetails.jsx';

describe('UsersList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserDetails />);
  });

  describe('renders components', () => {
    it('renders card component', () => {
      expect(wrapper.find('Cards').length).toBeGreaterThan(0);
    });

    it('renders GlobalHeader component', () => {
      expect(wrapper.find('GlobalHeader').length).toBe(1);
    });

    it('renders PageHeader component', () => {
      expect(wrapper.find('PageHeader').length).toBe(1);
    });
  });

  describe('when label and className props are passed', () => {
    it('renders the label inside the grid wrapper', () => {
      wrapper = shallow(<UserDetails />);
      expect(wrapper.find('ShowField').length).toBe(10);
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().label
      ).toContain('Full Name');
      expect(
        wrapper
          .find('ShowField')
          .at(1)
          .props().label
      ).toContain('Office Name');
      expect(
        wrapper
          .find('ShowField')
          .at(2)
          .props().label
      ).toContain('CWS Login');
      expect(
        wrapper
          .find('ShowField')
          .at(3)
          .props().label
      ).toContain('Last Login');
      expect(
        wrapper
          .find('ShowField')
          .at(4)
          .props().label
      ).toContain('Email');
      expect(
        wrapper
          .find('ShowField')
          .at(5)
          .props().label
      ).toContain('Office Phone Number');
      expect(
        wrapper
          .find('ShowField')
          .at(6)
          .props().label
      ).toContain('Start Date');
      expect(
        wrapper
          .find('ShowField')
          .at(7)
          .props().label
      ).toContain('End Date');
      expect(
        wrapper
          .find('ShowField')
          .at(8)
          .props().label
      ).toContain('Status');
      expect(
        wrapper
          .find('ShowField')
          .at(9)
          .props().label
      ).toContain('Assigned Roles');
    });
  });
});
