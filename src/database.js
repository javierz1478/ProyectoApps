const { Pool } = require('pg');

// Configuración de conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Usuarios',
    password: '1478', 
    port: 5432, // El puerto predeterminado de PostgreSQL es 5432
});

// Exportar el pool de conexiones
module.exports = pool;