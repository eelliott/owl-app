import React, { Component } from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { TeamList } from './components/TeamList';
import { TeamDetails } from './components/TeamDetails';
import { CurrentMatch } from './components/CurrentMatch';
import { Router, Route } from 'react-router-dom';
import { history } from './store/history';
import teams from "./server/data.default/teams";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Navigation />
        <Route exact path='/teams' component={()=><TeamList teams={teams.competitors}/>}/>
        <Route exact path='/' component={CurrentMatch}/>
        <Route exact path='/teams/:id' />
      </Router>
    );
  }
}

export default App;
