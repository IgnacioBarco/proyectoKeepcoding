import React, { useContext, useState, useEffect } from "react";
import MainContext from "../services/MainContext";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
// import { Link, NavLink } from "react-router-dom";

const Header = props => {
  const context = useContext(MainContext);
  const hasToken = context.token;

  return (
    <div>
      {props.token || hasToken ? (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="">WallaKeep</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Mis anuncios</Nav.Link>
            <Nav.Link href="#features">Mis ofertas</Nav.Link>
            <Nav.Link href="/register">Mis chats</Nav.Link>
          </Nav>
          <Form inline>
            <Nav.Link href="/register"> {context.email}</Nav.Link>
            <Button variant="outline-info" onClick={() => context.setToken("")}>
              <Nav.Link href="/login">LogOut</Nav.Link>
            </Button>
          </Form>
        </Navbar>
      ) : (
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="">WallaKeep</Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <Button variant="outline-info" disabled>
                <Nav.Link href="/login">LogIn</Nav.Link>
              </Button>
            </Form>)
          </Navbar>
        )
      }
    </div >
  );
};

export default Header;
