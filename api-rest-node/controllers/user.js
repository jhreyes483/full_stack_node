'use strict'

var validator = require('validator');

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
    },
    save: function(req, res){
        // Recoger los parametros de la peticion
        var params = req.body;

        // Validar los datos
        var validate_name     = validator.isEmpty(params.name);
        var validate_surname  = validator.isEmpty(params.name);
        var validate_emial    = validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = validator.isEmpty(params.password);
        console.log(validate_name , validate_surname, validate_emial, validate_password);

        // Crear objeto de usuario

        // Asignar valores al usuario

        // Comprobar si el usuario ya existe 

        // Si no existe, cifrar la contraseña y guradarlo

        //Devovler una respuesta

        return res.status(200).send({
            message: "Registro de usuarios",
            params

        });
    }

};


module.exports = controller;