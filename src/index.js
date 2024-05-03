import Koa from 'koa'
import bodyParser from 'koa-body'

import router from './router/index'

const app = new Koa()
const pool = require('./database');
const port = 3000

app.use(bodyParser({ multipart: true, urlencoded: true }))

app.use(router.routes())

app.use(async (ctx, next) => {
    try {
        // Realizar una consulta a la base de datos para forzar la conexión
        const res = await pool.query('SELECT NOW()');
        console.log("Conexión a la base de datos establecida correctamente");

        // Puedes realizar operaciones adicionales con la base de datos aquí si es necesario

        // Continuar con el siguiente middleware
        await next();
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

// Rutas de ejemplo
app.use(async (ctx) => {
    ctx.body = '¡Hola, mundo!';
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})