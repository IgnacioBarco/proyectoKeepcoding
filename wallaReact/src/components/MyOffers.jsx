import React, {
  // Component,
  useState,
  // useEffect,
  useContext
  // useReducer
} from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
import usePrivateFetch from "./usePrivateFetch";
import Paginator from "./Paginator";
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
      {/* <div>{URL}</div>
      <div>{context.token}</div>
      <div>{context.name}</div>
      <div>{context.email}</div>
      <div>{context.url}</div> */}
      {/* //   {(result && result === "No hay ningun anuncio con esos filtros" && (
    //     <div>No hay resultados con esos filtros.</div>
    //   )) || (
    //     <div>
    //       <CardGroup className="justify-content-md-center">
    //         {result && result.map(buildAdvertsList)}
    //       </CardGroup>
    //       <br />
    //       <Row className="justify-content-md-center">
    //         <Paginator />
    //       </Row>
    //     </div>
    //   )} */}
      {/* <Link to="/">Back</Link> */}
      Mis ofertas
      <hr />
    </div>
  );
};
export default MyOffers;
