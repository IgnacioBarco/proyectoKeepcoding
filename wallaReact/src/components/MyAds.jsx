import React, { useContext, useState } from "react";
import MainContext from "../services/MainContext";
import useFetch from "./useFetch";
import buildAdvertsList from "./BuildAdvertsList";

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
            <Pagination size="lg">
              <Pagination.First
                onClick={() => {
                  context.setUrl("http://localhost:8080/public/user/pepe?limit=2");
                  setUrl("http://localhost:8080/public/user/pepe?limit=2");
                }}
              />
              <Pagination.Prev href="/adverts" />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Row>
          {/* 
          thorndike
          <Row className="justify-content-md-center">
            <Pagination size="lg">
              <Pagination.First onSelect={() => console.log("adsdas")} />
              <Pagination.Prev href="/adverts" />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Row> */}
        </div>
      )}

      <hr />
    </div>
  );
};
export default MyAds;
