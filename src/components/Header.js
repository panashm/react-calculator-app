import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap";


const Header = () => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#">Forex Calculator</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="https://github.com/panashm/react-calculator-app" target="_blank">Github</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <br/><br/><br/><br/>
    </div>
  )
}

export default Header