import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './reservas.css';

function reservas() {
  const hours = [
    'Bloque 1: 09:00 - 10:30',
    'Bloque 2: 10:30 - 12:00',
    'Bloque 3: 12:00 - 13:30',
    'Bloque 4: 13:30 - 15:00',
    'Bloque 5: 15:00 - 16:30',
    'Bloque 6: 16:30 - 18:00',
    'Bloque 7: 18:00 - 19:30',
    'Bloque 8: 19:30 - 21:00',
    'Bloque 9: 21:00 - 22:30',
  ];
  

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="reservas-background">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="navbar-brand-custom" as={Link} to="/home">Padel Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/Torneos">Torneos y mas</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container className="mt-4">
        <h2 className="text-center text-white">Horario Disponible</h2>
        <Table striped bordered hover responsive className="reservas-table">
          <thead>
            <tr>
              <th>Hora</th>
              {daysOfWeek.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map(hour => (
              <tr key={hour}>
                <td>{hour}</td>
                {daysOfWeek.map(day => (
                  <td key={day}>{/* Aquí puedes agregar la lógica para mostrar disponibilidad */}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
          <div className="text-center mt-4">
            <Link to="/Confirmacion_hora" className="btn btn-primary">Consultar Disponibilidad</Link>
          </div>
      </Container>
    </div>
  );
}

export default reservas;
