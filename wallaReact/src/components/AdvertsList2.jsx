import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useReducer
} from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
import locStorage from "../services/LocalStorage";
import api from "../services/wallaApi";
import Anuncio from "../models/Anuncio";
import useFetch from "./useFetch";
import AdvertLine from "./AdvertLine";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const { getAllAds, getAdsFiltered } = api();

const AdvertList2 = () => {
  const [url, setUrl] = useState("http://localhost:8080/public/ads");
  // const [data, setData] = useState({});
  const [num, setNum] = useState(1);

  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const context = useContext(MainContext);

  const anuncios = useFetch(url);
  // const data = useFetch(url);
  // console.log('data '+success)
  // console.log('data '+anuncios)
  // console.log(anuncios)
  // console.log(error)
  // const state = useFetch(url);

  function handleFilterData(event) {
    event.preventDefault();
    setUrl("http://localhost:8080/public/ads?autor=pepe");
  }

  function handleSubmitNew(event) {
    event.preventDefault();
    setUrl("http://localhost:8080/public/ads");

    setNum(num + 1);
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
    nombre,
    foto,
    descripcion,
    venta,
    precio,
    autor,
    fecha,
    tags,
    reservado,
    vendido,
    chat
  }) => (
    <div>
      <li key={_id}>
        {nombre} -{foto} -{descripcion} -{venta} -{precio} -{autor} -{fecha} -
        {tags} -{reservado} -{vendido} -{chat}
      </li>

      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={foto} />
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Text>
            {descripcion}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div>
      {/* <span>{JSON.stringify(anuncios)}</span> */}
      <span>{JSON.stringify(anuncios)}</span>
      <hr />

      <hr />
      <span>Url: {JSON.stringify(url)}</span>
      <hr />
      <button onClick={handleFilterData}>filterData</button>
      <hr />
      <button onClick={handleSubmitNew}>
        {context.token}Crear anuncio nuevo{num}
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
          placeholder="filtro de precio"
          value={filterPrice}
          onChange={onInputChangeFilterPrice}
          name="filterPrice"
        />

        <br />

        <button onClick={handleSubmitNew}>Buscar</button>

        <h1>Lista de artículos:</h1>

        <ul>{anuncios && anuncios.map(buildAdvertsList)}</ul>

        <Link to="/">Back</Link>
        {/* <h3>tag filtrado: {tag}</h3> */}

        {/* {this.state.adverts.length > 0 && this.buildAdvertsList()} */}
      </div>
    </div>
  );
};
export default AdvertList2;
