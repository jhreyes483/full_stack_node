'use strict'

var mongoose = require('mongoose');
var Schema    = mongoose.Schema;

var UseSchema = Schema({
    name      : String,
    surname   : String,
    email     : String,
    password  : String,
    image     : String,
    role      : String
})

module.exports = mongoose.model('User', UseSchema)
// lowercase y pluraliza el nombre
// nombre de coleccion:  users -> documentos con este (schema)

