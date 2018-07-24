import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UsersList from '../containers/usersListContainer';
import DetailsPage from '../containers/detailsContainer';
import { store } from '../store/configureStore';
import { Provider } from 'react-redux';

const basename = process.env.RAILS_RELATIVE_URL_ROOT || process.env.BASENAME;

export default (
  <Provider store={store}>
    <Router basename={basename}>
      <Fragment>
        <Route path="/" exact component={UsersList} />
        <Route path="/user_details/:id" component={DetailsPage} />
      </Fragment>
    </Router>
  </Provider>
);
