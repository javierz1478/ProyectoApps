//endpoint para modificar cancha
//endpoint para obtener disponibilidad
//endpoint para añadir nueva cancha

async function nuevaCancha(){
    try {
        const result = await pool.query('INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, apellido, email, contraseña]);
        return result.rows;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw new Error('Error interno del servidor');
    }

}