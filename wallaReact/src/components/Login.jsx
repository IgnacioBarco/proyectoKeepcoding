import React, { Component } from "react";
import MainContext from "../services/MainContext";
import api from "../services/wallaApi";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const { login } = api();

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
      token: ""
    };
  }

  UNSAFE_componentWillMount = () => {
    this.setState({
      email: "",
      pass: ""
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (!this.state.email || !this.state.pass) {
      alert("Faltan campos por rellenar");
    } else {
      const { email, pass } = this.state;

      const result = await login(email, pass);
      if (result === "Invalid credentials") {
        alert("Usuario y contraseña invalida");
        this.setState({
          email: "",
          pass: ""
        });
      } else {
        this.setState({
          token: result
        });

        this.props.history.push("/adverts");
      }
    }
  };

  onInputChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  onInputChangePass = event => {
    this.setState({
      pass: event.target.value
    });
  };

  render() {
    const { email, pass } = this.state;

    return (
      <div>
        <form>
          <br />

          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={this.onInputChangeEmail}
            email="email"
          />

          <br />

          <input
            type="text"
            placeholder="pass"
            value={pass}
            onChange={this.onInputChangePass}
            email="pass"
          />

          <br />
          <br />

          <Button variant="outline-info" onClick={this.handleSubmit}>
            Login
          </Button>
        </form>

        <br />

        <Link to={`/register`}>Recover password</Link>
      </div>
    );
  }
}

Login.contextType = MainContext;
