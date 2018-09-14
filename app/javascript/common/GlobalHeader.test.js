import React from 'react';
import { shallow } from 'enzyme';
import GlobalHeader from './GlobalHeader';

describe('Header Component', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      fullName: 'lastname firstname',
      logoutUrl:
        'https://www.exampleGlobalHeader.com/HeaderComponent-12345_TESTING',
    };
    wrapper = shallow(<GlobalHeader {...props} />);
  });

  it('renders ', () => {
    expect(wrapper.find('GlobalHeader').length).toBe(1);
    expect(wrapper.find('GlobalHeader').props().profileName).toEqual(
      'lastname firstname'
    );
  });

  it('allow user logout', () => {
    let button = wrapper.find('button').last();
    const instance = wrapper.instance();
    expect(button.props().onClick).toEqual(instance.logoutCallBack);
    expect(instance.logoutCallback).not.toThrow();
  });
});
