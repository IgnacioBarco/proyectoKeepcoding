import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AdvertDetail from "./components/AdvertDetail";
import AdvertsList from "./components/AdvertsList";
import CreateAndUpdate from "./components/CreateAndUpdate";
// import Register from "./components/Register";
import Register2 from "./components/Register2";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";

import MainContext from "./services/MainContext";

import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      surname: "",
      tag: "",
      tags: []
    };
  }

  render() {
    const value = {
      name: this.state.name,
      surname: this.state.surname,
      tag: this.state.tag,
      tags: this.state.tags
    };

    return (
      <ErrorBoundary>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />

        <div className="App">
          <MainContext.Provider value={value}>
            <header>
              <Header />
            </header>

            <main>
              <Router>
                <Switch>
                  <Route path="/advert/:id" component={AdvertDetail} />
                  <Route path="/advert/:seoName/:id" component={AdvertDetail} />
                  <Route path="/adverts" component={AdvertsList} />
                  <Route path="/new" component={CreateAndUpdate} />
                  <Route path="/modify/:id" component={CreateAndUpdate} />
                  <Route path="/register" component={Register2} />
                  <Route component={AdvertsList} />
                </Switch>
              </Router>
            </main>
          </MainContext.Provider>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
