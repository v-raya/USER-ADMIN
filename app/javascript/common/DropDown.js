import React from 'react'
import PropTypes from 'prop-types'
import Select from '@cwds/components/lib/Select'

class DropDown extends React.Component {
  render() {
    const {
      gridClassName,
      label,
      id,
      options,
      selectedOption,
      disabled,
      onChange,
      selectClassName,
      placeholder,
      multiSelect,
      simpleValue,
    } = this.props
    return (
      <div className="form-group">
        <div className={gridClassName}>
          <label htmlFor={label}>{label}</label>
          <Select
            multi={multiSelect}
            simpleValue={simpleValue}
            value={selectedOption}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
            className={selectClassName}
            options={options}
            disabled={disabled}
          />
        </div>
      </div>
    )
  }
}

DropDown.propTypes = {
  options: PropTypes.array,
  id: PropTypes.string,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.bool]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  gridClassName: PropTypes.string,
  label: PropTypes.string,
  selectClassName: PropTypes.string,
  disabled: PropTypes.bool,
  multiSelect: PropTypes.bool,
  simpleValue: PropTypes.bool,
}

export default DropDown
