//Client entry point
import React from 'react';
import { render } from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, IndexRedirect} from 'react-router';
import App from './components/App';
import LoggingExercise from './components/exercise/LoggingExercise';
import UserView from './components/userView/UserView';
import Overview from './components/overview/Overview';
import Dashboard from './components/adminDashboard/Dashboard';
import Slack from './components/slack/Slack';

import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';

import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
  
render((
  <Router history={hashHistory}>
    <Route component={App}>
      <Route component={MainLayout}>
        <Route path="/" component={Overview}/>
        <Route path="/user" component={UserView}/>
        <Route path="/overview" component={Overview}/>
        <Route path="/exercise" component={LoggingExercise}/>
        <Route path="/admin" component={Dashboard} />
        <Route path="/slack" component={Slack} />
      </Route>
      <Route path="auth" component={AuthLayout}>
        <IndexRedirect to="login" />
        <Route path="login" component={Login}/>
        <Route path="logout" component={Logout}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
