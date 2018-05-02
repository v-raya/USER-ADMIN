import React from 'react';

import { GlobalHeader, PageHeader, Cards } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class UsersList extends React.Component {
  displayList = () => {
    return (
      <div className="col-md-12">
        <br />
        <BootstrapTable bordered={false}>
          <TableHeaderColumn dataField="fullName" dataSort>
            Full Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="status" isKey hidden>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="last-login">
            Last Log in
          </TableHeaderColumn>
          <TableHeaderColumn dataField="username">Username</TableHeaderColumn>
          <TableHeaderColumn dataField="end-date">End Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  };
  render() {
    return (
      <div>
        <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
        <PageHeader pageTitle="Manage Users" button="" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
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
