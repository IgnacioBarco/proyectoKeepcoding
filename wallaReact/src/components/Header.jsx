import React, { useContext, useState, useEffect } from "react";
import MainContext from "../services/MainContext";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
// import { Link } from "react-router-dom";

const Header = () => {
  const context = useContext(MainContext);
  const [email, setEmail] = useState("aaaa");
  const [token, setToken] = useState("aaaa");

  console.log("contexto header" + context.token);

  useEffect(() => {
    // if(this.props.email) setEmail(this.props.email)
    console.log("contexto header useEfect" + context.token);
    setEmail(context.email)
    setToken(context.token)
  }, [email]);

  const hasToken = email

  return (
    <div>
      {hasToken ? (
        <Navbar bg="dark" variant="dark" >
          <Navbar.Brand href="">WallaKeep</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Mis anuncios</Nav.Link>
            <Nav.Link href="#features">Mis ofertas</Nav.Link>
            <Nav.Link href="/register">Mis chats</Nav.Link>
          </Nav>
          <Form inline>
            <Button variant="outline-info">
              <Nav.Link href="/login">LogOut</Nav.Link>
            </Button>
          </Form>
        </Navbar >

      ) : (
        
          <Navbar bg="dark" variant="dark" >
            <Navbar.Brand href="">WallaKeep</Navbar.Brand>
          </Navbar >

        )
      }
    </div>
  );
}

export default Header;

