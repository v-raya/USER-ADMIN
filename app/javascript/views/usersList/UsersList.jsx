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
  getOfficeTranslator,
} from '../../_constants/constants';
import { isEqual } from 'lodash';
import { formatSelectedRoles } from '../../_utils/formatters';

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
    this.props.actions.fetchRolesActions();
    this.props.actions.clearAddedUserDetailActions();
  }

  componentDidUpdate(prevProps) {
    if (isEqual(prevProps.inputData, {}) && this.props.inputData.officeNames) {
      this.props.actions.setSearch([
        { field: 'last_name', value: this.props.lastName },
        { field: 'office_ids', value: this.props.officeNames },
      ]);
    }
  }

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

  submitSearch = e => {
    e.preventDefault();
    this.props.actions.setSearch([
      { field: 'last_name', value: this.props.lastName },
      { field: 'office_ids', value: this.props.officeNames },
    ]);
  };

  isDisabledSearchBtn = () => {
    const { officeNames, lastName, query } = this.props;

    const lastNameSearch = query.find(({ field }) => field === 'last_name');

    const officeSearch = query.find(({ field }) => field === 'office_ids');

    return (
      lastNameSearch &&
      lastNameSearch.value === lastName &&
      isEqual(officeSearch.value.sort(), officeNames.sort())
    );
  };

  getTotalPages = () => {
    const { userList: records, total, size } = this.props;
    if (!records) return -1;
    if (records && Array.isArray(records) && !records.length) return 1;
    if (total && size) return Math.ceil(total / size);
    return -1;
  };

  getCurrentPageNumber = () => Math.floor(this.props.from / this.props.size);

  renderUsersTable = ({ data, officesList, rolesList }) => {
    const translateOffice = getOfficeTranslator(officesList);
    const translateRoles = data => formatSelectedRoles(data.roles, rolesList);

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
            Header: 'Last Log in',
            id: 'last_login_date_time',
            minWidth: 150,
            accessor: lastLoginDate,
          },
          {
            Header: 'CWS Login',
            minWidth: 80,
            accessor: 'racfid',
          },
          {
            Header: 'Office Name',
            id: 'office_name',
            accessor: translateOffice,
          },
          {
            Header: 'Role',
            id: 'user_role',
            accessor: translateRoles,
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
    const { countyName, officesList, officeNames, lastName } = this.props;
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
                cardHeaderText={'County: ' + countyName}
                cardHeaderButton={true}
                headerBtnName="+ Add a user"
                onEdit={this.handleOnAdd}
              >
                <form onSubmit={this.submitSearch} autoComplete="off">
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      <MultiSelect
                        id="searchOfficeName"
                        selectedOption={officeNames}
                        options={officesListToOptions(officesList)}
                        label="Filter by Office Name"
                        placeholder={`(${officesList.length})`}
                        onChange={selectedOptions =>
                          this.props.actions.handleSearchChange(
                            'officeNames',
                            selectedOptions.split(',')
                          )
                        }
                      />
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <InputComponent
                        label="Search user list"
                        id="searchLastName"
                        fieldClassName="form-group"
                        type="text"
                        value={lastName}
                        onChange={event =>
                          this.props.actions.handleSearchChange(
                            'lastName',
                            event.target.value
                          )
                        }
                        placeholder="Search users by Last name"
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
                    officesList,
                    rolesList: this.props.rolesList,
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
  countyName: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object.isRequired,
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
  handleSearchChange: PropTypes.func,
  officeNames: PropTypes.array,
  lastName: PropTypes.string,
  inputData: PropTypes.object,
  rolesList: PropTypes.array,
};

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
  sort: [],
  pageSizeOptions: [5, 10, 25, 50, 100],
  officesList: [],
  lastName: '',
  officeNames: [],
};
export default UserList;
