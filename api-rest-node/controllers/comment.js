'use strict'

var Commnet     = require('../models/comment');
var Topic       = require('../models/topic');
var validator   = require('validator');

var controller = {

    add: function(req, res){
        var params   = req.body
        var topicId  = req.params.topicId
        var error    = false;
        var msg      = '';
        // Find por id del topic
        Topic.findById(topicId).exec((err, topic) => {
            if(err){
                error = true
                msg   ='error en consulta'
            }
            if(!topic){
                error = true
                msg   ='no hay tema asociado'
            }
            if(error){
                return res.status(200).send({
                    status: 'error',
                    msg    : msg
                });
            }

            console.log(topic,'topicl')

              // Comprobar el objeto y validar datos
            if(!error){
                try{
                    var validate_content = validator.isEmpty(params.comment);
                }catch(err){
                    error = true;
                    msg   = 'No has comentado 2'
                    
                }
                if(validate_content){
                    error = true;
                    msg   = 'El campo de comentario esta vacio'
                }
                
                if(error){
                    return res.status(200).send({
                        status: 'error',
                        msg    : msg
                    });
                }

                if(!error){
                    var comment = {
                        user    : req.user._id,
                        content : req.body.comment
                    }
           
                    topic.comments.push(comment); // agrega el comentario a este tema que co9nsulto

                    // Guardar el topic completo
                    topic.save((err) => {

                        if(err){
                            return res.status(500).send({
                                status: 'error',
                                msg    :'error al guardad el cometario'
                            })
                        }

                        return res.status(200).send({
                                status: 'success',
                                msg    : 'guardo',
                                topic
                            });
                        })
                }
            }
        })

    },
    update: function(req, res){
        return res.status(200).send({
            status: 'success',
            msg:'se actualizo comentario'
        })
    },
    delete: function(req, res){
        return res.status(200).send({
            status: 'success',
            msg:'se elimino comentario'
        })
    }
}

module.exports = controller;