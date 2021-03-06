import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from 'react-wood-duck'

const Cards = props => {
  const {
    children,
    cardbgcolor,
    wrapContainer,
    columnXsmallWidth,
    offsetMediumValue,
    columnMediumWidth,
    columnLargeWidth,
    handleOnClickButton1,
    onEdit,
    handleOnClickButton2,
    disableActionBtn,
    headerBtnName,
    rightActionBtnName,
    leftActionBtnName,
    disabled,
  } = props
  const classField = classNames(
    cardbgcolor,
    wrapContainer,
    `col-lg-${columnLargeWidth}`,
    `col-md-${columnMediumWidth}`,
    `col-md-offset-${offsetMediumValue}`,
    `col-xs-${columnXsmallWidth}`
  )
  const editClass = props.cardActionButtons ? 'edit' : ''
  return (
    <div className={classField} id={props.id}>
      <div className={`card ${editClass} double-gap-top`}>
        <div className="card-header">
          <span>{props.cardHeaderText}</span>
          {props.cardHeaderButton &&
            !props.cardActionButtons && (
              <Button btnClassName="default pull-right" btnName={headerBtnName} onClick={onEdit} disabled={disabled} />
            )}
        </div>
        <div className="card-body">
          {children}
          {!props.cardHeaderButton && (
            <div className="pull-right">
              {props.cardActionButton1 && (
                <Button btnName={leftActionBtnName} btnClassName="default cancel" onClick={handleOnClickButton1} />
              )}
              {props.cardActionButton2 && (
                <Button
                  btnClassName="primary"
                  disabled={disableActionBtn}
                  btnName={rightActionBtnName}
                  onClick={handleOnClickButton2}
                />
              )}
            </div>
          )}
          <div className="clearfix" />
        </div>
      </div>
    </div>
  )
}

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
  handleOnClickButton1: PropTypes.func,
  handleOnClickButton2: PropTypes.func,
  onEdit: PropTypes.func,
  disableActionBtn: PropTypes.bool,
  cardActionButton1: PropTypes.bool,
  cardActionButton2: PropTypes.bool,
  headerBtnName: PropTypes.string,
  rightActionBtnName: PropTypes.string,
  leftActionBtnName: PropTypes.string,
  disabled: PropTypes.bool,
}

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
}

export default Cards
