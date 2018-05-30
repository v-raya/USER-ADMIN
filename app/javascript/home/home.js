import React from 'react';
import PropTypes from 'prop-types';
import CountyUsersListContainer from '../containers/usersListContainer';
import { fetchUsersActions } from '../actions/usersActions';
import { fetchAccountActions } from '../actions/accountActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUserRecords } from '../selectors/userListSelector';

class Home extends React.Component {
  componentDidMount() {
    this.props.actions.fetchUsersActions();
    this.props.actions.fetchAccountActions();
  }

  nameFormat = (cell, row) => (
    <a href={`${makeUserDetailPath(row.id)}`}>
      {row.last_name}, {row.first_name}
    </a>
  );
  render() {
    return (
      <CountyUsersListContainer
        userList={this.props.userList}
        nameFormat={this.nameFormat}
      />
    );
  }
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  userList: PropTypes.array,
};

export function makeUserDetailPath(userId) {
  var relativeRoot = process.env.RAILS_RELATIVE_URL_ROOT
    ? process.env.RAILS_RELATIVE_URL_ROOT
    : '/';
  if (!relativeRoot.endsWith('/')) {
    relativeRoot = relativeRoot + '/';
  }
  return relativeRoot + ['user_details', encodeURIComponent(userId)].join('/');
}
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
