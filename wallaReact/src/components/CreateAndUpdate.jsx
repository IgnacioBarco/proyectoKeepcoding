import React, { Component } from "react";
import MainContext from "../services/MainContext";
import locStorage from "../services/LocalStorage";
import api from "../services/NodePopDBService";

const { searchAdvert } = api();

export default class CreateAndUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      result: {},
      mode: "new"
    };
  }

  //si tiene id es modificacion, y si no, es un anuncio nuevo
  UNSAFE_componentWillMount = () => {
    if (this.props.match.params.id !== undefined) {
      this.loadAdvert();
    } else {
      this.newAdvert();
    }
  };

  //cargamos anuncio
  loadAdvert = async () => {
    const id = this.props.match.params.id;
    const data = await searchAdvert(id);

    const { success, result } = data;

    this.setState({
      success,
      result,
      mode: "modify"
    });
  };

  //si es un anuncio nuevo
  newAdvert = () => {
    this.setState({
      success: false,
      result: {},
      mode: "new"
    });
  };

  handleSubmitBack = event => {
    event.preventDefault();
    this.props.history.goBack();
  };

  handleSubmitModify = event => {
    event.preventDefault();
    alert("Anuncio modificado!!!");
    this.props.history.push("/adverts");
  };

  handleSubmitNew = event => {
    event.preventDefault();
    alert("Anuncio nuevo creado!!!");
    this.props.history.push("/adverts");
  };

  //creamos el template de modificación
  buildAdvert = () => {
    const advert = this.state.result;
    const img = "http://localhost:3001/" + advert.photo;

    return (
      <div className="row">
        <h1>[[[Modificar]]]</h1>
        <img src={img} alt={advert.description} />
        <br />
        <label>Nombre:</label>
        <input type="text" placeholder={advert.name} />
        <br />
        <label>Precio:</label>
        <input type="number" placeholder={advert.price} />
        <br />
        <label>Descripción: </label>
        <textarea type="text" placeholder={advert.description} />
        <br />
        <label>Estado: </label>
        <select>
          <option value="Quiero vender">Quiero vender</option>
          <option value="Quiero comprar">Quiero comprar</option>
        </select>
        <br />
        <button onClick={this.handleSubmitModify}>Guardar</button>
        <button onClick={this.handleSubmitBack}>Volver</button>
      </div>
    );
  };

  //creamos el template de anuncio nuevo
  buildNew = () => {
    return (
      <div className="row">
        <h1>[[[Crear anuncio]]]</h1>
        <label>Nombre: </label>
        <input id="name" type="text" />
        <br />
        <label>Descripción: </label>
        <textarea id="description" type="text" />
        <br />
        <label>Estado: </label>
        <select>
          <option value="Quiero vender">Quiero vender</option>
          <option value="Quiero comprar">Quiero comprar</option>
        </select>
        <br />

        <button onClick={this.handleSubmitNew}>Guardar</button>
        <button onClick={this.handleSubmitBack}>Volver</button>
      </div>
    );
  };

  render() {
    if (!locStorage.checkIsNull()) {
      console.log("falta algun dato");
      this.props.history.push("/");
    }

    this.context = locStorage.checkLocalStorage(this.context);

    // const { name, surname, tag } = this.context;
    // console.log(`contexto de CreateAndUpdate: ${name} ${surname} ${tag}`);

    return (
      <div>
        {
          this.state.mode === "modify" 
          && 
          this.buildAdvert()
        }

        {
          this.state.mode === "new" 
          && 
          this.buildNew()
        }
      </div>
    );
  }
}

CreateAndUpdate.contextType = MainContext;
