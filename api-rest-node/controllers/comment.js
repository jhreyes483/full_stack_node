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
                    msg   = 'No has comentado .'
                    
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

        // Conseguir el id que llega de la url 
        var commentId = req.params.commentId;
        var params    = req.body;
        var error     = false;
        var msg       = '';
        try{
            var validate_content = validator.isEmpty(params.comment);
        }catch(err){
            error = true;
            msg   = 'No has comentado'
        }
        if((!error) && validate_content){
            error = true;
            msg   = 'El comentario esta vacio'
        }
        if(error){
            return res.status(200).send({
                status: 'error',
                msg:msg
            })
        }
     
        if(!error) Topic.findOneAndUpdate(
            {'comments._id': commentId},
            {
                "$set": {
                    "comments.$.content" :params.comment
                }
            },
            {new: true},
            (err, topicUpdated) => {

                if(err){
                    error = true
                    msg   ='error en consulta update'
                }
                if(!topicUpdated){
                    error = true
                    msg   ='no existe el tema'
                }
                if(error){
                    return res.status(200).send({
                        status: 'error',
                        msg:msg
                    })
                }
                if(!error) return res.status(200).send({
                    status: 'success',
                    msg:'se actualizo',
                    topicUpdated
                })
                
            }
        )
    },
    delete: function(req, res){
        var error     = false;
        var msg       = '';
        var commentId = req.params.commentId; // cuando llega por get se almacena en params
        var topicId   = req.params.topicId;

        // buscar el topíc
        Topic.findById(topicId, (err, topic) =>{
   
            if(err){
                error = true
                msg   ='error en consulta update'
            }
            if(!topic){
                error = true
                msg   ='no existe el tema'
            }
            if(error){
                return res.status(200).send({
                    status: 'error',
                    msg:msg
                })
            }
            // Seleccionar el subdocumento (comentario)
            var comment = topic.comments.id(commentId);

            // Borrar el comentario
            if(comment){
                comment.remove();
                // Guardar el topic
                topic.save((err) =>{
                    if(err){
                        return res.status(404).send({
                            status: 'error',
                            msg:'error al gurdar tema',

                        })
                    }
                })
            }else{
                return res.status(404).send({
                    status: 'error',
                    msg:'no existe el comentario',
                })
            }

            return res.status(200).send({
                status: 'success',
                msg:'se elimino comentario',
                topic
            })

        });
    }
}

module.exports = controller;