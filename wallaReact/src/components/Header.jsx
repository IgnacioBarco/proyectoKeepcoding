import React, { useContext } from "react";
import MainContext from "../services/MainContext";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

const Header = props => {
  const context = useContext(MainContext);
  const hasToken = context.token;

  return (
    <div>
      {props.token || hasToken ? (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/adverts">WallaKeepPrivate</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/myads">Mis anuncios</Nav.Link>
            <Nav.Link href="/myoffers">Mis ofertas</Nav.Link>
            <Nav.Link href="/mychats">Mis chats</Nav.Link>
          </Nav>
          <Form inline>
            <Nav.Link href="/myProfile">{context.name}</Nav.Link>
            <Button
              variant="outline-info"
              onClick={() => {
                context.resetValues();
              }}
            >
              <Nav.Link href="/login">LogOut</Nav.Link>
            </Button>
          </Form>
        </Navbar>
      ) : (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/adverts">WallaKeep</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <Button variant="outline-info">
              <Nav.Link href="/login">LogIn</Nav.Link>
            </Button>
          </Form>
        </Navbar>
      )}
    </div>
  );
};

export default Header;
