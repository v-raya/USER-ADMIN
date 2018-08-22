import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders ', () => {
    expect(
      wrapper
        .find('Route')
        .at(3)
        .prop('render')
    ).not.toThrow();
  });
});
