import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AdvertDetail from "./components/AdvertDetail";
import AdvertsList from "./components/AdvertsList";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import MyAds from "./components/MyAds";
import MyOffers from "./components/MyOffers";
import MyProfile from "./components/MyProfile";
import MyChats from "./components/MyChats";
import ErrorBoundary from "./components/ErrorBoundary";

import MainContext from "./services/MainContext";
import locStorage from "./services/LocalStorage";

import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: locStorage.getItem("token"),
      email: locStorage.getItem("email"),
      name: locStorage.getItem("name"),
      url: locStorage.getItem("url"),
      adStart: locStorage.getItem("adStart"),

    };
  }

  setToken = token =>
    this.setState({ token }, localStorage.setItem("token", token));

  setEmail = email =>
    this.setState({ email }, localStorage.setItem("email", email));

  setName = name => this.setState({ name }, localStorage.setItem("name", name));

  setUrl = url => this.setState({ url }, localStorage.setItem("url", url));

  setAdStart = adStart => this.setState({ adStart }, localStorage.setItem("adStart", adStart));

  resetValues = () => {
    this.setToken("");
    this.setEmail("");
    this.setName("");
    this.setUrl("http://localhost:3000/login");
    this.setAdStart(parseInt(0));
  };

  render() {
    const value = {
      token: this.state.token,
      setToken: this.setToken,

      email: this.state.email,
      setEmail: this.setEmail,

      name: this.state.name,
      setName: this.setName,

      url: this.state.url,
      setUrl: this.setUrl,

      resetValues: this.resetValues,

      adStart: this.state.adStart,
      setAdStart: this.setAdStart,
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
              <Header props={value} />
            </header>

            <main>
              <Router>
                <Switch>
                  <Route
                    path="/advert/:id"
                    props={value}
                    component={AdvertDetail}
                  />
                  <Route
                    path="/adverts"
                    value={value}
                    component={AdvertsList}
                  />
                  <Route strict path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/myads" value={value} component={MyAds} />
                  <Route path="/myProfile" value={value} component={MyProfile} />
                  <Route path="/myChats" value={value} component={MyChats} />
                  <Route path="/myOffers" value={value} component={MyOffers} />
                  <Route value={value} component={AdvertsList} />
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
