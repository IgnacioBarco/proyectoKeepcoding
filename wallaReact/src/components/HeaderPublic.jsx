import React, { useContext, useState, useEffect } from "react";
import MainContext from "../services/MainContext";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
// import { Link } from "react-router-dom";

const HeaderPublic = props => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="">WallaKeep</Navbar.Brand>
    </Navbar>
  );
};
export default HeaderPublic;
