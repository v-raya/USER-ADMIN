import { connect } from 'react-redux';
import * as actionTypes from '../actions/actionTypes';
import { selectUserRecords } from '../selectors/selectors.js';

import React from 'react';
import PropTypes from 'prop-types';

class CountyUserList extends React.Component {
  render() {
    return (
      <h1>
        Name: {this.props.name}
        <div>Response: {this.props.userList}</div>
      </h1>
    );
  }
}
CountyUserList.propTypes = {
  name: PropTypes.string,
  userList: PropTypes.string,
};
CountyUserList.defaultProps = {
  name: 'Hello Cognito App User!',
};

const mapStateToProps = state => {
  return {
    userList: selectUserRecords(state),
  };
};

const mapDispatchToProps = dispatch => {
  dispatch({ type: actionTypes.FETCH_USERS_API_CALL_REQUEST });
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CountyUserList);
