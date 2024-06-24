import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Inicio from './componentes/header';
import Registro from './componentes/register';
import Home from './componentes/Home';
import Reserva from './componentes/reservas';
import Torneos from './componentes/torneos';
import Confirmacion from './componentes/confirmacion';
import Usuarios from './componentes/usuarios';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservas" element={<Reserva />} />
        <Route path="/Torneos" element={<Torneos />} />
        <Route path="reservas/Confirmacion_Hora" element={<Confirmacion />} />
        <Route path="/us" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}

export default App;
