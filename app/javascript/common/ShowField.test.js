import React from 'react';
import { shallow } from 'enzyme';
import ShowField from './ShowField';

describe('ShowField', () => {
  let component;
  let formField;

  const props = {
    gridClassName: 'myWrapperTest',
    labelClassName: 'myLabelTest',
    label: 'this is my label',
  };

  beforeEach(() => {
    component = shallow(
      <ShowField {...props}>This is the show field value</ShowField>
    );
    formField = component.find('FormField');
  });

  it('passes props to the FormField', () => {
    expect(formField.props().labelClassName).toEqual('myLabelTest');
    expect(formField.props().gridClassName).toEqual('myWrapperTest');
    expect(formField.props().label).toEqual('this is my label');
    expect(formField.props().children).toEqual(
      <span>This is the show field value</span>
    );
  });

  it('renders the value of children', () => {
    expect(component.find('span').text()).toEqual(
      'This is the show field value'
    );
  });
});
