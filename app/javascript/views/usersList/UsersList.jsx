import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Cards, Link } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const UserList = ({
  userList,
  dashboardUrl,
  userListUrl,
  userListClickHandler,
  dashboardClickHandler,
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
            &nbsp;&gt;&nbsp;
            <Link
              text="Manage Users"
              href={userListUrl}
              clickHandler={userListClickHandler}
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
                <TableHeaderColumn dataField="last_name" dataSort width="100">
                  Full Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="first_name" />
                <TableHeaderColumn dataField="status" width="150">
                  Status
                </TableHeaderColumn>
                <TableHeaderColumn dataField="last_login_date_time" width="180">
                  Last Login
                </TableHeaderColumn>
                <TableHeaderColumn dataField="id" isKey width="120">
                  CWS Login
                </TableHeaderColumn>
                <TableHeaderColumn dataField="end_date" width="150">
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
  userListUrl: PropTypes.string,
  userListClickHandler: PropTypes.func,
  dashboardClickHandler: PropTypes.func,
};

UserList.defaultProps = {
  userListUrl: '/#',
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
};
export default UserList;
