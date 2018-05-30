import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class MultiSelect extends React.Component {
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
    } = this.props;
    return (
      <div className="form-group">
        <div className={gridClassName}>
          <label htmlFor={label}>{label}</label>
          <Select
            multi
            simpleValue
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
    );
  }
}

MultiSelect.propTypes = {
  options: PropTypes.array,
  id: PropTypes.string,
  selectedOption: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  gridClassName: PropTypes.string,
  label: PropTypes.string,
  selectClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default MultiSelect;
