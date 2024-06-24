import Koa from 'koa'
import bodyParser from 'koa-body'

import router from './router/index'

const koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const cors = require('koa-cors');
const serve = require("koa-static");
const mount = require("koa-mount");
const HttpStatus = require("http-status");

//app.use(serve(path.join(__dirname, 'frontend/build')));

const app = new koa();  

const pool = require('./database');
const port = 3000

app.use(cors({
    origin: 'http://localhost:3001', // Ajusta esto según el origen de tu cliente
    credentials: true // Permitir el uso de cookies
  }));

app.use(BodyParser({ multipart: true, urlencoded: true }))
app.use(Logger());
app.use(router.routes())

app.use(async (ctx, next) => {
    try {
        // Realizar una consulta a la base de datos para forzar la conexión
        const res = await pool.query('SELECT NOW()');
        console.log("Conexión a la base de datos establecida correctamente");

        await next();
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        ctx.status = 500;
        ctx.body = { error: 'Error interno del servidor' };
    }
});

app.use(async (ctx) => {
    ctx.body = '¡Hola, mundo!';
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})