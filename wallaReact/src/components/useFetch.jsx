import { useEffect, useReducer } from "react";

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

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST" });
    fetch(url, dataGet)
      .then(response => response.json())
      .then(results => {
        const { success, regsNumber, result } = results;
        dispatch({ type: "FETCH_SUCCESS", data: result, success, regsNumber });
      })
      .catch(error => dispatch({ type: "FETCH_FAILURE", error }));
  }, [url]);

  return value.data;
}

export default useFetch;
