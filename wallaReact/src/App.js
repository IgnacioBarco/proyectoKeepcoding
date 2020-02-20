import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AdvertDetail from "./components/AdvertDetail";
import AdvertsList from "./components/AdvertsList";
import CreateAndUpdate from "./components/CreateAndUpdate";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";

import MainContext from "./services/MainContext";
import locStorage from "./services/LocalStorage";

import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: locStorage.getItem("token"),
      email: "",
      url: ""
    };
  }

  setToken = token =>
    this.setState({ token }, localStorage.setItem("token", token));

  clearToken = () => this.setToken(null);

  setUrl = url =>
    this.setState({ url }, localStorage.setItem("url", url));

  render() {
    const value = {
      token: this.state.token,
      setToken: this.setToken,
      clearToken: this.clearToken,
      setUrl: this.setUrl,
    };

    return (
      <ErrorBoundary>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />

        <div className="App">
          <MainContext.Provider value={value}>
            <header>
              <Header props={this.token} />
            </header>

            <main>
              <Router>
                <Switch>
                  <Route path="/advert/:id" component={AdvertDetail}/>
                  <Route path="/adverts" component={AdvertsList} />
                  {/* <Route path="/new" component={CreateAndUpdate} />
                  <Route path="/modify/:id" component={CreateAndUpdate} /> */}
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
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
