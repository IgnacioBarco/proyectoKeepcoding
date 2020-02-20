import React, {
  // Component,
  useState,
  // useEffect,
  useContext
  // useReducer
} from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
// import locStorage from "../services/LocalStorage";
// import api from "../services/wallaApi";
// import Advert from "../models/Advert";
import useFetch from "./useFetch";
import Paginator from "./Paginator";
import Header from "./Header";

// material-ui
import RangeSlider from "./RangeSlider";

// react-bootstrap
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
// import Pagination from "react-bootstrap/Pagination";

const buildAdvertsList =  ({
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
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={`http://localhost:8080${photo}`} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description} -{sell} -{price}€ -{author} -{date} -{tags} -
            {reserved} -{sold} -{chat}
            </Card.Text>
            <Link to={`/advert/${_id}`}>
              <Button variant="primary">Comprar</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );

 
export default buildAdvertsList;
