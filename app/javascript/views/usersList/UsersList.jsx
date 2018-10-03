import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import {
  Link as LinkRWD,
  InputComponent,
  PageHeader,
  Alert,
} from 'react-wood-duck';
import MultiSelect from '../../common/MultiSelect';
import Cards from '../../common/Card';
import ReactTable from 'react-table';
import Pagination from './Pagination';
import './UsersList.scss';
import {
  toFullName,
  userStatusFormat,
  lastLoginDate,
  officesListToOptions,
} from '../../_constants/constants';
import { isEqual } from 'lodash';

class UserList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addUser: false,
    };
  }

  componentDidMount() {
    this.props.actions.fetchAccountActions();
    this.props.actions.fetchOfficesActions();
  }

  componentDidUpdate(prevProps) {
    if (this.props.loggedInUserAccount !== prevProps.loggedInUserAccount) {
      this.props.actions.searchUsers({
        query: this.initialLoadQuery(this.props.loggedInUserAccount),
        sort: this.props.sort,
        size: this.props.size,
        from: this.props.from,
      });
    }
  }

  isStateAdmin = loggedInUserAccount => {
    return loggedInUserAccount.roles.includes('State-admin');
  };

  initialLoadQuery = loggedInUserAccount => {
    if (this.isOfficeAdmin(loggedInUserAccount)) {
      this.props.actions.setOfficesList(loggedInUserAccount.admin_office_ids);
      return [
        {
          field: 'last_name',
          value: this.props.nextSearch,
        },
        {
          field: 'office_ids',
          value: loggedInUserAccount.admin_office_ids,
        },
      ];
    } else {
      return this.props.query;
    }
  };

  isCountyAdmin = loggedInUserAccount => {
    return (
      !this.isStateAdmin(loggedInUserAccount) &&
      loggedInUserAccount.roles.includes('County-admin')
    );
  };

  isOfficeAdmin = loggedInUserAccount => {
    return (
      loggedInUserAccount !== undefined &&
      !this.isStateAdmin(loggedInUserAccount) &&
      !this.isCountyAdmin(loggedInUserAccount) &&
      loggedInUserAccount.roles.includes('Office-admin')
    );
  };

  handleOnAdd = () => {
    this.setState({ addUser: true });
  };

  handlePageChange = pageIndex => {
    window.scrollTo(0, 0);
    this.props.actions.setPage(pageIndex);
  };

  handlePageSizeChange = (pageSize, pageIndex) => {
    window.scrollTo(0, 0);
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

  handleOfficesListChange = value => {
    this.props.actions.setOfficesList(value);
  };

  submitSearch = e => {
    e.preventDefault();
    const offices = this.props.selectedOfficesList;

    this.props.actions.setSearch([
      { field: 'last_name', value: this.props.nextSearch },
      { field: 'office_ids', value: offices },
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
    const { selectedOfficesList, nextSearch, query } = this.props;

    const lastNameSearch = query.find(({ field }) => field === 'last_name');

    const officeSearch = query.find(({ field }) => field === 'office_ids');

    return (
      lastNameSearch &&
      lastNameSearch.value === nextSearch &&
      isEqual(officeSearch.value.sort(), selectedOfficesList.sort())
    );
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
            Header: 'Account Status',
            id: 'enabled',
            accessor: userStatusFormat,
            minWidth: 60,
          },
          {
            Header: 'Last Login',
            id: 'last_login_date_time',
            accessor: lastLoginDate,
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
    const {
      loggedInUserAccount,
      officesList,
      selectedOfficesList,
    } = this.props;
    return (
      <div role="main">
        {this.state.addUser ? (
          <Redirect push to="/verify" />
        ) : (
          <div>
            <PageHeader pageTitle="Manage Users" button="" />
            <div className="container">
              {this.renderBreadcrumb()}
              <Cards
                cardHeaderText={'County: ' + loggedInUserAccount.county_name}
                cardHeaderButton={true}
                headerBtnName="+ Add a user"
                onEdit={this.handleOnAdd}
              >
                <form onSubmit={this.submitSearch} autoComplete="off">
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      <MultiSelect
                        id="MultiSelect2"
                        selectedOption={selectedOfficesList}
                        options={officesListToOptions(officesList)}
                        label="Filter by Office Name"
                        placeholder={`(${officesList.length})`}
                        onChange={selectedOptions =>
                          this.handleOfficesListChange(
                            selectedOptions.split(',')
                          )
                        }
                      />
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <InputComponent
                        label="Search user list"
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
                        className="btn btn-primary btn-block btn-sm searchButton"
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
                    <strong>Oh no!</strong> An unexpected error occurred!
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
  loggedInUserAccount: PropTypes.object,
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
  officesList: PropTypes.array,
  selectedOfficesList: PropTypes.array,
};

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  sort: [],
  pageSizeOptions: [5, 10, 25, 50, 100],
  officesList: [],
  nextSearch: '',
};
export default UserList;
