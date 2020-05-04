import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Profile from './components/profile';
import LandingPage from './components/landing';
import LoginPage from './components/login/login';
import SignupPage from './components/signup/signup';

function App() {
  return (

    <Router>
      <div className="App">

        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/signup" component={SignupPage} />
          <Route path={["/", "/login"]} component={LoginPage} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
