import React from 'react';
import { GlobalHeader } from 'react-wood-duck';
import PropTypes from 'prop-types';

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.logoutCallback = this.logoutCallback.bind(this);
  }

  logoutCallback() {
    window.location.href = this.props.logoutUrl;
  }

  render() {
    return (
      <div>
        <GlobalHeader
          profileName="County CWDS-Admin"
          profileId="profile.id"
          logoutUrl={this.props.logoutUrl}
          logoutCallback={this.logoutCallback}
        />
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  logoutUrl: PropTypes.string,
};
