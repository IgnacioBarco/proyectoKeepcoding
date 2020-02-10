import React, { Component } from "react";
import MainContext from "../services/MainContext";
import locStorage from "../services/LocalStorage";
import api from "../services/NodePopDBService";
import Advert from "../models/Advert";
import AdvertLine from "../components/AdvertLine";

const { searchAll, searchFiltered } = api();

export default class AdvertsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adverts: [],
      filterText: "",
      filterPrice: ""
    };
  }

  //cargamos la lista de todos los anuncios
  UNSAFE_componentWillMount = () => {
    this.loadInitList();
  };

  loadInitList = async event => {
    const data = await searchAll();
    // const { success, count, results } = data;
    const { results } = data;

    let adverts = [];

    results.map(elem => {
      adverts.push(new Advert(elem));
      return true;
    });

    this.setState({
      adverts
    });
  };

  handleSubmitNew = event => {
    event.preventDefault();
    this.props.history.push("/new");
  };

  onInputChangeFilterText = event => {
    this.setState({
      filterText: event.target.value
    });
  };

  onInputChangeFilterPrice = event => {
    this.setState({
      filterPrice: event.target.value
    });
  };

  //manejamos los filtros al presionar el boton de enviar
  handleSubmit = async event => {
    //cambiamos el filtro que viene dado por el registro
    const filtersTags = document.getElementById("filtroTags");
    this.context.tag = filtersTags.value;
    locStorage.setItem("tag", this.context.tag);

    const filtersText = document.getElementById("filterText");
    const filtersPrice = document.getElementById("filterPrice");

    let filter = "";

    if (filtersText.value !== "") {
      filter = "name=" + filtersText.value;
    }

    if (filtersPrice.value !== "") {
      if (filter !== "") filter += "&";
      filter += "price=" + filtersPrice.value;
    }

    const data = await searchFiltered(filter);
    // const { success, count, results } = data;
    const { count, results } = data;

    if (count > 0) {
      let adverts = [];

      results.map(elem => {
        adverts.push(new Advert(elem));
        return true;
      });

      this.setState({
        adverts
      });
    } else {
      alert("no hay datos");
      this.setState({
        adverts: []
      });
    }
  };

  //construimos el html de los anuncios
  //ponemos en verde los que coinciden con el tag seleccionado
  buildAdvertsList = () => {
    return (
      <div className="row">
        {this.state.adverts.map(advert => (
          <AdvertLine key={advert._id} advert={advert} />
        ))}
      </div>
    );
  };

  //recuperamos los tags del localStorage y los pintamos
  buildTagList = () => {
    const elems = this.context.tags.split(",");

    return (
      <select id="filtroTags">
        {elems.map(elem => {
          return (
            <option key={elem} value={elem}>
              {elem}
            </option>
          );
        })}
      </select>
    );
  };

  render() {
    if (!locStorage.checkIsNull()) {
      console.log("falta algun dato");
      this.props.history.push("/");
    }

    this.context = locStorage.checkLocalStorage(this.context);

    // const { name, surname, tag } = this.context;
    const { tag } = this.context;
    const filterText = this.state.filterText;
    const filterPrice = this.state.filterPrice;

    return (
      <div>
        <br />

        <button onClick={this.handleSubmitNew}>Crear anuncio nuevo</button>

        <br />

        <h1>Lista de filtros:</h1>

        <input
          id="filterText"
          type="text"
          placeholder="filtro de texto"
          value={filterText}
          onChange={this.onInputChangeFilterText}
          name="filterText"
        />

        <br />

        <input
          id="filterPrice"
          type="text"
          placeholder="filtro de precio"
          value={filterPrice}
          onChange={this.onInputChangeFilterPrice}
          name="filterPrice"
        />

        <br />

        {this.buildTagList()}

        <br />

        <button onClick={this.handleSubmit}>Buscar</button>

        <h1>Lista de artículos:</h1>
        <h3>tag filtrado: {tag}</h3>

        {
          this.state.adverts.length > 0 
          && 
          this.buildAdvertsList()
        }
      </div>
    );
  }
}

AdvertsList.contextType = MainContext;
