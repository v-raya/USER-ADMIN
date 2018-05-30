import React from 'react';
import PropTypes from 'prop-types';
import CountyUsersListContainer from '../containers/usersListContainer';
import { fetchUsersActions } from '../actions/usersActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUserRecords } from '../selectors/userListSelector';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchUsersActions(this.state.searchKey);
  }

  nameFormat = (cell, row) => (
    <a href={`/user_details/${row.id}`}>
      {row.last_name}, {row.first_name}
    </a>
  );

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
  const actions = { fetchUsersActions };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
