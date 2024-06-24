import Router from 'koa-router'
import getHealth from './health/health'
import {
    createUsuario,
    getUsuarioById,
    getAllUsuarios,
    updateUsuario,
    deleteUsuario,
    verificarContraseña} from './Usuarios/usuarios';

const jwt = require('jsonwebtoken');
const router = new Router();
const secretKey = 'secret'

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

router.post('/verificarUsuario', async (ctx) => {
    const { email, contraseña } = ctx.request.body;
    try {
      const user = await verificarContraseña(email, contraseña);
      if (user) {
        // Generar token JWT
        const token = jwt.sign({ userId: user.id }, secretKey);
  
        // Establecer cookie con el token
        ctx.cookies.set('token', token, { httpOnly: true });
  
        ctx.status = 200;
        ctx.body = { message: 'Inicio de sesión exitoso' };
      } else {
        ctx.status = 401;
        ctx.body = { error: 'Credenciales incorrectas' };
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      ctx.status = 500;
      ctx.body = { error: 'Error interno del servidor' };
    }
  });

  router.get('/profile', async (ctx) => {
    const token = ctx.cookies.get('token');
    if (!token) {
      ctx.status = 401;
      ctx.body = { error: 'No autorizado' };
      return;
    }
  
    try {
      const decoded = await jwt.verify(token, secretKey);
      const userId = decoded.userId;
  
      const result = await getUsuarioById(userId);
      const user = result;
  
      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'Usuario no encontrado' };
        return;
      }
      ctx.status = 200;
      ctx.body = {message: 'Usuario: ' ,user};
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      ctx.status = 500;
      ctx.body = { error: 'Error interno del servidor' };
    }
  });


export default router