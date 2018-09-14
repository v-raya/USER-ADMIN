import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import GlobalHeader from './containers/globalHeaderContainer';
import { store } from './store/configureStore';
import UsersList from './containers/usersListContainer';
import DetailsPage from './containers/detailsContainer';
import AddUser from './containers/addUserContainer';
import AddUserDetails from './containers/addUserDetailsContainer';
import { makeLogoutUrl } from './_utils/makeLogoutUrl';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <GlobalHeader logoutUrl={makeLogoutUrl()} />
      <Router basename={process.env.RAILS_RELATIVE_URL_ROOT || ''}>
        <Switch>
          <Route path="/" exact component={UsersList} />
          <Route path="/verify" component={AddUser} />
          <Route path="/user_details/:id" component={DetailsPage} />
          <Route path="/add_user" component={AddUserDetails} />
          <Route render={() => <h3>404</h3>} />
        </Switch>
      </Router>
    </Fragment>
  </Provider>
);

export default App;
