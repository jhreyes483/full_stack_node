'use strict'


// Requires express
var express    = require('express');
var bodyParser = require('body-parser');

// Ejecutar express
var app = express();
// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Ejectar archivos de rutas

// Middlewares

// CORS

// Reescribir rutas
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

