import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="background-section">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="navbar-brand-custom" href="home">Padel Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Iniciar Sesion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="text-center">
          <Col md={6} className="d-flex justify-content-center">
            <div className="home-container  text-white">
            <Link to="/reservas" className="text-white"><h2>Reservar Cancha</h2></Link>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <div className="home-container  text-white">
            <Link to="/Torneos" className="text-white"><h2>Torneos y Más</h2></Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
