'use strict'

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2'); /* modulo de paginacion */

// Modelo de COMMENT
var CommentSchema = Schema({
    content  : String,
    date     : {type: Date, default : Date.now },
    user     : {type: Schema.ObjectId,  ref: 'User'}, // relacion con user

})

// Nodelo de TOPIC
var TopicSchema = Schema({
    title     : String,
    content   : String,
    code      : String,
    lang      : String,
    date      : {type: Date, default : Date.now },
    user      : {type: Schema.ObjectId,  ref: 'User'}, // relacion con user
    comments  : [CommentSchema],
});

// CARGAR PAGINACION
TopicSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Topic', TopicSchema)
// lowercase y pluraliza el nombre
// nombre de coleccion:  topics -> documentos con este (schema)