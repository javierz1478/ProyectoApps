import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './reservas.css';
import axios from 'axios';

function Reservas() {
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [seleccion, setSeleccion] = useState({ dia: '', bloque: '' });
  const navigate = useNavigate();

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
    'Bloque 10: 22:30 - 00:00',
  ];

  const daysOfWeek = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

  useEffect(() => {
    fetchDisponibilidad();
  }, []);

  const fetchDisponibilidad = async () => {
    try {
      const response = await axios.get('http://localhost:3000/disponibilidad_canchas');
      setDisponibilidad(response.data);
    } catch (error) {
      console.error('Error al obtener disponibilidad:', error);
    }
  };

  const handleSeleccion = (day, hourIndex) => {
    setSeleccion({ dia: day, bloque: hourIndex + 1 });
  };

  const reservarCancha = () => {
    if (seleccion.dia && seleccion.bloque) {
      navigate('Confirmacion_Hora', { state: seleccion });
    } else {
      alert('Por favor, selecciona un día y un bloque horario.');
    }
  };

  const obtenerCanchasDisponibles = (dia, bloque) => {
    const dayData = disponibilidad.find(item => item.dia_semana.toLowerCase() === dia.toLowerCase());
    return dayData ? dayData[`bloque_${bloque}`] : 0;
  };

  return (
    <div className="reservas-background">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">Padel Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/torneos">Torneos y más</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h2 className="text-center">Horario Disponible</h2>
        <Table striped bordered hover responsive className="reservas-table">
          <thead>
            <tr>
              <th>Hora</th>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, hourIndex) => (
              <tr key={hourIndex}>
                <td>{hour}</td>
                {daysOfWeek.map((day, dayIndex) => (
                  <td 
                    key={`${hourIndex}-${dayIndex}`} 
                    className={seleccion.dia === day && seleccion.bloque === hourIndex + 1 ? 'selected' : ''}
                    onClick={() => handleSeleccion(day, hourIndex)}
                  >
                    {obtenerCanchasDisponibles(day, hourIndex + 1)} canchas disponibles
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={reservarCancha}>Reservar Cancha</button>
        </div>
      </Container>
    </div>
  );
}

export default Reservas;
