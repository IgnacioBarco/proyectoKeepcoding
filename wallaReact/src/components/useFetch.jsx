import {
  // React,
  useEffect,
  useReducer
  // useContext
} from "react";
// import MainContext from "../services/MainContext";

// import Advert from "../models/Advert";
// import MainContext from "../services/MainContext";
// import locStorage from "../services/LocalStorage";
// import api from "../services/wallaApi";
// import Advert from "../models/Advert";
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
  // const context = useContext(MainContext);
  // const url2 = context.url;

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST" });
    fetch(url, dataGet)
      .then(response => response.json())
      .then(results => {
        const { success, regsNumber, result } = results;
        console.log(success);
        console.log(regsNumber);
        dispatch({ type: "FETCH_SUCCESS", data: result });
      })
      .catch(error => dispatch({ type: "FETCH_FAILURE", error }));
  }, [url]);

  // console.log("value " + JSON.stringify(value.data));
  console.log(url);
  console.log("value " + JSON.stringify(value.data));
  return value.data;
}

export default useFetch;
