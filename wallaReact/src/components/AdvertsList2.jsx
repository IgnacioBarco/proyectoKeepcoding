import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useReducer
} from "react";
import MainContext from "../services/MainContext";
import locStorage from "../services/LocalStorage";
import api from "../services/wallaApi";
import Anuncio from "../models/Anuncio";
import useFetch from "./useFetch";
import AdvertLine from "./AdvertLine";

const { getAllAds, getAdsFiltered } = api();

const AdvertList2 = () => {
  const [url, setUrl] = useState("http://localhost:8080/public/ads");
  // const [data, setData] = useState({});
  const [num, setNum] = useState(1);

  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const context = useContext(MainContext);

  const state = useFetch(url);

  const adverts = [];

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




  function buildAdvertsList() {
    let aaa = [];
    aaa= state;
      console.log('aaa'+aaa)
    //  aaa.map(item => console.log(item.nombre))
    return (
      <div className="row">
        dasfadsasd
      </div>
    );
    
    
    
    // return <div>adverts</div>;
  }

  return (
    <div>
      <span>{JSON.stringify(state)}</span>
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

        {buildAdvertsList()}
        {/* <h3>tag filtrado: {tag}</h3> */}

        {/* {this.state.adverts.length > 0 && this.buildAdvertsList()} */}
      </div>
    </div>
  );
};
export default AdvertList2;
