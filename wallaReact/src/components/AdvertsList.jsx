import React, {
  // Component,
  useState,
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

const AdvertList = () => {
  const URL = "http://localhost:8080/public/ads";

  const [url, setUrl] = useState(URL);

  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const context = useContext(MainContext);

  const result = useFetch(url);

  function handleFilterData(event) {
    event.preventDefault();
    let urlAux = "";
    let aux = false;

    if (filterText || filterPrice || filterTag) {
      urlAux = "?";

      if (filterText) {
        urlAux += "name=" + filterText;
        aux = true;
      }
      if (filterPrice) {
        if (aux) urlAux += "&price=" + filterPrice;
        else {
          urlAux += "price=" + filterPrice;
          aux = true;
        }
      }

      if (filterTag) {
        if (aux) urlAux += "&tag=" + filterTag;
        else urlAux += "tag=" + filterTag;
      }
    }

    context.setUrl(URL + urlAux)
    setUrl(URL + urlAux);

    console.log("url modificada " + url);
  }

  return (
    <div>
      <div>{url}</div>

      <h1>Lista de filtros:</h1>
      <input
        id="filterText"
        type="text"
        placeholder="nombre del árticulo"
        value={filterText}
        onChange={event => {
          setFilterText(event.target.value);
        }}
        name="filterText"
      />
      <input
        id="filterPrice"
        type="text"
        placeholder="filtro de price"
        value={filterPrice}
        onChange={event => {
          setFilterPrice(event.target.value);
        }}
        name="filterPrice"
      />
      <input
        id="filterTag"
        type="text"
        placeholder="filtro de tag"
        value={filterTag}
        onChange={event => {
          setFilterTag(event.target.value);
        }}
        name="filterTag"
      />

      <br />

      <Button variant="outline-info"
        onClick={handleFilterData}>
        Buscar
      </Button>

      <div>
        {context.token}
      </div>
      <hr />

      {
        (result && result === "No hay ningun anuncio con esos filtros"
          && (<div>No hay resultados con esos filtros.</div>))
        ||
        (<div>
          <CardGroup className="justify-content-md-center">
            {result && result.map(buildAdvertsList)}
          </CardGroup>
          <br />
          <Row className="justify-content-md-center">
            <Paginator />
          </Row>
        </div>)
      }

      {/* <Link to="/">Back</Link> */}
      <hr />
    </div>
  );
};
export default AdvertList;
