import React, { useContext, useState, useEffect } from "react";
import MainContext from "../services/MainContext";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
// import { Link } from "react-router-dom";

const Header = () => {
  const context = useContext(MainContext);
  const [email, setEmail] = useState("pepe");
  
  
  console.log("contexto header" + context.token);
  
  useEffect(()=>{
    setEmail(context.email)
    console.log("contexto header useEfect" + context.token)
  },[])
  
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">WallaKeep</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">{email}</Nav.Link>
        <Nav.Link href="#features">{context.email}</Nav.Link>
        <Nav.Link href="/register">Registrate</Nav.Link>
      </Nav>
      <Form inline>
        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
        <Button variant="outline-info">
          {context.token ? "Cerrar Sesión" : "Iniciar sesión"}
        </Button>

      </Form>
    </Navbar>
  );
};
export default Header;
  