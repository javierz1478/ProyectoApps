import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './confirmacion.css';

function ConfirmarHora() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dia, bloque } = location.state || { dia: '', bloque: '' };

  const bloques = [
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

  const confirmarReserva = async () => {
    try {
      const response = await axios.post('http://localhost:3000/disponibilidad_canchas', {
        dia,
        bloque
      });
      if (response.data.success) {
        alert(`Reserva confirmada para ${dia}, ${bloques[bloque - 1]}`);
        navigate('/reservas');
      } else {
        alert('No se pudo confirmar la reserva. Inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error al confirmar la reserva:', error);
      alert('No hay disponibilidad para este bloque y día.');
    }
  };

  return (
    <div className="background-section">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">Padel Planner</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="confirmation-box p-5">
          <h1 className="text-center mb-4">Confirmar Hora</h1>
          <ul className="list-unstyled">
            <li><strong>Usuario:</strong>Jambito</li>
            <li><strong>Día:</strong> {dia}</li>
            <li><strong>Hora:</strong> {bloques[bloque - 1]}</li>
          </ul>
          <div className="text-center mt-4">
            <Link to="/reservas" className="btn btn-danger me-2"><i className="fas fa-times"></i> Cancelar</Link>
            <button className="btn btn-success" onClick={confirmarReserva}><i className="fas fa-check"></i> Confirmar</button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ConfirmarHora;
