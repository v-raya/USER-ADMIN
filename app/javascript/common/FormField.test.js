import React from 'react';
import { shallow } from 'enzyme';
import FormField from './FormField';

describe('FormField', () => {
  let component;

  describe('when only required props are passed', () => {
    it('renders a label with a div wrapper', () => {
      const props = {
        children: <div>Italy</div>,
        label: 'L1',
      };
      component = shallow(<FormField {...props} />);
      expect(component.html()).toEqual(
        '<div class=""><label class="">L1</label><div>Italy</div></div>'
      );
    });
  });

  describe('when label and className props are passed', () => {
    const props = {
      children: <br />,
      label: 'Do not judge a component by its label',
      labelClassName: 'working-class object-oriented-class',
      gridClassName: 'giggidy',
    };

    it('renders the label inside the grid wrapper with the classes', () => {
      component = shallow(<FormField {...props} />);
      expect(
        component
          .find('div.giggidy')
          .find('label')
          .props().className
      ).toEqual('working-class object-oriented-class');
    });

    describe('when children are passed', () => {
      const props = {
        children: <h1>Child</h1>,
        label: 'Do not judge a component by its label',
        labelClassName: 'working-class object-oriented-class',
        gridClassName: 'giggidy',
      };

      it('renders the children', () => {
        const wrapper = shallow(<FormField {...props} />).first('div');
        expect(wrapper.children().length).toEqual(2);
        expect(wrapper.childAt(0).type()).toEqual('label');
        expect(wrapper.childAt(1).html()).toEqual('<h1>Child</h1>');
      });
    });

    describe('when required', () => {
      beforeEach(() => {
        component = shallow(<FormField {...props} required />);
      });

      it('renders label as required', () => {
        expect(component.find('label').props().className).toContain('required');
      });
    });
  });
});
