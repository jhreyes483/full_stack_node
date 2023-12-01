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

// Reescribir rutasd

// Exportar modulo
module.exports = app;

