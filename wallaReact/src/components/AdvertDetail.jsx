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
    console.log(result);
    const advert = res.result;

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

  buildDetailAdvert = () => {
    const advert = this.state.result;
    // const img = "http://localhost:8080/" + advert.photo;

    return (
      <div>
        <Card style={{ width: "40rem" }}>
          <Card.Img
            variant="top"
            src={`http://localhost:8080${advert.photo}`}
          />
          <Card.Body>
            <Card.Title>{advert.name}</Card.Title>
            <Card.Text>
              {advert._id}
              {advert.description} -{advert.sell} -{advert.price} -
              {advert.author}-{advert.date} -{advert.tags} -{advert.reserved} -
              {advert.sold} -{advert.chat}
              <Link to="/">Back</Link>
            </Card.Text>
            <Link to="/adverts">
              <Button variant="primary">volver</Button>
            </Link>
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
