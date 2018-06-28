import React from 'react';
import { shallow } from 'enzyme';
import VerifyUser from './VerifyUser';

describe('VerifyUser', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<VerifyUser />);
  });

  it('renders the Components ', () => {
    wrapper = shallow(<VerifyUser />);
    expect(wrapper.find('Cards').exists()).toEqual(true);
    expect(wrapper.find('InputComponent').length).toEqual(2);
  });

  it('checks the Labels inside the grid ', () => {
    expect(wrapper.find('[label="RACF ID"]').exists()).toBe(true);
    expect(wrapper.find('[label="Email Address"]').exists()).toBe(true);
  });
});
