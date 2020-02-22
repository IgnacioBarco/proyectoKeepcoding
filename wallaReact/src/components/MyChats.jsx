import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
import useFetch from "./useFetch";
import buildAdvertsList from "./BuildAdvertsList";

// react-bootstrap
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const MyAds = props => {
  const context = useContext(MainContext);
  const URL = "http://localhost:8080/public/user/" + context.name;
  const result = useFetch(URL);

  return (
    <div>
      {((context.token === "" || context.name === "") && (
        <div>
          Para acceder a esta sección tienes que estar logado
          <br />
          <Link to="/login">Login</Link>
        </div>
      )) ||
        "Mis chats"}
    </div>
  );
};
export default MyAds;
