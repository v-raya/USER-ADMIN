import React from 'react';
import { GlobalHeader, PageHeader, Cards } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class UserList extends React.Component {
  displayList = () => {
    return (
      <div className="col-md-12">
        <br />
        <BootstrapTable>
          <TableHeaderColumn dataField="Username" dataSort>
            UserName/Acct #
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Role" isKey hidden dataSort>
            Assigned Role
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Status" dataSort>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Updated" dataSort>
            Updated
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Created" dataSort>
            Created
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Actions" dataSort>
            Actions
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  };
  render() {
    return (
      <div>
        <GlobalHeader />
        <PageHeader pageTitle="Admin User Name" button="" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Cards
                cardHeaderText="County Users List"
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

export default UserList;

UserList.propTypes = {};
