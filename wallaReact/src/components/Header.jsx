import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

const Header = () => {
  
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">WallaKeep</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Perfil</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="/login">Inicia Sesión</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  );
};
export default Header;
