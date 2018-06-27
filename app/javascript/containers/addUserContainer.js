import { connect } from 'react-redux';
import AddUser from '../views/addUser/AddUser';
import { validateNewUserActions } from '../actions/validateNewUserActions';
import { selectNewUserRecords } from '../selectors/validateNewUserSelector';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    verifyNewUserDetails: selectNewUserRecords(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
      ? process.env.RAILS_RELATIVE_URL_ROOT
      : '/',
    dashboardUrl: '/',
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    validateNewUserActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
