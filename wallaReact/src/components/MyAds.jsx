import React, {
  // Component,
  useParams,
  // useEffect,
  useContext
  // useReducer
} from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
import useFetch from "./useFetch";
import Paginator from "./Paginator";
import buildAdvertsList from "./BuildAdvertsList";

// react-bootstrap
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const MyAds = props => {
  const context = useContext(MainContext);
  const URL = "http://localhost:8080/public/user/"+context.name ;
  const result = useFetch(URL);

  return (
    <div>
      <div>{URL}</div>
      <div>{context.token}</div>
      <div>{context.name}</div>
      <div>{context.email}</div>
      <div>{context.url}</div>

      {(result && result === "El User no tiene anuncios actualmente" && (
        <div>No tienes anuncios publicados.</div>
      )) || (
        <div>
          <CardGroup className="justify-content-md-center">
            {result && result.map(buildAdvertsList)}
          </CardGroup>

          <br />
          <Row className="justify-content-md-center">
            <Paginator />
          </Row>
        </div>
      )}

      <hr />
    </div>
  );
};
export default MyAds;
