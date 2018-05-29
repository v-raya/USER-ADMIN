import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'react-wood-duck';
const Cards = props => {
  const {
    children,
    cardbgcolor,
    wrapContainer,
    columnXsmallWidth,
    offsetMediumValue,
    columnMediumWidth,
    columnLargeWidth,
    onCancel,
    onEdit,
    onSave,
    enableSave,
  } = props;
  const classField = classNames(
    cardbgcolor,
    wrapContainer,
    `col-lg-${columnLargeWidth}`,
    `col-md-${columnMediumWidth}`,
    `col-md-offset-${offsetMediumValue}`,
    `col-xs-${columnXsmallWidth}`
  );
  let editClass = '';
  props.cardActionButtons ? (editClass = 'edit') : (editClass = '');
  return (
    <div className={classField} id={props.id}>
      <div className={`card ${editClass} double-gap-top`}>
        <div className="card-header">
          <span>{props.cardHeaderText}</span>
          {props.cardHeaderButton && !props.cardActionButtons ? (
            <Button
              btnClassName="default pull-right"
              btnName="Edit"
              onClick={onEdit}
            />
          ) : (
            ''
          )}
        </div>
        <div className="card-body">
          {children}
          {props.cardActionButtons && !props.cardHeaderButton ? (
            <div className="pull-right">
              <Button
                btnClassName="default"
                btnName="cancel"
                onClick={onCancel}
              />
              <Button
                btnClassName="primary"
                disabled={enableSave}
                btnName="save"
                onClick={onSave}
              />
            </div>
          ) : (
            ''
          )}
          <div className="clearfix" />
        </div>
      </div>
    </div>
  );
};

Cards.propTypes = {
  cardHeaderText: PropTypes.string,
  children: PropTypes.any,
  cardbgcolor: PropTypes.string,
  columnLargeWidth: PropTypes.number,
  columnMediumWidth: PropTypes.number,
  offsetMediumValue: PropTypes.number,
  columnXsmallWidth: PropTypes.number,
  wrapContainer: PropTypes.string,
  cardHeaderButton: PropTypes.bool,
  cardActionButtons: PropTypes.bool,
  style: PropTypes.string,
  id: PropTypes.any,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onEdit: PropTypes.func,
  enableSave: PropTypes.bool,
};

Cards.defaultProps = {
  cardbgcolor: 'transparent',
  columnLargeWidth: 12,
  columnMediumWidth: 12,
  offsetMediumValue: 0,
  columnXsmallWidth: 12,
  wrapContainer: 'container-fluid',
  cardActionButtons: false,
  cardHeaderButton: false,
};

export default Cards;
