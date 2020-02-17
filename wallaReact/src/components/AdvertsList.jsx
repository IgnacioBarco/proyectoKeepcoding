import React, {
  // Component,
  useState,
  // useEffect,
  useContext
  // useReducer
} from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
// import locStorage from "../services/LocalStorage";
// import api from "../services/wallaApi";
// import Advert from "../models/Advert";
import useFetch from "./useFetch";
import Paginator from "./Paginator";

// material-ui
import RangeSlider from "./RangeSlider";

// react-bootstrap
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
// import Pagination from "react-bootstrap/Pagination";

const AdvertList = () => {
  const URL = "http://localhost:8080/public/ads";

  const [url, setUrl] = useState(URL);

  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterPrice2, setFilterPrice2] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const context = useContext(MainContext);

  // const result = useFetch(context.url);
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

    setUrl(URL + urlAux);

    console.log("url modificada " + url);
  }

  function handleSubmitNew(event) {
    event.preventDefault();
    setUrl(URL);

    const valuetext = "";
    setFilterPrice2(valuetext);
    // console.log('new slider '+ this.props.valuetext)

    
  }

  const buildAdvertsList = ({
    _id,
    name,
    photo,
    description,
    sell,
    price,
    author,
    date,
    tags,
    reserved,
    sold,
    chat
  }) => (
    <div key={_id}>
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={`http://localhost:8080${photo}`} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description} -{sell} -{price}€ -{author} -{date} -{tags} -
            {reserved} -{sold} -{chat}
          </Card.Text>
          <Link to={`/advert/${_id}`}>
            <Button variant="primary">Comprar</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );

  // <span>Url: {JSON.stringify(url)}</span>

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
      <br />

      <Row className="justify-content-md-center">
        <RangeSlider />
      </Row>

      <br />
      <button onClick={handleFilterData}>Buscar</button>

      <button onClick={handleSubmitNew}>
        {context.token}Resetear busqueda
      </button>

      <hr />

      {(result && result === "No hay ningun anuncio con esos filtros" && (
        <div>No hay resultados con esos filtros.</div>
      )) || (
        <div>
          <CardGroup>{result && result.map(buildAdvertsList)}</CardGroup>
          <br />
          <Row className="justify-content-md-center">
            <Paginator />
          </Row>
        </div>
      )}

      {/* <Link to="/">Back</Link> */}
      <hr />
    </div>
  );
};
export default AdvertList;
