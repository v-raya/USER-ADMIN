import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader } from 'react-wood-duck';

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.logoutCallback = this.logoutCallback.bind(this);
  }

  logoutCallback() {
    window.location.href = '/logout';
  }

  render() {
    return (
      <div>
        <GlobalHeader
          profileName={this.props.fullName}
          profileId="profile.id"
          logoutUrl="/logout"
          logoutCallback={this.logoutCallback}
        />
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  fullName: PropTypes.string,
};
