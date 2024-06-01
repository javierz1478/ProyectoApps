import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button } from 'react-bootstrap';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './header.css';

function Login() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setContraseña(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/verificarUsuario', { email, contraseña });
      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Usuario no encontrado. Por favor, verifica tus credenciales.');
      } else {
        setError('Ocurrió un error. Por favor, intenta de nuevo más tarde.');
      }
    }
  };

  return (
    <section className="background-section">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <Card className="custom-card">
              <Card.Body className="p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Inicia Sesión</h2>
                  <p className="text-white-50 mb-5">Por favor, ingresa tu usuario y contraseña!</p>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-outline form-white mb-4">
                      <Form.Control
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </Form.Group>

                    <Form.Group className="form-outline form-white mb-4">
                      <Form.Control
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={handlePasswordChange}
                      />
                    </Form.Group>

                    {error && <p className="text-danger">{error}</p>}

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">¿Olvidaste tu contraseña?</a>
                    </p>

                    <div className="text-center mt-4">
                      <Button type="submit" className="btn btn-primary">Inicia Sesión</Button>
                    </div>
                  </Form>
                </div>

                <div>
                  <p className="mb-0">
                    ¿No tienes una cuenta? <Link to="/register" className="text-white-50 fw-bold">Regístrate</Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
