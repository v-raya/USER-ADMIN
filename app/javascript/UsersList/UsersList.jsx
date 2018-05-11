import React from 'react';

import { GlobalHeader, PageHeader, Cards, Link } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class UsersList extends React.Component {
  displayList = () => {
    return (
      <div className="col-md-12">
        <br />
        <BootstrapTable bordered={false}>
          <TableHeaderColumn dataField="id" dataSort isKey hidden />
          <TableHeaderColumn dataField="fullName" dataSort>
            Full Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
          <TableHeaderColumn dataField="last-login">
            Last Log in
          </TableHeaderColumn>
          <TableHeaderColumn dataField="username">Username</TableHeaderColumn>
          <TableHeaderColumn dataField="end-date">End Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  };

  capUserListUrl() {
    return process.env.COUNTY_ADMIN_WEB_BASE_URL || '/';
  }

  dashboardUrl() {
    return process.env.DASHBOARD_URL || '/';
  }

  render() {
    const userListUrl = this.capUserListUrl();
    const dashboardUrl = this.dashboardUrl();
    return (
      <div>
        <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
        <PageHeader pageTitle="Manage Users" button="" />

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                Back to: <Link text="Dashboard" href={dashboardUrl} />&nbsp;&gt;&nbsp;
                <Link text="Manage Users" href={userListUrl} />
              </div>
              <Cards
                cardHeaderText="Manage Users: Sacramento"
                cardActionButtons={false}
              >
                {this.displayList()}
              </Cards>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersList;
