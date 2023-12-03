'use strict'


// Requires express
var express    = require('express');
var bodyParser = require('body-parser');

// Ejecutar express
var app = express();
// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cargar archivos de rutas
var user_routes  = require('./routes/user')
var topic_routes = require('./routes/topic')
var comment_routes = require('./routes/comment')

// Middlewares

// CORS
// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});
/******************** */


// Reescribir rutas
app.use('/api', user_routes); //midelware
app.use('/api',topic_routes);
app.use('/api',comment_routes);














/*****************  pruebas ********************************* */
//Ruta de prueba
app.post('/prueba',(req, res)=>{
    return res.status(200).send({
        message: 'Hola mundo desde el backend node POST'
    })
})

app.get('/prueba',(req, res)=>{
    return res.status(200).send({
        message: 'Hola mundo desde el backend node GTE'
    })
})

// Exportar modulo
module.exports = app;

