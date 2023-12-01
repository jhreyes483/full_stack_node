'use strict'

var controller = {
    probando: function(req, res){
        return res.status(200).send({
            menssage: "Soy el motodo probando"
        });
    },
    testeando: function(req, res){
        return res.status(200).send({
            menssage: "Soy el motodo TESTEANDO"
        });
    }
};


module.exports = controller;