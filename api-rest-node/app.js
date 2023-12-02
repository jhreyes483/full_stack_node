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

// Middlewares

// CORS


// Reescribir rutas
app.use('/api', user_routes); //midelware
app.use('/api',topic_routes);














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

