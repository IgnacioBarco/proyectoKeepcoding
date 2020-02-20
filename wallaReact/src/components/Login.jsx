import React, { useState, useContext } from "react";
import MainContext from "../services/MainContext";
import api from "../services/wallaApi";
import locStorage from "../services/LocalStorage";

import { Link } from "react-router-dom";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

// import Header from "./Header";

const { login } = api();

const Login = props => {
  const context = useContext(MainContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [token, setToken] = useState("");
  // const [token, setToken] = useState(locStorage.getItem("token"));

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !pass) {
      alert("Faltan campos por rellenar");
    } else {
      const aaaa = await login(email, pass);
      const { regsNumber, result }= aaaa
      if (result === "Invalid credentials") {
        alert("Usuario y contraseña invalida");
        setEmail("");
        setPass("");
        return;
      }

      console.log("result "+result)

      context.setToken(result);
      context.setName(regsNumber);

      setToken(result);
      setName(regsNumber);
      setEmail(email);

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
      {/* <Header /> */}
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

      <Link to={`/register`}>Recover password</Link>
    </div>
  );
};

export default Login;
