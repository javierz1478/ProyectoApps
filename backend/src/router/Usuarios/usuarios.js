const pool = require('../../database');

async function obtenerUsuarios() {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        return result.rows;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw new Error('Error interno del servidor');
    }
}

async function añadirUsuario(nombre,apellido,email,contraseña){
    try {
        const result = await pool.query('INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, apellido, email, contraseña]);
        return result.rows;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw new Error('Error interno del servidor');
    }

}

async function obtenerUsuarioPorId(id) {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        return result.rows;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw new Error('Error interno del servidor');
    }
}

async function actualizarUsuario(id, nombre, apellido, contraseña, email) {
    try {
        const result = await pool.query('UPDATE usuarios SET nombre = $1, apellido = $2, email = $3, contraseña = $4 WHERE id = $5 RETURNING *', [nombre, apellido, email, contraseña, id]);
        return result.rows;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw new Error('Error interno del servidor');
    }
}

async function eliminarUsuario(id) {
    try {
        const result =await pool.query('DELETE FROM usuarios WHERE id = $1', [id ]);
        return result.rows;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw new Error('Error interno del servidor');
    }
}

async function verificarUsuario(email, contraseña) {
    try {
      const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND contraseña = $2', [email, contraseña]);
      return result.rows;
    } catch (error) {
      console.error("Error al verificar usuario:", error);
      throw new Error('Error interno del servidor');
    }
  }


module.exports = { obtenerUsuarios, actualizarUsuario, obtenerUsuarioPorId, añadirUsuario, eliminarUsuario , verificarUsuario};

