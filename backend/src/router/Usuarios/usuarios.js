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



//FUNCIONES PARA CANCHAS


async function obtenerDisponibilidadCanchas() {
    try {
      // Consulta para contar las canchas disponibles por día y bloque horario
      const query = `
        SELECT dia_semana,
               SUM(bloque_1::int) as bloque_1,
               SUM(bloque_2::int) as bloque_2,
               SUM(bloque_3::int) as bloque_3,
               SUM(bloque_4::int) as bloque_4,
               SUM(bloque_5::int) as bloque_5,
               SUM(bloque_6::int) as bloque_6,
               SUM(bloque_7::int) as bloque_7,
               SUM(bloque_8::int) as bloque_8,
               SUM(bloque_9::int) as bloque_9,
               SUM(bloque_10::int) as bloque_10
        FROM disponibilidad_canchas
        GROUP BY dia_semana
      `;
  
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error al obtener disponibilidad de canchas:", error);
      throw new Error('Error interno del servidor');
    }
  }


  async function actualizarDisponibilidadCancha(dia, bloque) {
    const bloqueHorario = `bloque_${bloque}`;
    try {
        const result = await pool.query(`
            UPDATE disponibilidad_canchas
            SET ${bloqueHorario} = false
            WHERE id = (
                SELECT id
                FROM disponibilidad_canchas
                WHERE dia_semana = $1 AND ${bloqueHorario} = true
                LIMIT 1
                FOR UPDATE SKIP LOCKED
            )
            RETURNING id;
        `, [dia]);

        if (result.rowCount === 0) {
            throw new Error('No hay disponibilidad para este bloque y día');
        }

        return { success: true, message: 'Reserva confirmada', id: result.rows[0].id };
    } catch (error) {
        console.error("Error al actualizar disponibilidad de cancha:", error);
        throw new Error('Error interno del servidor');
    }
}


  
  



module.exports = {actualizarDisponibilidadCancha, obtenerDisponibilidadCanchas,obtenerUsuarios, actualizarUsuario, obtenerUsuarioPorId, añadirUsuario, eliminarUsuario , verificarUsuario};

