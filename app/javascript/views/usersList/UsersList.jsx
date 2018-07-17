import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, InputComponent, PageHeader } from 'react-wood-duck';
import Cards from '../../common/Card';
import AddUser from '../../containers/addUserContainer';
import ReactTable from 'react-table';

const hackBtnStyles = {
  marginTop: '22px',
  padding: '14px 0',
  textAlign: 'center',
};

export const toFullName = ({ first_name, last_name }) =>
  `${last_name}, ${first_name}`;

class UserList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addUser: false,
    };
  }

  componentDidMount() {
    this.props.actions.fetchUsersActions(this.state.searchKey);
    this.props.actions.fetchAccountActions();
  }

  handleOnClick = () =>
    this.props.actions.fetchUsersActions(this.state.searchKey);

  handleOnAdd = () => {
    this.setState({ addUser: true });
  };

  search = (state, instance) => {
    // console.log(state, instance);
  };

  handlePageChange = pageIndex => {
    this.props.actions.setPage(pageIndex);
  };

  handlePageSizeChange = (pageSize, pageIndex) => {
    this.props.actions.setPageSize(pageSize);
  };

  handleSortChange = (newSorted, column, shiftKey) => {
    this.props.actions.setSort(newSorted);
  };

  handleSearchChange = e => {
    this.props.actions.setNextSearch(e.target.value);
  };

  submitSearch = e => {
    e.preventDefault();
    this.props.actions.setSearch('last_name', this.props.nextSearch);
  };

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
        columns={[
          {
            Header: 'Full Name',
            id: 'last_name',
            accessor: toFullName,
            Cell: ({ value, original }) => (
              <Link
                href={`${this.props.location.pathname}/user_details/${
                  original.id
                }`}
                text={value}
              />
            ),
            minWidth: 400,
          },
          {
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
        sorted={this.props.sort}
        page={this.props.page}
        pageSize={this.props.pageSize}
        loading={this.props.fetching}
        onFetchData={this.search}
        defaultPageSize={10}
        className="-striped -highlight"
        onPageChange={this.handlePageChange}
        onPageSizeChange={this.handlePageSizeChange}
        onSortedChange={this.handleSortChange}
      />
    );
  };

  renderBreadcrumb = () => {
    const { dashboardUrl, dashboardClickHandler } = this.props;
    return (
      <div>
        Back to:{' '}
        <Link
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
                cardHeaderText={'Manage Users: ' + accountCounty}
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
                <pre style={{ color: 'white' }}>
                  {JSON.stringify(
                    {
                      sort: this.props.sort,
                      fetching: this.props.fetching,
                      page: this.props.page,
                      pageSize: this.props.pageSize,
                      query: this.props.query,
                    },
                    null,
                    2
                  )}
                </pre>
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
  pageSize: PropTypes.number,
  fetching: PropTypes.bool,
  userList: PropTypes.array,
  dashboardUrl: PropTypes.string,
  accountCounty: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object.isRequired,
  nextSearch: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  sort: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
};

UserList.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
};
export default UserList;
