import React, { useContext, useState } from "react";
import MainContext from "../services/MainContext";
import useFetch from "./useFetch";
import buildAdvertsList from "./BuildAdvertsList";
import { Link } from "react-router-dom";

// react-bootstrap
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";

const MyAds = props => {
  const context = useContext(MainContext);
  const URL = "http://localhost:8080/public/user/" + context.name;

  const [url, setUrl] = useState(URL);
  const result = useFetch(url);

  return (
    <div>
      {(result && result === "El User no tiene anuncios actualmente" && (
        <div>No tienes anuncios publicados.</div>
      )) ||
        ((context.token === "" || context.name === "") && (
          <div>
            Para acceder a esta sección tienes que estar logado
            <br />
            <Link to="/login">Login</Link>
          </div>
        )) || (
          <div>
            <CardGroup className="justify-content-md-center">
              {result && result.map(buildAdvertsList)}
            </CardGroup>
            <br />
            <Row className="justify-content-md-center">
              <Pagination size="lg">
                <Pagination.First
                  onClick={() => {
                    context.setUrl(
                      "http://localhost:8080/public/user/pepe?limit=2"
                    );
                    setUrl("http://localhost:8080/public/user/pepe?limit=2");
                  }}
                />
                <Pagination.Prev href="/adverts" />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </Row>
          </div>
        )}

      <hr />
    </div>
  );
};
export default MyAds;
