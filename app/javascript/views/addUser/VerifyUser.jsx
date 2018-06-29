import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../common/Card';
import { InputComponent } from 'react-wood-duck/';

/* eslint camelcase: 0 */
export default class VerifyUser extends React.Component {
  render() {
    const {
      onVerify,
      handleEmailChange,
      handleRacfChange,
      disableActionBtn,
    } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <Cards
            cardHeaderText="Verify User"
            rightActionBtnName="Verify User"
            cardActionButtons={true}
            onSave={onVerify}
            disableActionBtn={disableActionBtn}
          >
            <div className="col-md-12">
              <label>
                Enter the CWS Login and email address of the user you are adding
                in order to verify that this is a new CWS-CARES user
              </label>
              <div className="row">
                <div className="col-md-3">
                  <InputComponent
                    label="CWS Login"
                    gridClassName="col-md-10 col-sm-6 col-xs-12"
                    fieldClassName="form-group"
                    type="text"
                    placeholder="Enter CWS Login"
                    onChange={handleRacfChange}
                  />
                </div>
                <div className="col-md-3">
                  <InputComponent
                    label="Email Address"
                    gridClassName="col-md-10 col-sm-6 col-xs-12"
                    fieldClassName="form-group"
                    type="text"
                    placeholder="Add Email Address"
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
          </Cards>
        </div>
      </div>
    );
  }
}

VerifyUser.propTypes = {
  onVerifyCancel: PropTypes.func,
  onVerify: PropTypes.func,
  handleRacfChange: PropTypes.func,
  handleEmailChange: PropTypes.func,
  disableActionBtn: PropTypes.bool,
};
