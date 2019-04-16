import React, { Component } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { Standings } from './components/Standings';
import { TeamDetails } from './components/TeamDetails';
import { LiveMatch } from './components/LiveMatch';
import { Schedule } from './components/Schedule';
import { Router, Route } from 'react-router-dom';
import { history } from './store/history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Navigation />
        <Route exact path='/standings' component={Standings}/>
        <Route exact path='/' component={LiveMatch}/>
        <Route exact path='/teams/:id' component={TeamDetails}/>
        <Route exact path='/schedule' component={Schedule}/>
      </Router>
    );
  }
}

export default App;
