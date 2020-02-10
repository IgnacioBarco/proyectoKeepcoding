import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AdvertDetail from './components/AdvertDetail'
import AdvertsList from './components/AdvertsList'
import CreateAndUpdate from './components/CreateAndUpdate'
import Register from './components/Register'
import ErrorBoundary from './components/ErrorBoundary'

import MainContext from './services/MainContext'

import logo from './img/logo.svg';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      tag: '',
      tags: []
    }
  };

  render() {
    const value = {
      name: this.state.name,
      surname: this.state.surname,
      tag: this.state.tag,
      tags: this.state.tags
    }

    return (
      <ErrorBoundary>

        <div className="App">

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>

          <main>

            <MainContext.Provider value={value} >

              <Router>

                <Switch>
                  <Route path='/adverts' component={AdvertsList} />
                  <Route path='/advert/:id' component={AdvertDetail} />
                  <Route path='/new' component={CreateAndUpdate} />
                  <Route path='/modify/:id' component={CreateAndUpdate} />
                  <Route component={Register} />

                </Switch>

              </Router>

            </MainContext.Provider>

          </main>

        </div >

      </ErrorBoundary>
    );
  }
}

export default App;
