import React, { Component, useState, useEffect } from "react";
import MainContext from "../services/MainContext";
import locStorage from "../services/LocalStorage";
import api from "../services/wallaApi";

const { login } = api();

const Register2 = () => {
  const [hasError, setErrors] = useState(false);
  const [datos, setDatos] = useState({});
  const [num, setNum] = useState(1);

  // async function fetchData() {
  //   const res = await fetch("https://swapi.co/api/planets/4/");
  //   res
  //     .json()
  //     .then(res => setPlanets(res))
  //     .catch(err => setErrors(err));
  // }
  async function fetchData() {
    const res = await login();
    setDatos(res);
  }

  useEffect(() => {
    fetchData();
  },[num]);

  function handleSubmitNew(event) {
    event.preventDefault();
    fetchData();
    setNum(num+1);
  };

  return (
    <div>
      <span>{JSON.stringify(datos)}</span>
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
      <hr />
      <button onClick={handleSubmitNew}>Crear anuncio nuevo{num}</button>
    </div>
  );
};
export default Register2;

Register2.contextType = MainContext;
