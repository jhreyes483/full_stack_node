'use strict'
var validator = require('validator');
var Topic     = require('../models/topic');
const topic = require('../models/topic');

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
        topic.user    = req.user._id;


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
        if(req.params.page == null || req.params.page == undefined || req.params.page == false || req.params.page == '0'){
            var page = 1;
        }else{
            var page = parseInt( req.params.page );
        }
        // indicar la opciones de paginacion
        var options = {
            sort     : { date: -1},
            populate :  'user', // join con user
            limit    : 5,
            page     : page
        }



        // Find paginado
        Topic.paginate(
            {}, options, (err, topics) =>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    msg: 'error al hacer la consulta'
                })
            }
            if(!topics){
                return res.status(404).send({
                    status: 'error',
                    msg: 'no hay topics'
                })
            }


            // Devolver resultados (topics, total topics,  total de paginas)
            return res.status(200).send({
                status: 'success',
                msg: 'estos son los topics',
                topics: topics.docs,
                totalDocs: topics.totalDocs,
                totalPages: topics.totalPages,
                page
            })
        
        })

    },
    getTopicsByUser :function(req, res){
        // Conseguir el id del usuario
        var userId = req.params.user;
        var error = false;

        // hacer un faind con user de usuario
        Topic.find({
            user: userId,
        }).sort([['date', 'descending']])
        .exec((err, user) =>{
           
            if(err){
                error  = true;
                return res.status(500).send({
                    status: 'error',
                    msg: 'error al hacer la consulta'
                })
            }
            if(!user){
                error  = true;
                return res.status(404).send({
                    status: 'error',
                    msg: 'no existe topic'
                })
            }
            // devolver resultado
            if(!error) return res.status(200).send({
                status: 'success',
                msg: 'get my topics',
                user,
                error
            })
        })
    },
    getTopic : function(req, res){
        // sacar id de topic de url
        var topicId = req.params.id;
        var error = false;

        // hacer find por id del topic
        Topic.findById(topicId)
            .populate('user')  // join
            .exec((err,topic)=> {
                
                if(err || !topic){
                    error  = true;
                    return res.status(500).send({
                        status: 'error',
                        msg: 'error al hacer la consulta topic'
                    })
                }

                if(!error) return res.status(200).send({
                    status: 'success',
                    msg: 'get my topics',
                    topic
                })
            })
          
    },
    update: function(req, res){
        var topicId = req.params.id;

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

        var update = {
            title    : params.title,
            content  : params.content,
            code     : params.code,
            lang     : params.lang
        } 

        Topic.findOneAndUpdate({_id: topicId, user: req.user._id}, update, {new:true}, (err,topicUpdate)=>{
            if(err){
                return res.status(500).send({
                    status : 'error',
                    msg    : 'error al actualizar',
                    params
                });
            }

            if(!topicUpdate){
                return res.status(404).send({
                    status : 'error',
                    msg    : 'No se actualizado en tema',
                    params
                });
            }

            return res.status(200).send({
                status: 'success',
                msg: 'se actualizo este tema',
                topic: topicUpdate
            })
        });

    
    },
    delete: function(req, res){
        
        var params  = req.body;
        var topicId = req.params.id;

        Topic.findOneAndDelete({_id: topicId, user: req.user._id },(err, topicRemoved)=>{
            if(err || !topicRemoved){
                return res.status(500).send({
                    status : 'error',
                    msg    : 'No se ha borrado el tema'
                });
            }
            
            return res.status(200).send({
                status: 'success',
                msg: 'Se elimino tema',
                topicRemoved
            })
        })
      

      

    }
}

module.exports = controller;