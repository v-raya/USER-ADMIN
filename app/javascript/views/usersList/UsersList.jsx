import React from 'react';
import PropTypes from 'prop-types';
import { Link, PageHeader } from 'react-wood-duck';
import Cards from '../../common/Card';
import InputComponent from '../../common/InputComponent';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { makeUserDetailPath } from '../../_utils/makeUserDetailPath';

const buttonAlign = { marginTop: '-9px' };

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
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

  tableComponent = () => {
    const { userList } = this.props;
    return (
      <div className="col-md-12">
        <br />
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
            width="200"
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
          <TableHeaderColumn dataField="RACFID" isKey width="90">
            CWS Login
          </TableHeaderColumn>
          <TableHeaderColumn dataField="end_date" width="60">
            End date
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  };

  render() {
    const { dashboardUrl, accountCounty, dashboardClickHandler } = this.props;
    return (
      <div role="main">
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
              >
                <InputComponent
                  gridClassName="col-md-10 col-sm-6 col-xs-12"
                  fieldClassName="form-group"
                  type="text"
                  onChange={this.handleTextChange}
                  placeholder="search user by Last name"
                  ariaLabel="Search user by Last name"
                />
                <div className="col-md-2" style={buttonAlign}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={this.handleOnClick}
                  >
                    Search
                  </button>
                </div>
                {this.tableComponent()}
              </Cards>
            </div>
          </div>
        </div>
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
  fetchUsersActions: PropTypes.func,
  fetchAccountActions: PropTypes.func,
};

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
};
export default UserList;
