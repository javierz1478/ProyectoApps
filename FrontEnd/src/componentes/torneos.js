// Torneos.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './torneos.css';

function Torneos() {
  return (
    <div className="background-section">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="navbar-brand-custom" as={Link} to="/home">Padel Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/reservas">Reservar Cancha</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="text-center w-100">
          <Col md={12} className="d-flex justify-content-center mb-4">
            <div className="tournament-box bg-primary text-white">
              <h2>Torneo Categoria D Damas</h2>
            </div>
          </Col>
          <Col md={12} className="d-flex justify-content-center mb-4">
            <div className="tournament-box bg-success text-white">
              <h2>Torneo Categoria 5ta Varones</h2>
            </div>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <div className="tournament-box bg-warning text-dark">
              <h2>Más</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Torneos;
