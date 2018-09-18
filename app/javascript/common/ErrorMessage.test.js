import React from 'react';
import ErrorMessage from './ErrorMessage';
import { shallow } from 'enzyme';

describe('Error Message', () => {
  it('renders null', () => {
    const errorComp = shallow(<ErrorMessage error={null} />);
    expect(errorComp.find('Alert').length).toEqual(0);
  });

  it('verify error block with error code', () => {
    const props = { message: 'Cognito user validation is failed' };
    const errorComp = shallow(<ErrorMessage error={props} />);
    expect(errorComp.find('Alert').length).toEqual(1);
    expect(errorComp.contains(props.message)).toBe(true);
  });
});
