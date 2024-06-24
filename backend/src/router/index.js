import Router from 'koa-router'
import getHealth from './health/health'
import {actualizarDisponibilidadCancha,obtenerDisponibilidadCanchas , actualizarUsuario, añadirUsuario, eliminarUsuario, obtenerUsuarioPorId, obtenerUsuario, verificarUsuario } from './Usuarios/usuarios';


const router = new Router()
//const pool = require('../database');

router.get('/health', getHealth)

router.get('/usuarios', async (ctx) => {
    try {
        const usuarios = await obtenerUsuarios();
        ctx.body = usuarios;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.post('/usuarios', async (ctx) => {
    const { nombre, apellido, email, contraseña } = ctx.request.body;
    try {
        const result = await añadirUsuario(nombre,apellido,email,contraseña);
        ctx.body = result[0];
    } catch (error) {
        console.error("Error al crear usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.get('/usuarios/:id', async (ctx) => {
    const id = parseInt(ctx.params.id);
    try {
        const result = await obtenerUsuarioPorId(id);
        ctx.body = result[0];
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.put('/usuarios/:id', async (ctx) => {
    const id = parseInt(ctx.params.id);
    const { nombre, apellido, email, contraseña } = ctx.request.body;
    try {
        const result = await actualizarUsuario(id, nombre, apellido, contraseña, email);
        ctx.body = result[0];
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.delete('/usuarios/:id', async (ctx) => {
    const id = parseInt(ctx.params.id);
    try {
        eliminarUsuario(id)
        ctx.status = 204; 
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.post('/verificarUsuario', async (ctx) => {
    const { email, contraseña } = ctx.request.body;
    try {
      const usuario = await verificarUsuario(email, contraseña);
      if (usuario.length > 0) {
        ctx.status = 200;
        ctx.body = usuario;
      } else {
        ctx.status = 404;
        ctx.body = { message: 'Usuario no encontrado' };
      }
    } catch (error) {
      console.error("Error en el endpoint verificarUsuario:", error); // Asegúrate de registrar el error aquí también
      ctx.status = 500;
      ctx.body = { message: 'Error interno del servidor' };
    }
  });



//ENDPOINTS PARA CANCHAS

router.get('/disponibilidad_canchas', async (ctx) => {
    try {
      const disponibilidad = await obtenerDisponibilidadCanchas();
      ctx.body = disponibilidad;
    } catch (error) {
      console.error("Error al obtener disponibilidad de canchas:", error);
      ctx.status = 500;
      ctx.body = { error: 'Error interno del servidor' };
    }
  });


  router.post('/disponibilidad_canchas', async (ctx) => {
    try {
        const { dia, bloque } = ctx.request.body;
        const resultado = await actualizarDisponibilidadCancha(dia, bloque);
        ctx.body = resultado;
    } catch (error) {
        console.error("Error al confirmar reserva:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});
  
  
export default router