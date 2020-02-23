import React, { Component } from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
import api from "../services/wallaApi";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { withRouter } from "react-router-dom";

const { searchAdvert } = api();

class AdvertDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      regsNumber: 0,
      result: null
    };
  }

  loadAdvert = async () => {
    const id = this.props.match.params.id;

    const res = await searchAdvert(id);
    const { success, regsNumber, result } = res;
    // const advert = res.result;
    const advert = result;

    this.setState({
      success,
      regsNumber,
      result: advert[0]
    });
  };

  //cargamos los datos del anuncio
  UNSAFE_componentWillMount = () => {
    this.loadAdvert();
  };

  builButtons = () => {
    let comprar = "";

    if (this.context.token) {
      comprar = (
        <Link to="/comprar">
          <Button variant="primary">Ofertar</Button>
        </Link>
      );
    }

    return (
      <div>
        {comprar}
        <Link to="/adverts">
          <Button variant="primary">Volver</Button>
        </Link>
      </div>
    );
  };

  buildDetailAdvert = () => {
    const advert = this.state.result;
    const img = "http://18.222.10.183:8080/" + advert.photo;

    return (
      <div>
        <Card style={{ width: "40rem" }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{advert.name}</Card.Title>
            <Card.Text>
              Descripción: {advert.description}
              <br />
              Se vende: {advert.sell.toString()}
              <br />
              Precio: {advert.price}€
              <br />
              Autor: {advert.author}
              <br />
              Fecha: {advert.date}
              <br />
              tags: {advert.tags}
              <br />
              reservado: {advert.reserved.toString()}
              <br />
              Vendido: {advert.sold.toString()}
              <br />
              Chat: {advert.chat}
              <br />
            </Card.Text>

            {this.builButtons()}
          </Card.Body>
        </Card>
      </div>
    );
  };

  render() {
    console.log(this.state);

    return this.state.success === true ? (
      this.buildDetailAdvert()
    ) : (
      <div>No hay resultados</div>
    );
  }
}

AdvertDetail.contextType = MainContext;

export default withRouter(AdvertDetail);
