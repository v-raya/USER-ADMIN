import React from 'react';
import PropTypes from 'prop-types';
import { Link, InputComponent, PageHeader } from 'react-wood-duck';
import Cards from '../../common/Card';
import AddUser from '../../containers/addUserContainer';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { makeUserDetailPath } from '../../_utils/makeUserDetailPath';
import ReactTable from 'react-table';

const buttonAlign = { marginTop: '-9px' };

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      addUser: false,
    };
  }

  componentDidMount() {
    this.props.actions.fetchUsersActions(this.state.searchKey);
    this.props.actions.fetchAccountActions();
  }

  nameFormat = (cell, row) => (
    <a href={`${makeUserDetailPath(row.id)}`}>
      {row.last_name}, {row.first_name}
    </a>
  );

  userStatusFormat = (cell, row) => {
    row.enabled ? (row.enabled = 'Active') : (row.enabled = 'Inactive');
    return row.enabled;
  };

  handleOnClick = () =>
    this.props.actions.fetchUsersActions(this.state.searchKey);

  handleTextChange = event => this.setState({ searchKey: event.target.value });

  handleOnAdd = () => {
    this.setState({ addUser: true });
  };

  tableComponent = () => {
    const { userList } = this.props;
    return (
      <div className="col-md-12">
        <BootstrapTable
          bordered={false}
          data={userList}
          striped={true}
          hover={true}
          trClassName="userRow"
          withoutTabIndex
        >
          <TableHeaderColumn
            dataField="last_name"
            dataSort
            width="0"
            dataFormat={this.nameFormat}
          >
            Full Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="enabled"
            dataFormat={this.userStatusFormat}
            width="40"
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn dataField="last_login_date_time" width="100">
            Last Login
          </TableHeaderColumn>
          <TableHeaderColumn dataField="racfid" isKey width="90">
            CWS Login
          </TableHeaderColumn>
          <TableHeaderColumn dataField="end_date" width="60">
            End date
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  };

  search = (state, instance) => {
    console.log(state, instance);
  };

  handleSortChange = (state, instance) => {
    console.log('Sort Changed...');
  };

  handlePageChange = () => {
    console.log('Page change...');
  };

  handlePageSizeChange = () => {
    console.log('Page size changed...');
  };

  handlePaginationChange = () => {
    console.log('Pagination changed...');
  };

  handleQueryChange = () => {
    console.log('Query changed...');
  };

  renderUsersTable = ({ data }) => {
    console.log(data);
    return (
      data && (
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Full Name',
              id: 'last_name',
              accessor: ({first_name, last_name}) => `${last_name}, ${first_name}`,
              Cell: ({ value, original }) => <Link href={`user_details/${original.id}`} text={value} />,
              minWidth: 400,
            },
            {
              // Was this an accident? (Not using the `status` field?)
              Header: 'Status',
              accessor: 'enabled',
            },
            {
              Header: 'Last Login',
              accessor: 'last_login_date_time',
            },
            {
              Header: 'CWS Login',
              accessor: 'racfid',
            },
            {
              Header: 'End date',
              accessor: 'end_date',
            },
          ]}
          manual
          page={0}
          pageSize={2}
          loading={false}
          onFetchData={this.search}
          defaultPageSize={10}
          className="-striped -highlight"
          onPageChange={(pageIndex) => {this.handlePageChange()}} // Called when the page index is changed by the user
          onPageSizeChange={(pageSize, pageIndex) => {this.handlePageSizeChange()}} // Called when the pageSize is changed by the user. The resolve page is also sent to maintain approximate position in the data
          onSortedChange={(newSorted, column, shiftKey) => {this.handleSortChange()}} // Called when a sortable column header is clicked with the column itself and if the shiftkey was held. If the column is a pivoted column, `column` will be an array of columns
        />
      )
    );
  };

  render() {
    const { dashboardUrl, accountCounty, dashboardClickHandler } = this.props;
    return (
      <div role="main">
        {this.state.addUser ? (
          <AddUser addUser={this.state.addUser} />
        ) : (
          <div>
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
                    cardHeaderButton={true}
                    headerBtnName="+ Add a user"
                    onEdit={this.handleOnAdd}
                  >
                    <InputComponent
                      id="searchtext"
                      gridClassName="col-md-10 col-sm-6 col-xs-12"
                      fieldClassName="form-group"
                      type="text"
                      onChange={this.handleTextChange}
                      placeholder="search user by Last name"
                    />
                    <div className="col-md-2" style={buttonAlign}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={this.handleOnClick}
                      >
                        Search
                      </button>
                      <br />
                      <div>
                        <h3>alksdjfasldkfj</h3>
                      </div>
                    </div>
                    <div>{this.tableComponent()}</div>
                    <div>
                      {this.renderUsersTable({
                        data: this.props.userList,
                      })}
                    </div>
                  </Cards>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

UserList.propTypes = {
  userList: PropTypes.array,
  dashboardUrl: PropTypes.string,
  accountCounty: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object.isRequired,
};

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
};
export default UserList;
