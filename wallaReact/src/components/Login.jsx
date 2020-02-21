import React, { useState, useContext } from "react";
import MainContext from "../services/MainContext";
import api from "../services/wallaApi";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

// import Header from "./Header";

const { login } = api();

const Login = props => {
  const context = useContext(MainContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !pass) {
      alert("Faltan campos por rellenar");
    } else {
      const { regsNumber, result } = await login(email, pass);
      if (result === "Invalid credentials") {
        alert("Usuario y contraseña invalida");
        setEmail("");
        setPass("");
        return;
      }

      context.setToken(result);
      context.setEmail(email);
      context.setName(regsNumber);
      context.setUrl("http://localhost:8080/public/ads");

      props.history.push("/adverts");
    }
  }

  function onInputChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onInputChangePass(event) {
    setPass(event.target.value);
  }

  return (
    <div>
      <form>
        <br />

        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={onInputChangeEmail}
          email="email"
        />

        <br />

        <input
          type="text"
          placeholder="pass"
          value={pass}
          onChange={onInputChangePass}
          email="pass"
        />

        <br />
        <br />

        <Button variant="outline-info" onClick={handleSubmit}>
          Login
        </Button>
      </form>

      <br />

      <Link to={`/register`}>Recuperar contraseña</Link>
      <Link to={`/register`}>Registarse</Link>
    </div>
  );
};

export default Login;
