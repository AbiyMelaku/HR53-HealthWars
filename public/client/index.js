//Client entry point
import React from 'react';
import { render } from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './components/App';
import LoggingExercise from './components/exercise/LoggingExercise';
import UserView from './components/userView/UserView';
import Overview from './components/overview/Overview';
import Dashboard from './components/adminDashboard/Dashboard';
  
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/user" component={UserView}/>
      <Route path="/overview" component={Overview}/>
      <Route path="/exercise" component={LoggingExercise}/>
      <Route path="/admin" component={Dashboard} />
    </Route>
  </Router>
), document.getElementById('app'))