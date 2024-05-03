import Router from 'koa-router'
import getHealth from './health/health'


const router = new Router()
const pool = require('../database');

router.get('/health', getHealth)

router.get('/usuarios', async (ctx) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        ctx.body = result.rows;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.post('/usuarios', async (ctx) => {
    const { nombre, apellido, email, contraseña } = ctx.request.body;
    try {
        const result = await pool.query('INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, apellido, email, contraseña]);
        ctx.body = result.rows[0];
    } catch (error) {
        console.error("Error al crear usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.get('/usuarios/:id', async (ctx) => {
    const id = parseInt(ctx.params.id);
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        ctx.body = result.rows[0];
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
        const result = await pool.query('UPDATE usuarios SET nombre = $1, apellido = $2, email = $3, contraseña = $4 WHERE id = $5 RETURNING *', [nombre, apellido, email, contraseña, id]);
        ctx.body = result.rows[0];
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.delete('/usuarios/:id', async (ctx) => {
    const id = parseInt(ctx.params.id);
    try {
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        ctx.status = 204; // No content
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});




export default router