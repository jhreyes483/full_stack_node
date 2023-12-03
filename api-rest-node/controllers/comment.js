'use strict'

var controller = {
    add: function(req, res){
        return res.status(200).send({
            status: 'success',
            msg:'se agrego comentario'
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