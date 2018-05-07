import FormField from './FormField';
import PropTypes from 'prop-types';
import React from 'react';

const ShowField = ({
  gridClassName,
  labelClassName,
  label,
  children,
  required,
}) => (
  <FormField
    label={label}
    labelClassName={labelClassName}
    gridClassName={gridClassName}
    required={required}
  >
    <span>{children || '\u00A0'}</span>
  </FormField>
);

ShowField.propTypes = {
  children: PropTypes.any,
  gridClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
};
export default ShowField;
