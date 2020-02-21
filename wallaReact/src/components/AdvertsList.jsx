import React, { useState, useContext } from "react";
import MainContext from "../services/MainContext";
import useFetch from "./useFetch";
import buildAdvertsList from "./BuildAdvertsList";

// react-bootstrap
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";

const AdvertList = props => {
  const URL = "http://localhost:8080/public/ads?limit=6&sold=false";
  const [url, setUrl] = useState(URL);
  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const context = useContext(MainContext);

  const result = useFetch(url);

  function handleFilterData(event) {
    event.preventDefault();
    let urlAux = "";

    if (filterText) urlAux += "&name=" + filterText;
    if (filterPrice) urlAux += "&price=" + filterPrice;
    if (filterTag) urlAux += "&tag=" + filterTag;

    context.setUrl(URL + urlAux);
    setUrl(URL + urlAux);
  }

  return (
    <div>
      <div>{url}</div>
      <div>{context.token}</div>
      <div>{context.name}</div>
      <div>{context.email}</div>
      <div>{context.url}</div>

      <input
        id="filterText"
        type="text"
        placeholder="nombre del árticulo"
        value={filterText}
        name="filterText"
        onChange={event => {
          setFilterText(event.target.value);
        }}
      />
      <input
        id="filterPrice"
        type="text"
        placeholder="filtro de price"
        value={filterPrice}
        name="filterPrice"
        onChange={event => {
          setFilterPrice(event.target.value);
        }}
      />
      <input
        id="filterTag"
        type="text"
        placeholder="filtro de tag"
        value={filterTag}
        name="filterTag"
        onChange={event => {
          setFilterTag(event.target.value);
        }}
      />

      <br />
      <br />

      <Button variant="outline-info" onClick={handleFilterData}>
        Buscar
      </Button>

      <hr />

      {(result && result === "No hay ningun anuncio con esos filtros" && (
        <div>No hay resultados con esos filtros.</div>
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
                context.setUrl("http://localhost:8080/public/ads?limit=4&start=2&sold=false");
                setUrl("http://localhost:8080/public/ads?limit=4&start=2&sold=false");
              }}/>
              <Pagination.Prev />
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
export default AdvertList;
