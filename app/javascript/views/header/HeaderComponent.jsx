import React from 'react';
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
          profileName="County CWDS-Admin"
          profileId="profile.id"
          logoutUrl="/logout"
          logoutCallback={this.logoutCallback}
        />
      </div>
    );
  }
}
