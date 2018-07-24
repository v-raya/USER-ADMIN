import React from 'react';
import { shallow } from 'enzyme';
import VerifyUser from './VerifyUser';

describe('VerifyUser', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<VerifyUser />);
  });

  it('renders the Components ', () => {
    const expectedValue =
      'Enter the CWS Login and email address of the user you are adding in order to verify that this is a new CWS-CARES user';
    wrapper = shallow(<VerifyUser />);
<<<<<<< Updated upstream
    expect(wrapper.find('div.label').exists()).toBe(true);
    expect(wrapper.find('div.label').text()).toBe(expectedValue);
=======
    expect(
      wrapper
        .find('div')
        .at(4)
        .text()
    ).toBe(expectedValue);
>>>>>>> Stashed changes
    expect(wrapper.find('Cards').exists()).toBe(true);
    expect(wrapper.find('InputComponent').length).toEqual(2);
  });
});
