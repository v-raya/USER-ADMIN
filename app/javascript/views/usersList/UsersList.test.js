import React from 'react';
import { shallow } from 'enzyme';
import UsersList from './UsersList.jsx';

describe('UsersList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UsersList />);
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

  describe('#UserList output', () => {
    it('contains Table and headers', () => {
      expect(wrapper.find('BootstrapTable').length).toBe(1);
      expect(wrapper.find('TableHeaderColumn').length).toBe(6);
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
});
