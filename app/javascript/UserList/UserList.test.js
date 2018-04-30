import React from 'react';
import { shallow } from 'enzyme';
import UserList from './UserList.jsx';

describe('Cognito', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserList />);
  });

  it('renders a Cards', () => {
    expect(wrapper.find('Cards').length).toBeGreaterThan(0);
  });

  it('#displayList function defined', () => {
    const instance = wrapper.instance();
    expect(instance.displayList()).toBeDefined();
  });

  describe('#displayList output', () => {
    it('displays table', () => {
      expect(wrapper.find('BootstrapTable').length).toBe(1);
      expect(wrapper.find('TableHeaderColumn').length).toBe(6);
    });
  });
});
