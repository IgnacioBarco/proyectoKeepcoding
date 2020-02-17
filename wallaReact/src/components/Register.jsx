import React, { useState, useEffect } from "react";
import MainContext from "../services/MainContext";
import api from "../services/wallaApi";

const { login } = api();

const Register = () => {
  const [hasError, setErrors] = useState(false);
  const [datos, setDatos] = useState({});
  const [num, setNum] = useState(1);

  async function fetchData() {
    const res = await login();
    setDatos(res);
    setErrors(true);
  }

  useEffect(() => {
    fetchData();
  }, [num]);

  function handleSubmitNew(event) {
    event.preventDefault();
    fetchData();
    setNum(num + 1);
  }

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
export default Register;

Register.contextType = MainContext;
