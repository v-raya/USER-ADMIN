import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders ', () => {
    expect(wrapper.find('Route').length).toEqual(4);
    expect(
      wrapper
        .find('Route')
        .at(0)
        .prop('path')
    ).toEqual('/');
    expect(
      wrapper
        .find('Route')
        .at(1)
        .prop('path')
    ).toEqual('/verify');
    expect(
      wrapper
        .find('Route')
        .at(2)
        .prop('path')
    ).toEqual('/user_details/:id');
    expect(
      wrapper
        .find('Route')
        .at(3)
        .prop('render')
    ).not.toThrow();
  });
});
