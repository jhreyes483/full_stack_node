'use strict'
var validator = require('validator');
var Topic     = require('../models/topic');

var controller = {
    test: function(req, res){
        return res.status(200).send({
            msg: 'Hola'
        })
    },

    save: function(req, res){
        // Recoger parametros por post
        var params = req.body;
        var error  = false;
        var msg    = '';
        // validar datos
        try{
           var validate_title   = validator.isEmpty(params.title);
           var validate_content = validator.isEmpty(params.content);
           var validate_lang    = validator.isEmpty(params.lang);
        }catch(err){
            error =true;
            msg = 'Faltan campos por enviar'
        }
        if(validate_title){
            error = true;
            msg   = 'El titulo no es valido';
        }
        if(validate_content){
            error = true;
            msg   = 'El content esta vacio';
        }
        if(validate_lang){
            error = true;
            msg   = 'El lang esta vacio';
        }
        if(error){
            return res.status(200).send({
                status : 'error',
                msg    : "parametro incorrecto "+ msg,
                params
            });
        }

        var topic     = new Topic();
        topic.title   = params.title;
        topic.content = params.content;
        topic.lang    = params.lang;


        // Guardar el topic
        if(!error) topic.save((err, topicStored) =>{
            if(err || !topicStored){
                error = true;
                return res.status(200).send({
                    status : 'error',
                    msg    : "no se ha guardado tema",
                    params
                });
            }
            if(topicStored){
                 return res.status(200).send({
                    status: 'success',
                    msg:'ha guardado tema'
                })
            }
        })
    },
    getTopics: function(req, res){
        // cargar la libreria paginacion
        // Recoger la pagina actual
        // indicar la opciones de paginacion
        // Find paginado
        // Devolver resultados (topics, total topics,  total de paginas)



        return res.status(200).send({
            status: 'success',
            msg: 'estos son los topics'
        })
    }
}

module.exports = controller;