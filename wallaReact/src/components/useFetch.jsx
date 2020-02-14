import React, { useEffect, useReducer } from "react";
import Anuncio from "../models/Anuncio";
// import MainContext from "../services/MainContext";
// import locStorage from "../services/LocalStorage";
// import api from "../services/wallaApi";
// import Anuncio from "../models/Anuncio";
// import AdvertLine from "./AdvertLine";

const initialState = {
  isFetching: false,
  data: [],
  error: null
};

const dataGet = {
  method: "GET",
  headers: {
    Accept: "application/json, text/plain, */*"
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { isFetching: true, data: null, error: null };

    case "FETCH_SUCCESS":
      return { isFetching: false, data: action.data, error: null };

    case "FETCH_FAILURE":
      return { isFetching: false, data: null, error: action.error };

    default:
      return state;
  }
}

function useFetch(url) {
  const [value, dispatch] = useReducer(reducer, initialState);

  let aaa;

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST" }, dataGet);
    fetch(url)
      .then(response => response.json())
      .then(results => {
        const {success,anuncios} = results;
        // let adverts = [];
        // anuncios.map(advert => adverts.push(new Anuncio(advert)))
        // if (success === true)
        //   dispatch({ type: "FETCH_SUCCESS", data: adverts })
        

        dispatch({ type: "FETCH_SUCCESS", data: anuncios });
        // dispatch({ type: "FETCH_SUCCESS", data: results.anuncios });
      })
      .catch(error => dispatch({ type: "FETCH_FAILURE", error }));
  }, [url]);

  
  return value.data;
}

export default useFetch;
