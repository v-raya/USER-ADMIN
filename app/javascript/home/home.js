import React from 'react';
import PropTypes from 'prop-types';
import CountyUsersListContainer from '../containers/usersListContainer';
import { fetchUserDetailActions } from '../actions/userDetailsActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUserDetailRecords } from '../selectors/userDetailSelector';

class Home extends React.Component {
  componentDidMount() {
    // this.props.actions.fetchUsersActions();
    this.props.actions.fetchUserDetailActions();
  }
  render() {
    return <CountyUsersListContainer userDetail={this.props.userDetail} />;
  }
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  userList: PropTypes.array,
  userDetail: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    // userList: selectUserRecords(state),
    userDetails: selectUserDetailRecords(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchUserDetailActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
