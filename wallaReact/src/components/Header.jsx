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
          <Navbar.Brand
            onClick={() => {
              context.setUrl(
                "http://18.222.10.183:8080/public/ads?sold=false&limit=4"
              );
              context.setAdStart(parseInt(0));
            }}
            href="/adverts"
          >
            WallaKeepPrivate
          </Navbar.Brand>
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
          <Navbar.Brand
            onClick={() =>
              context.setUrl(
                "http://18.222.10.183:8080/public/ads?sold=false&limit=4"
              )
            }
            href="/adverts"
          >
            WallaKeep
          </Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          {context.url === "http://18.222.10.183:3000/login" || context === "" ? (
            <div></div>
          ) : (
            <Form inline>
              <Button variant="outline-info">
                <Nav.Link onClick={() => context.resetValues()} href="/login">
                  LogIn
                </Nav.Link>
              </Button>
            </Form>
          )}
        </Navbar>
      )}
    </div>
  );
};

export default Header;
