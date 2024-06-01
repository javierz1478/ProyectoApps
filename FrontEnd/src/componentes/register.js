import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

function Register() {
  const [formData, setFormData] = useState({ /* formData es el estado que almacena los 
  valores de los campos del formulario, y setFormData es la función que actualiza este estado.*/
    apellido: '',
    email: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  /*Esta función se llama cada vez que un campo del formulario cambia. Toma el evento (e) como 
  rgumento, extrae el id y value del campo del formulario que cambió, 
  y actualiza el estado formData con el nuevo valor correspondiente.*/ 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/usuarios', {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        contraseña: formData.contraseña,
      });
      console.log('Usuario añadido:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };
/* Esta función se llama cuando se envía el formulario. Primero, previene el comportamiento por defecto
 del formulario (recargar la página). Luego, intenta enviar una solicitud POST a la URL del backend con los 
 datos del formulario. Si la solicitud es exitosa,
 redirige al usuario a la página de inicio de sesión. Si ocurre un error, se muestra en la consola.*/


  return (
    <section className="background-section">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <Container className="h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col md={9} lg={7} xl={6}>
              <Card className="custom-card" style={{ borderRadius: '15px' }}>
                <Card.Body className="p-5">
                  <h2 className="text-uppercase text-center mb-5">Crea una cuenta</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="form-outline mb-4">
                      <FormControl
                        type="text"
                        id="nombre"
                        className="form-control form-control-lg"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="form-outline mb-4">
                      <FormControl
                        type="text"
                        id="apellido"
                        className="form-control form-control-lg"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="form-outline mb-4">
                      <FormControl
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="form-outline mb-4">
                      <FormControl
                        type="password"
                        id="contraseña"
                        className="form-control form-control-lg"
                        placeholder="Contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <div className="text-center mt-4">
                      <Button type="submit" className="btn btn-primary">Registrarse</Button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      ¡Ya tienes una cuenta?
                      <Link to="/" className="text-black-50 fw-bold">Inicia Sesión</Link>
                    </p>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default Register;
