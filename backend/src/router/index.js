import Router from 'koa-router'
import getHealth from './health/health'
import { actualizarUsuario, añadirUsuario, eliminarUsuario, obtenerUsuarioPorId, obtenerUsuarios } from './Usuarios/usuarios';


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

export default router