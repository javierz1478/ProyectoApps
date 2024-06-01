import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container,  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './confirmacion.css';

function ConfirmarHora() {
  return (
    <div className="background-section">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="navbar-brand-custom" as={Link} to="/home">Padel Planner</Navbar.Brand>
          
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="confirmation-box p-5">
          <h1 className="text-center mb-4">Confirmar Hora</h1>
          <ul className="list-unstyled">
            <li><strong>Día:</strong> Lunes</li>
            <li><strong>Hora:</strong> 10:00</li>
            <li><strong>Número de Cancha:</strong> 5</li>
            <li><strong>Persona que Reserva:</strong> Juan Pérez</li>
          </ul>
          <div className="text-center mt-4">
            <Link to="/reservas" className="btn btn-danger me-2"><i className="fas fa-times"></i> Cancelar</Link>
            <Link to="/reservas" className="btn btn-success"><i className="fas fa-check"></i> Confirmar</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ConfirmarHora;
