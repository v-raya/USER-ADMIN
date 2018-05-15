import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Cards } from 'react-wood-duck';
import ShowField from '../../common/ShowField';
import { fetchUserDetailActions } from '../../actions/userDetailsActions';
import UserDetailsContainer from '../../containers/userDetailsContainer';
import selectUserDetailRecords from '../../selectors/userDetailSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* eslint camelcase: 0 */

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {
      actions: { fetchUserDetailActions },
      params: { id },
    } = this.props;
    fetchUserDetailActions(id);
  }

  render() {
    return (
      <div>
        <UserDetailsContainer />
        <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
        <PageHeader pageTitle="Manage Users" button="" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <Cards
                cardHeaderText="Manage Users: {county_name}"
                cardHeaderButton={true}
              >
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3">
                      <ShowField label="Full Name">
                        {userDetail.first_name}
                        {userDetail.middle_name}
                      </ShowField>
                    </div>
                    <div className="col-md-3">
                      <ShowField label="Office Name">
                        {userDetail.office}
                      </ShowField>
                    </div>
                    <div className="col-md-3">
                      <ShowField label="CWS Login">
                        {userDetail.racfid}
                      </ShowField>
                    </div>
                    <div className="col-md-3">
                      <ShowField label="Last Login">
                        {userDetail.last_login_date_time}
                      </ShowField>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <ShowField label="Email">{userDetail.email}</ShowField>
                    </div>
                    <div className="col-md-3">
                      <ShowField label="Office Phone Number">
                        {userDetail.phone_number}
                      </ShowField>
                    </div>
                    <div className="col-md-3">
                      <ShowField label="Start Date">
                        {' '}
                        {userDetail.start_date}
                      </ShowField>
                    </div>
                    <div className="col-md-3">
                      <ShowField label="End Date">
                        {userDetail.end_date}
                      </ShowField>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <ShowField label="Status">{userDetail.enabled}</ShowField>
                    </div>
                    <div className="col-md-3">
                      <ShowField label="Assigned Roles">
                        {userDetail.status}
                      </ShowField>
                    </div>
                  </div>
                </div>
              </Cards> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export function mapStateToProps(state, _ownProps) {
  return {
    userDetail: selectUserDetailRecords(state),
  };
}

function mapDispatchToProps(dispatch, _ownProps) {
  const actions = { fetchUserDetailActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
