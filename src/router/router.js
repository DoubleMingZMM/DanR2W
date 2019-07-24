import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Bundle from './Bundle';

import Login from 'bundle-loader?lazy&name=login!@/views/login';
import Page1 from 'bundle-loader?lazy&name=page1!@/views/page1';
import Page2 from 'bundle-loader?lazy&name=page2!@/views/page2';
import Dashboard from 'bundle-loader?lazy&name=dashboard!@/views/Index';

const createComponent = (component) => (props) => (
  <Bundle load={component}>
    {
      (Component) => (Component ? <Component {...props} /> : '')
    }
  </Bundle>
);

const getRouter = () => (
  /* A <Router> may have only one child element */
  <Switch>
    <Route component={createComponent(Dashboard)}
      path="/dashboard"
    />
    <Route component={createComponent(Page1)}
      path="/page1"
    />
    <Route component={createComponent(Page2)}
      path="/page2"
    />
    <Route path="*"
      render={() => (<Redirect to="/dashboard" />)}
    />
  </Switch>
);

const getNoAppRouter = () => (
  /* A <Router> may have only one child element */
  <Switch>
    <Route component={createComponent(Login)}
      path="/login"
    />
    <Route path="*"
      render={() => (<Redirect to="/login" />)}
    />
  </Switch>
);

module.exports = {
  getRouter,
  getNoAppRouter
};
