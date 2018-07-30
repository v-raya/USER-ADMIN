/* eslint camelcase: ["off"] */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Link as LinkRWD,
  InputComponent,
  PageHeader,
  Alert,
} from 'react-wood-duck';
import Cards from '../../common/Card';
import AddUser from '../../containers/addUserContainer';
import ReactTable from 'react-table';
import Pagination from './Pagination';
import './UsersList.scss';

const hackBtnStyles = {
  marginTop: '22px',
  padding: '14px 0',
  textAlign: 'center',
};

export const toFullName = ({ first_name, last_name }) =>
  `${last_name}, ${first_name}`;

export const userStatusFormat = ({ enabled }) => {
  return enabled ? 'Active' : 'Inactive';
};

class UserList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addUser: false,
    };
  }

  componentDidMount() {
    this.props.actions.searchUsers({
      query: this.props.query,
      sort: this.props.sort,
      size: this.props.size,
      from: this.props.from,
    });
    this.props.actions.fetchAccountActions();
  }

  handleOnAdd = () => {
    this.setState({ addUser: true });
  };

  handlePageChange = pageIndex => {
    this.props.actions.setPage(pageIndex);
  };

  handlePageSizeChange = (pageSize, pageIndex) => {
    this.props.actions.setPageSize(pageSize);
  };

  handleSortChange = (newSorted, column, shiftKey) => {
    this.props.actions.setSort(
      newSorted.map(s => ({ field: s.id, desc: s.desc }))
    );
  };

  handleSearchChange = e => {
    this.props.actions.setNextSearch(e.target.value);
  };

  submitSearch = e => {
    e.preventDefault();
    this.props.actions.setSearch([
      { field: 'last_name', value: this.props.nextSearch },
    ]);
  };

  getTotalPages = () => {
    const { userList: records, total, size } = this.props;
    if (!records) return -1;
    if (records && Array.isArray(records) && !records.length) return 1;
    if (total && size) return Math.ceil(total / size);
    return -1;
  };

  getCurrentPageNumber = () => Math.floor(this.props.from / this.props.size);

  isDisabledSearchBtn = () => {
    const { query, nextSearch } = this.props;
    if (!query) return false;
    const lastNameSearch = query.find(
      ({ field, value }) => field === 'last_name'
    );
    if (!lastNameSearch) return false;
    return lastNameSearch.value === nextSearch;
  };

  renderUsersTable = ({ data }) => {
    return (
      <ReactTable
        data={data}
        showPaginationTop={true}
        showPaginationBottom={this.props.size >= 20}
        columns={[
          {
            Header: 'Full Name',
            id: 'last_name',
            accessor: toFullName,
            Cell: ({ value, original }) => (
              <Link to={`/user_details/${original.id}`}>{value}</Link>
            ),
            minWidth: 200,
          },
          {
            Header: 'Status',
            id: 'enabled',
            accessor: userStatusFormat,
            minWidth: 60,
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
            Header: 'Office Name',
            accessor: 'office',
          },
        ]}
        manual
        sorted={this.props.sort.map(d => ({ id: d.field, desc: d.desc }))}
        sortable={false}
        page={this.getCurrentPageNumber()}
        pages={this.getTotalPages()}
        pageSize={this.props.size}
        pageSizeOptions={this.props.pageSizeOptions}
        defaultPageSize={10}
        loading={this.props.fetching}
        onFetchData={this.search}
        className="-striped -highlight"
        onPageChange={this.handlePageChange}
        onPageSizeChange={this.handlePageSizeChange}
        onSortedChange={this.handleSortChange}
        PaginationComponent={Pagination}
      />
    );
  };

  renderBreadcrumb = () => {
    const { dashboardUrl, dashboardClickHandler } = this.props;
    return (
      <div>
        Back to:{' '}
        <LinkRWD
          text="Dashboard"
          href={dashboardUrl}
          clickHandler={dashboardClickHandler}
        />
      </div>
    );
  };

  render() {
    const { accountCounty } = this.props;
    return (
      <div role="main">
        {this.state.addUser ? (
          <AddUser addUser={this.state.addUser} />
        ) : (
          <div>
            <PageHeader pageTitle="Manage Users" button="" />
            <div className="container">
              {this.renderBreadcrumb()}
              <Cards
                cardHeaderText={'County: ' + accountCounty}
                cardHeaderButton={true}
                headerBtnName="+ Add a user"
                onEdit={this.handleOnAdd}
              >
                <form onSubmit={this.submitSearch}>
                  <div className="row">
                    <div className="col-md-10 col-sm-6">
                      <InputComponent
                        id="searchtext"
                        fieldClassName="form-group"
                        type="text"
                        value={this.props.nextSearch}
                        onChange={this.handleSearchChange}
                        placeholder="search user by Last name"
                        autocomplete="off"
                      />
                    </div>
                    <div className="col-md-2 col-sm-6">
                      <button
                        type="submit"
                        style={hackBtnStyles}
                        className="btn btn-primary btn-block btn-sm"
                        disabled={this.isDisabledSearchBtn()}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
                {this.props.error && (
                  <Alert
                    alertClassName="error"
                    faIcon="fa-exclamation-triangle"
                    alertCross={false}
                  >
                    <strong>Oh no!</strong> An unexpected error occured!
                  </Alert>
                )}
                <br />
                <div>
                  {this.renderUsersTable({
                    data: this.props.userList,
                  })}
                </div>
              </Cards>
            </div>
          </div>
        )}
      </div>
    );
  }
}

UserList.propTypes = {
  page: PropTypes.number,
  from: PropTypes.number,
  size: PropTypes.number,
  fetching: PropTypes.bool,
  userList: PropTypes.array,
  dashboardUrl: PropTypes.string,
  accountCounty: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object.isRequired,
  nextSearch: PropTypes.string,
  total: PropTypes.number,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  sort: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      desc: PropTypes.bool,
    })
  ),
  query: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
    })
  ),
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  error: PropTypes.any,
};

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  sort: [],
  pageSizeOptions: [5, 10, 25, 50, 100],
};
export default UserList;
