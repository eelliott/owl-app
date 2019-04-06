import React, { Component } from 'react';
import './App.css';
import { ConnectedNavigation } from './components/Navigation';
import { ConnectedTeamList } from './components/TeamList';
import CurrentMatch from './components/CurrentMatch';
import { Router, Route } from 'react-router-dom';
import { history } from './store/history';
import { store } from './store';
import { Provider } from 'react-redux';


class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <ConnectedNavigation />
          <Route exact path='/Teams' component={ConnectedTeamList}/>
          <Route exact path='/' component={CurrentMatch}/>
        </Provider>
      </Router>
    );
  }
}

export default App;
