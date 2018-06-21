import React from 'react';
import { shallow } from 'enzyme';
import App from './app';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders ', () => {
    wrapper = shallow(<App />);
    expect(wrapper.find('GlobalHeader').length).toBe(1);
  });
});
