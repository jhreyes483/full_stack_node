'use strict'

var mongooser = require('mongoose');
var Schema    = mongoose.Scherma;

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
})

module.exports = mongoose.model('Topic', TopicSchema)
// lowercase y pluraliza el nombre
// nombre de coleccion:  topics -> documentos con este (schema)