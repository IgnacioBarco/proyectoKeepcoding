import React, { Component } from "react";
import MainContext from "../services/MainContext";
import locStorage from "../services/LocalStorage";
import api from "../services/NodePopDBService";
import { withRouter } from "react-router-dom";

const { searchAdvert } = api();

class AdvertDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      result: {}
    };
  }

  //cargamos los datos del anuncio
  UNSAFE_componentWillMount = () => {
    this.loadAdvert();
  };

  loadAdvert = async () => {
    const id = this.props.match.params.id;
    const data = await searchAdvert(id);

    const { success, result } = data;

    this.setState({
      success,
      result
    });
  };

  //construimos el html del anuncio
  buildDetailAdvert = () => {
    const advert = this.state.result;
    const img = "http://localhost:3001/" + advert.photo;

    return (
      <div className="row">
        <h1>{advert.name}</h1>
        <img src={img} alt={advert.description} />
        <h2>Precio: {advert.price}€</h2>
        <h2>Descripción: {advert.name}</h2>
        <h3>Estado: {advert.type === "buy" ? "se compra" : "se vende"}</h3>
        <h3>Creado el {advert.createdAt}</h3>
        <h3>Actualizado el {advert.updatedAt}</h3>
      </div>
    );
  };

  handleSubmitBack = event => {
    event.preventDefault();
    this.props.history.push("/adverts");
  };

  handleSubmitModify = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    this.props.history.push("/modify/" + id);
  };

  render() {
    if (!locStorage.checkIsNull()) {
      this.props.history.push("/");
    }

    this.context = locStorage.checkLocalStorage(this.context);

    return (
      <div>
        {
          this.state.success === true 
          && 
          this.buildDetailAdvert()
        }

        <button onClick={this.handleSubmitBack}>Volver</button>
        <button onClick={this.handleSubmitModify}>Modificar</button>
      </div>
    );
  }
}

AdvertDetail.contextType = MainContext;

export default withRouter(AdvertDetail);
