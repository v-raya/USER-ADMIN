import { connect } from 'react-redux';
import GlobalHeader from '../common/GlobalHeader';
import { bindActionCreators } from 'redux';
import { fetchAccountActions } from '../actions/accountActions';
import { userName } from '../selectors/accountSelectors';

function mapStateToProps(state) {
  return {
    fullName: userName(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchAccountActions,
      },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalHeader);
