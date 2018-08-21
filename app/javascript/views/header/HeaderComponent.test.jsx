import React from 'react';
import { shallow } from 'enzyme';
import HeaderComponent from './HeaderComponent';

describe('Header Component', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      logoutUrl: '/logout',
    };
    wrapper = shallow(<HeaderComponent {...props} />);
  });

  it('renders ', () => {
    expect(wrapper.find('GlobalHeader').length).toBe(1);
  });

  it('allow user logout', () => {
    let button = wrapper.find('button').last();
    const instance = wrapper.instance();
    expect(button.props().onClick).toEqual(instance.logoutCallBack);
  });
});
