import React, {
  // Component,
  useState,
  // useEffect,
  useContext,
  // useReducer
} from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
// import locStorage from "../services/LocalStorage";
// import api from "../services/wallaApi";
// import Advert from "../models/Advert";
import useFetch from "./useFetch";
import AdvertDetail from "./AdvertDetail";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const AdvertList = () => {
  const [url, setUrl] = useState("http://localhost:8080/public/ads");

  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const context = useContext(MainContext);

  // const {success,regsNumber,result} = useFetch(url);
  const result = useFetch(url);
  
  // const{isFetching,data} = data2
  // const {success,regsNumber,result} = data;
  // const{isFetching,data:[success,regsNumber,result]}= data
  // console.log('response'+result);
  // console.log('response'+success);
  // console.log('response'+regsNumber);
  // const { ...result } = response;
  // const { result } = response;
  // const data = useFetch(url);
  // console.log('data '+success)
  // console.log('data '+result)
  // console.log(result)
  // console.log(error)
  // const state = useFetch(url);

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

  const buildAdvertsList2 = ({ _id }) => <div>{AdvertDetail}</div>;

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
    <div>
      {/* <li key={_id}>
        {name} -{photo} -{description} -{sell} -{price} -{author} -{date} -
        {tags} -{reserved} -{sold} -{chat}
      </li> */}

      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description} -{sell} -{price} -{author} -{date} -{tags} -{reserved}{" "}
            -{sold} -{chat}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div>
      {/* <span>{JSON.stringify(result)}</span> */}
      <span>{JSON.stringify(result)}</span>
      <hr />

      <hr />
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

        <ul>{result && result.map(buildAdvertsList)}</ul>

        <Link to="/">Back</Link>

        <hr />

        <ul>{result && result.map(buildAdvertsList2)}</ul>

        {/* <h3>tag filtrado: {tag}</h3> */}

        {/* {this.state.adverts.length > 0 && this.buildAdvertsList()} */}
      </div>
    </div>
  );
};
export default AdvertList;
