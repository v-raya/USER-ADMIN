import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const FormField = ({ children, gridClassName, labelClassName, htmlFor, label, required }) => {
  const gridClassNames = ClassNames(gridClassName)
  const labelClassNames = ClassNames(labelClassName, { required: required })
  return (
    <div className={gridClassNames}>
      <label htmlFor={htmlFor} className={labelClassNames}>
        {label}
      </label>
      {children}
    </div>
  )
}

FormField.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  gridClassName: PropTypes.string,
  htmlFor: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
}
export default FormField
