import React, {useState, useContext} from "react";
import MainContext from "../services/MainContext";


const FilterList = () => {
  const [url, setUrl] = useState("http://localhost:8080/public/ads");
  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const context = useContext(MainContext);

  function handleFilterData(event) {
    event.preventDefault();
    context.url="http://localhost:8080/public/ads?author=pepe";
  }

  function handleSubmitNew(event) {
    event.preventDefault();
    context.url="http://localhost:8080/public/ads";

    context.token = "new";
  }

  function onInputChangeFilterText(event) {
    setFilterText(event.target.value);
  }

  function onInputChangeFilterPrice(event) {
    setFilterPrice(event.target.value);
  }
  
  return (
    <div>
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
      <button onClick={handleFilterData}>Buscar</button>

      <button onClick={handleSubmitNew}>
        {context.token}Resetear busqueda
      </button>

      <div>{context.url}</div>


      <hr />
    </div>
  );
};
export default FilterList;
