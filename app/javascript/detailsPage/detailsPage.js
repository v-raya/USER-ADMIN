import React from 'react';
import PropTypes from 'prop-types';
import DetailsContainer from '../containers/detailsContainer';
import { fetchDetailsActions } from '../actions/detailActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectDetailRecords } from '../selectors/detailSelector';

class DetailsPage extends React.Component {
  componentDidMount() {
    this.props.actions.fetchDetailsActions();
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
  const actions = { fetchDetailsActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
