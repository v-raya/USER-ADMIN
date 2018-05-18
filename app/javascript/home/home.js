import React from 'react';
import PropTypes from 'prop-types';
import CountyUsersListContainer from '../containers/usersListContainer';
import { fetchUsersActions } from '../actions/usersActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUserRecords } from '../selectors/userListSelector';

class Home extends React.Component {
  componentDidMount() {
    this.props.actions.fetchUsersActions();
  }

  nameFormat = (cell, row) => (
    <a
      href={`${
        process.env.RAILS_RELATIVE_URL_ROOT === '/'
          ? '/'
          : process.env.RAILS_RELATIVE_URL_ROOT + '/'
      }${['user_details', row.id].join('/')}`}
    >
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

function mapStateToProps(state) {
  return {
    userList: selectUserRecords(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchUsersActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
