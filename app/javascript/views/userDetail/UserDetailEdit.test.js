import React from 'react';
import { shallow } from 'enzyme';
import UserDetailEdit from './UserDetailEdit';

describe('UserDetailEdit', () => {
  const details = {
    id: 'id',
    first_name: 'Firstname0',
    last_name: 'Lastname0',
    middle_name: 'Middlename0',
    office: 'officeNames',
    county_name: 'MyCounty',
    permissions: ['x', 'y'],
    racfid: 'my RACFID',
    roles: ['ROLE1', 'ROLE2'],
    status: 'FORCE_CHANGE_PASSWORD',
  };

  let possibleRolesOptions = () => {};

  const onDropDownChangeSpy = jest.fn();

  const rolesList = [
    { id: 'role1', name: 'roleOne' },
    { id: 'role2', name: 'roleTwo' },
  ];
  let possibleRoles = ['role1', 'role2'];

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <UserDetailEdit
        details={details}
        onDropDownChange={onDropDownChangeSpy}
        possibleRoles={possibleRoles}
        rolesList={rolesList}
        possibleRolesOptions={possibleRolesOptions}
      />
    );
  });

  describe('when label and className props are passed', () => {
    it('renders the label inside the grid wrapper', () => {
      expect(wrapper.find('Cards').props().cardHeaderText).toBe(
        `County: ${details.county_name}`
      );

      expect(wrapper.find('ShowField').length).toBe(8);
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().label
      ).toEqual('Full Name');
      expect(
        wrapper
          .find('ShowField')
          .at(1)
          .props().label
      ).toEqual('Office Name');
      expect(
        wrapper
          .find('ShowField')
          .at(2)
          .props().label
      ).toEqual('CWS Login');
      expect(
        wrapper
          .find('ShowField')
          .at(3)
          .props().label
      ).toEqual('Email');
      expect(
        wrapper
          .find('ShowField')
          .at(4)
          .props().label
      ).toEqual('Office Phone Number');
      expect(
        wrapper
          .find('ShowField')
          .at(5)
          .props().label
      ).toEqual('Start Date');
      expect(
        wrapper
          .find('ShowField')
          .at(6)
          .props().label
      ).toEqual('Last Login');
      expect(
        wrapper
          .find('ShowField')
          .at(7)
          .props().label
      ).toEqual('User Status');
      expect(wrapper.find('[label="Account Status"]').exists()).toBe(true);
      expect(wrapper.find('[label="Assigned Permissions"]').exists()).toBe(
        true
      );
    });

    it('renders the <ShowField/> children at label:fullName', () => {
      let expectedValue = [
        `${details.last_name}`,
        `${', '}`,
        `${details.first_name}`,
        `${' '}`,
        `${details.middle_name}`,
      ];
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().children
      ).toEqual(expectedValue);
    });
  });

  describe('#onChange', () => {
    it('#Assign Status, onStatusChange function is called when onChange event triggered ', () => {
      const value = 'Active';
      wrapper.find('#StatusDropDown').simulate('change', { value });
      expect(onDropDownChangeSpy).toHaveBeenCalledWith('enabled', value);
    });

    it('#AssignRoles, onRoleChange function is called when onChange event triggered ', () => {
      const value = 'Asian';
      wrapper.find('#RolesDropDown').simulate('change', { value });
      expect(onDropDownChangeSpy).toHaveBeenCalledWith('roles', [value]);
    });

    it('#AssignPermissions, onPermissionChange function is called when onChange event triggered ', () => {
      const value = ['Asian', 'American'];
      wrapper.find('#AssignPermissions').simulate('change', String(value));
      expect(onDropDownChangeSpy).toHaveBeenCalledWith('permissions', value);
    });
  });

  describe('when Account Status is FORCE_CHANGE_PASSWORD', () => {
    it('should have a button as Resend Invite', () => {
      expect(wrapper.find('Button').length).toEqual(1);
      expect(wrapper.find('Button').props().btnName).toBe('Resend Invite');
    });
  });
});
