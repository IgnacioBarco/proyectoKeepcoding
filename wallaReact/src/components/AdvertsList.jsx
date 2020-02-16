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

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";

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
      <Card style={{ width: "25rem" }}>
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

  return (
    <div>
      <span>Url: {JSON.stringify(url)}</span>
      <hr />
      <button onClick={handleFilterData}>filterData</button>
      <hr />
      <button onClick={handleSubmitNew}>
        {context.token}Crear anuncio nuevo
      </button>
      <hr />
      <hr />
      <hr />

      <div>
        <br />
        <button onClick={handleSubmitNew}>Crear anuncio nuevo</button>
        <br />
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
        <button onClick={handleSubmitNew}>Buscar</button>
        <h1>Lista de artículos:</h1>

        <CardGroup>{result && result.map(buildAdvertsList)}</CardGroup>

        <Pagination size="lg">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>

        <Link to="/">Back</Link>
        <hr />
      </div>
    </div>
  );
};
export default AdvertList;
