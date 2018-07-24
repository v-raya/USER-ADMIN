import React from 'react';
import { shallow } from 'enzyme';
import VerifyUser from './VerifyUser';

describe('VerifyUser', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <VerifyUser
        onVerify={() => {}}
        handleEmailChange={() => {}}
        handleRacfChange={() => {}}
        errorMessage={{ emailError: '' }}
        valid={true}
        disableActionBtn={true}
      />
    );
  });

  it('renders the Components ', () => {
    const expectedValue =
      'Enter the CWS Login and email address of the user you are adding in order to verify that this is a new CWS-CARES user';
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe(expectedValue);
    expect(wrapper.find('Cards').exists()).toBe(true);
    expect(wrapper.find('InputComponent').length).toEqual(2);
  });

  it('checks the Labels inside the grid ', () => {
    expect(wrapper.find('[label="CWS Login"]').exists()).toBe(true);
    expect(wrapper.find('[label="Email Address"]').exists()).toBe(true);
  });
});
