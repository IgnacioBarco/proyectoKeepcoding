import React, { Component, useState, useEffect } from "react";
import MainContext from "../services/MainContext";
import locStorage from "../services/LocalStorage";
import api from "../services/wallaApi";

const { searchAll } = api();

const Register2 = () => {
  const [hasError, setErrors] = useState(false);
  const [planets, setPlanets] = useState({});

  // async function fetchData() {
  //   const res = await fetch("https://swapi.co/api/planets/4/");
  //   res
  //     .json()
  //     .then(res => setPlanets(res))
  //     .catch(err => setErrors(err));
  // }
  async function fetchData() {
    const res = await searchAll();
    setPlanets(res);
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <span>{JSON.stringify(planets)}</span>
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>
  );
};
export default Register2;

Register2.contextType = MainContext;
