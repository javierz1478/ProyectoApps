import Router from 'koa-router'
import getHealth from './health/health'
import {
    createUsuario,
    getUsuarioById,
    getAllUsuarios,
    updateUsuario,
    deleteUsuario } from './Usuarios/usuarios';


const router = new Router()

router.get('/health', getHealth)
router.get('/usuarios', async (ctx) => {
    try {
        const usuarios = await getAllUsuarios();
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
        const usuario = await createUsuario({ nombre, apellido, email, contraseña });
        ctx.status = 201; // Código de estado para creación exitosa
        ctx.body = usuario;
    } catch (error) {
        console.error("Error al crear usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.get('/usuarios/:id', async (ctx) => {
    const id = parseInt(ctx.params.id);
    try {
        const usuario = await getUsuarioById(id);
        if (usuario) {
            ctx.body = usuario;
        } else {
            ctx.status = 404; // No encontrado
            ctx.body = { error: 'Usuario no encontrado' };
        }
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
        const usuario = await updateUsuario(id, { nombre, apellido, email, contraseña });
        if (usuario) {
            ctx.body = usuario;
            ctx.status = 200;
        } else {
            ctx.status = 404; // No encontrado
            ctx.body = { error: 'Usuario no encontrado' };
        }
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

router.delete('/usuarios/:id', async (ctx) => {
    const id = parseInt(ctx.params.id);
    try {
        const usuarioEliminado = await deleteUsuario(id);
        if (usuarioEliminado) {
            ctx.status = 204; // Sin contenido, eliminación exitosa
        } else {
            ctx.status = 404; // No encontrado
            ctx.body = { error: 'Usuario no encontrado' };
        }
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

export default router