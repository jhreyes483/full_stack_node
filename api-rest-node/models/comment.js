'use strict'

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var CommentSchema = Schema({
    content   : String,
    date      : String,
    user      : String,
})

module.exports = mongoose.model('Comment', CommentSchema)
// lowercase y pluraliza el nombre
// nombre de coleccion:  comments -> documentos con este (schema)