const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Cambia esto por una clave secreta segura

// Función para generar un token
function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
}

// Función para verificar un token
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.error('Error al verificar el token:', error);
        throw error;
    }
}

async function authMiddleware(ctx, next) {
    const token = ctx.headers.authorization && ctx.headers.authorization.split(' ')[1];
    if (!token) {
        ctx.status = 401;
        ctx.body = { error: 'Token no proporcionado' };
        return;
    }

    try {
        const decoded = verifyToken(token);
        ctx.state.user = decoded; // Agrega la información del usuario al contexto
        await next();
    } catch (error) {
        ctx.status = 401;
        ctx.body = { error: 'Token inválido' };
    }
}

module.exports = {
    generateToken,
    verifyToken,
    authMiddleware
};
