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
    console.log(wrapper);
    expect(wrapper.find('[label="RACFID"]').exists()).toBe(true);
    expect(wrapper.find('[label="Email Id"]').exists()).toBe(true);
  });
});
