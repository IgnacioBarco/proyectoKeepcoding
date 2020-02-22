import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
import usePrivateFetch from "./usePrivateFetch";
import buildAdvertsList from "./BuildAdvertsList";

// react-bootstrap
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const MyOffers = props => {
  const [result, setResult] = useState("");

  const context = useContext(MainContext);

  const URL = "http://localhost:8080/private/users/" + context.name;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let urlencoded = new URLSearchParams();
  urlencoded.append("token", context.token);

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
  };

  fetch(URL, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));

  // const result = usePrivateFetch(URL, requestOptions);
  console.log("res " + result);

  return (
    <div>
      {((context.token === "" || context.name === "") && (
        <div>
          Para acceder a esta sección tienes que estar logado
          <br />
          <Link to="/login">Login</Link>
        </div>
      )) ||
        "Mis ofertas"}
    </div>
  );
};
export default MyOffers;
