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
  const context = useContext(MainContext);
  let URL = "http://localhost:8080/public/ads?sold=false";
  let urlAux = "";

  const limitString = "&limit=";
  let limit = 4;
  const startString = "&start=";
  URL += limitString + limit;

  const [url, setUrl] = useState(URL);
  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const result = useFetch(url);

  function handleFilterData(event) {
    event.preventDefault();
    urlAux = "";

    if (filterText) urlAux += "&name=" + filterText;
    if (filterPrice) urlAux += "&price=" + filterPrice;
    if (filterTag) urlAux += "&tag=" + filterTag;

    URL = URL + urlAux;
    context.setAdStart(parseInt(0));
    context.setUrl(URL);
    setUrl(URL);
  }

  function handlerPageNumber(number) {
    const pag = parseInt(context.adStart) + number;
    context.setAdStart(parseInt(pag));
    const _url = context.url + startString + pag;
    setUrl(_url);
  }

  function handlePaginatorNext(event) {
    event.preventDefault();
    if (result.length >= 4) handlerPageNumber(parseInt(4));
  }

  function handlePaginatorPrev(event) {
    event.preventDefault();
    if (context.adStart >= 4) handlerPageNumber(parseInt(-4));
  }

  return (
    <div>
      <br />
      <br />
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
              {/* <Pagination.First /> */}
              <Pagination.Prev onClick={handlePaginatorPrev} />
              {/* <Pagination.Item>{1}</Pagination.Item> */}
              <Pagination.Next onClick={handlePaginatorNext} />
              {/* <Pagination.Last /> */}
            </Pagination>
          </Row>
        </div>
      )}
    </div>
  );
};
export default AdvertList;
