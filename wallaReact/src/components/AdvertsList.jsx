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
import FilterList from "./FilterList";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
// import Pagination from "react-bootstrap/Pagination";

const AdvertList = () => {
  const [url, setUrl] = useState("http://localhost:8080/public/ads");

  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const context = useContext(MainContext);

  // const {success,regsNumber,result} = useFetch(url);
  const result = useFetch(url);

  function handleFilterData(event) {
    event.preventDefault();
    setUrl("http://localhost:8080/public/ads?author=pepe");
  }

  function handleSubmitNew(event) {
    event.preventDefault();
    setUrl("http://localhost:8080/public/ads");

    context.token = "new";
  }

  function onInputChangeFilterText(event) {
    setFilterText(event.target.value);
  }

  function onInputChangeFilterPrice(event) {
    setFilterPrice(event.target.value);
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
      <Card style={{ width: "22rem" }}>
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

      <div>{context.url}</div>

      <FilterList />

      <h1>Lista de filtros:</h1>
      <input
        id="filterText"
        type="text"
        placeholder="filtro de texto"
        value={filterText}
        onChange={onInputChangeFilterText}
        name="filterText"
      />
      <br />
      <input
        id="filterPrice"
        type="text"
        placeholder="filtro de price"
        value={filterPrice}
        onChange={onInputChangeFilterPrice}
        name="filterPrice"
      />
      <br />
      <button onClick={handleFilterData}>Buscar</button>

      <button onClick={handleSubmitNew}>
        {context.token}Resetear busqueda
      </button>

      <hr />

      <CardGroup>{result && result.map(buildAdvertsList)}</CardGroup>

      <Paginator />

      <Link to="/">Back</Link>
      <hr />
    </div>
  );
};
export default AdvertList;
