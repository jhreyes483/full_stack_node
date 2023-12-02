'use strict'


var controller = {
    test: function(req, res){
        return res.status(200).send({
            msg: 'Hola'
        })
    }
}

module.exports = controller;