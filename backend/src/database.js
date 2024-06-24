const { Pool } = require('pg');

// Configuración de conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database',
    password: 'jambito2002', 
    port: 5432, 
});

// Exportar el pool de conexiones
module.exports = pool;