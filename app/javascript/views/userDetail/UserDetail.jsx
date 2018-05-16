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

const UserDetail = ({ details }) => (
  <div>
    <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
    <PageHeader pageTitle="Manage Users" button="" />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Cards
            cardHeaderText={`Manage Users: ${details.county_name}`}
            cardHeaderButton={true}
          >
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Full Name">
                    {details.last_name}
                    {details.first_name}
                    {details.middle_name}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Office Name">{details.office}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="CWS Login">{details.racfid}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Last Login">
                    {details.last_login_date_time}
                  </ShowField>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Email">{details.email}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Office Phone Number">
                    <span>{details.phone_number}</span>
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Start Date">
                    {' '}
                    {details.start_date}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="End Date">{details.end_date}</ShowField>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Status">{details.enabled}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Assigned Roles">{details.status}</ShowField>
                </div>
              </div>
            </div>
          </Cards>
        </div>
      </div>
    );
  }
}

UserDetail.propTypes = {
<<<<<<< HEAD
  details: PropTypes.object,
};

export default UserDetail;
=======
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
>>>>>>> afa7582dad691ecb6ec33d63c784817bf1e87c17
