import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'react-wood-duck';

function renderCancelSaveButtons(
  props,
  onCancel,
  disableActionBtn,
  onSave,
  rightActionBtnName,
  leftActionBtnName
) {
  return (
    props.cardActionButtons &&
    !props.cardHeaderButton && (
      <div className="pull-right">
        <Button
          btnName={leftActionBtnName}
          btnClassName="default cancel"
          onClick={onCancel}
        />
        <Button
          btnClassName="primary"
          disabled={disableActionBtn}
          btnName={rightActionBtnName}
          onClick={onSave}
        />
      </div>
    )
  );
}

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
    disableActionBtn,
    headerBtnName,
    rightActionBtnName,
    leftActionBtnName,
    disabled,
  } = props;
  const classField = classNames(
    cardbgcolor,
    wrapContainer,
    `col-lg-${columnLargeWidth}`,
    `col-md-${columnMediumWidth}`,
    `col-md-offset-${offsetMediumValue}`,
    `col-xs-${columnXsmallWidth}`
  );
  const editClass = props.cardActionButtons ? 'edit' : '';
  return (
    <div className={classField} id={props.id}>
      <div className={`card ${editClass} double-gap-top`}>
        <div className="card-header">
          <span>{props.cardHeaderText}</span>
          {props.cardHeaderButton &&
            !props.cardActionButtons && (
              <Button
                btnClassName="default pull-right"
                btnName={headerBtnName}
                onClick={onEdit}
                disabled={disabled}
              />
            )}
        </div>
        <div className="card-body">
          {children}
          {renderCancelSaveButtons(
            props,
            onCancel,
            disableActionBtn,
            onSave,
            rightActionBtnName,
            leftActionBtnName
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
  disableActionBtn: PropTypes.bool,
  headerBtnName: PropTypes.string,
  rightActionBtnName: PropTypes.string,
  leftActionBtnName: PropTypes.string,
  disabled: PropTypes.bool,
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
  rightActionBtnName: 'save',
  headerBtnName: 'Edit',
  disabled: false,
};

export default Cards;
