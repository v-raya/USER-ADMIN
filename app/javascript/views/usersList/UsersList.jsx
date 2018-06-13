import React from 'react';
import PropTypes from 'prop-types';
import {
  GlobalHeader,
  PageHeader,
  Cards,
  Link,
  InputComponent,
} from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const buttonAlign = { marginTop: '-9px' };

const UserList = ({
  userList,
  handleTextChange,
  handleOnClick,
  nameFormat,
  dashboardUrl,
  accountCounty,
  dashboardClickHandler,
  userStatusFormat,
}) => (
  <div>
    <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
    <PageHeader pageTitle="Manage Users" button="" />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            Back to:{' '}
            <Link
              text="Dashboard"
              href={dashboardUrl}
              clickHandler={dashboardClickHandler}
            />
          </div>
          <Cards
            cardHeaderText={'Manage Users: ' + accountCounty}
            cardActionButtons={false}
          >
            <InputComponent
              gridClassName="col-md-10 col-sm-6 col-xs-12"
              fieldClassName="form-group"
              type="text"
              onChange={handleTextChange}
              placeholder="search user by Last name"
            />
            <div className="col-md-2" style={buttonAlign}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleOnClick}
              >
                Search
              </button>
            </div>
            <div className="col-md-12">
              <br />
              <BootstrapTable
                bordered={false}
                data={userList}
                striped={true}
                hover={true}
                trClassName="userRow"
              >
                <TableHeaderColumn
                  dataField="last_name"
                  dataSort
                  width="200"
                  dataFormat={nameFormat}
                >
                  Full Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="enabled"
                  dataFormat={userStatusFormat}
                  width="40"
                >
                  Status
                </TableHeaderColumn>
                <TableHeaderColumn dataField="last_login_date_time" width="100">
                  Last Login
                </TableHeaderColumn>
                <TableHeaderColumn dataField="RACFID" isKey width="90">
                  CWS Login
                </TableHeaderColumn>
                <TableHeaderColumn dataField="end_date" width="60">
                  End date
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </Cards>
        </div>
      </div>
    </div>
  </div>
);

UserList.propTypes = {
  userList: PropTypes.array,
  dashboardUrl: PropTypes.string,
  accountCounty: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  nameFormat: PropTypes.func,
  handleOnClick: PropTypes.func,
  handleTextChange: PropTypes.func,
  userStatusFormat: PropTypes.func,
};

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
};
export default UserList;
