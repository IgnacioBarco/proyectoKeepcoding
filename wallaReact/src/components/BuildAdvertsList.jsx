import React from "react";
import { Link } from "react-router-dom";

// react-bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const buildAdvertsList = ({
  _id,
  name,
  photo,
  description,
  sell,
  price,
  author,
  date,
  tags,
  reserved,
  sold,
  chat
}) => (
  <div key={_id}>
    <Card  style={{ width: "20rem" }}>
      <Card.Img variant="top" src={`http://18.222.10.183:8080${photo}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Descripción: {description}
          <br />
          {(sell && "Se vende") || "Se busca"}
          <br />
          Precio: {price}€
          <br />
        </Card.Text>
        <Link to={`/advert/${_id}`}>
          <Button variant="primary">Detalles</Button>
        </Link>
      </Card.Body>
    </Card>
  </div>
);

export default buildAdvertsList;
