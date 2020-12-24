import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './Landing/Landing';
import MainAppPage from './mainapp/Mainapp';
import SignUpPage from './SignUp/SignUp';
import MatchPage from './Match/Match';
import LobbyPage from './Lobby/Lobby';
import testPage from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/mainapp" component={MainAppPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/match" component={MatchPage} />
      <Route path="/lobby" component={LobbyPage} />
      <Route path="/test" component={testPage} />
    </Switch>
  </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
