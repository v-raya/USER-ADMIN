import React from 'react';
import PropTypes from 'prop-types';
// import UserService from '../_services/users/user.service';
import DetailsContainer from '../containers/detailsContainer';
import { fetchDetailsActions } from '../actions/detailActions';
import { fetchPermissionsActions } from '../actions/permissionsActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectDetailRecords } from '../selectors/detailSelector';

class DetailsPage extends React.Component {
  componentDidMount() {
    this.props.actions.fetchDetailsActions();
    this.props.actions.fetchPermissionsActions();
  }

  render() {
    return <DetailsContainer details={this.props.details} />;
  }
}

DetailsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  details: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    details: selectDetailRecords(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchDetailsActions, fetchPermissionsActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
