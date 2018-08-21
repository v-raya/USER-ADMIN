import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HeaderComponent from './containers/headerContainer';
import { store } from './store/configureStore';
import UsersList from './containers/usersListContainer';
import DetailsPage from './containers/detailsContainer';
import AddUser from './containers/addUserContainer';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <HeaderComponent />
      <Router basename={process.env.RAILS_RELATIVE_URL_ROOT || ''}>
        <Switch>
          <Route path="/" exact component={UsersList} />
          <Route path="/new" component={AddUser} />
          <Route path="/user_details/:id" component={DetailsPage} />
          <Route render={() => <h3>404</h3>} />
        </Switch>
      </Router>
    </Fragment>
  </Provider>
);

export default App;
