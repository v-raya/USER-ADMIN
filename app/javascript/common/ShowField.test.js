import React from 'react';
import { shallow } from 'enzyme';
import ShowField from './ShowField';

describe('ShowField', () => {
  let component;
  let formField;

  const requiredProps = {
    gridClassName: 'myWrapperTest',
    labelClassName: 'myLabelTest',
    label: 'this is my label',
  };

  beforeEach(() => {
    component = shallow(
      <ShowField {...requiredProps}>This is the show field value</ShowField>
    );
    formField = component.find('FormField');
  });

  it('passes props to the FormField', () => {
    expect(formField.props().labelClassName).toEqual('myLabelTest');
    expect(formField.props().gridClassName).toEqual('myWrapperTest');
    expect(formField.props().label).toEqual('this is my label');
    expect(formField.childAt(0).getElement().type).toEqual('span');
  });

  it('renders the show field value', () => {
    expect(component.find('span').text()).toEqual(
      'This is the show field value'
    );
  });
});
