import React from 'react';
import PropTypes from 'prop-types';
import CountyUsersListContainer from '../containers/usersListContainer';
import { fetchUsersActions } from '../actions/usersActions';
import { fetchAccountActions } from '../actions/accountActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUserRecords } from '../selectors/userListSelector';
import { makeUserDetailPath } from '../utils/makeUserDetailPath';

class Home extends React.Component {
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

  render() {
    return (
      <CountyUsersListContainer
        userList={this.props.userList}
        nameFormat={this.nameFormat}
        handleTextChange={this.handleTextChange}
        handleOnClick={this.handleOnClick}
        userStatusFormat={this.userStatusFormat}
      />
    );
  }
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  userList: PropTypes.array,
  fetchUsersActions: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    userList: selectUserRecords(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchUsersActions, fetchAccountActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
