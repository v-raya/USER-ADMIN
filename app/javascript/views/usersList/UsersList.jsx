import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Cards, Link } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const UserList = ({ userList, nameFormat, dashboardUrl, dashboardClickHandler }) => (
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
            cardHeaderText="Manage Users: Sacramento"
            cardActionButtons={false}
          >
            <div className="col-md-12">
              <br />
              <BootstrapTable
                bordered={false}
                data={userList}
                striped={true}
                hover={true}
              >
                <TableHeaderColumn
                  dataField="last_name"
                  dataSort
                  width="200"
                  dataFormat={nameFormat}
                >
                  Full Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="status" width="80">
                  Status
                </TableHeaderColumn>
                <TableHeaderColumn dataField="last_login_date_time" width="100">
                  Last Login
                </TableHeaderColumn>
                <TableHeaderColumn dataField="id" isKey width="80">
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
  dashboardClickHandler: PropTypes.func,
  nameFormat: PropTypes.func,
};

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
};
export default UserList;
