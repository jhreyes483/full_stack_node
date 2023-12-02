'use strict'

var validator = require('validator');
var bcrypt    = require('bcrypt-nodejs')

var User      = require('../models/user');
var jwt       = require('../services/jwt');

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

        var error = false;
        var msg   = '';
        // Validar los datos
        var validate_name     = validator.isEmpty(params.name);
        var validate_surname  = validator.isEmpty(params.surname);
        var validate_emial    = (validator.isEmpty(params.email) || !validator.isEmail(params.email));
        var validate_password = validator.isEmpty(params.password);
        //console.log(validate_name , validate_surname, validate_emial, validate_password);
        if(validate_name){
            error = true 
            msg   = 'el name esta vacio'
        }
        if(validate_surname){
            error = true
            msg   = 'el surname esta vacio'
        }
        if(validate_emial){
            error = true
            msg   = 'el email es invalido'
        }
        if(validate_password ){
            error = true
            msg   = 'la password es invalido'
        }
        if( error ){
            return res.status(200).send({
                status : 'error',
                msg    : "parametro incorrecto "+ msg,
                params
            });
        }
        // Crear objeto de usuario
        var user = new User();

        // Asignar valores al usuario
        user.name    = params.name;
        user.surname = params.surname;
        user.email   = params.email.toLowerCase();
        user.password= params.password;
        user.role    = 'ROLE_USER';
        user.image   = null;

        // Comprobar si el usuario ya existe 
        User.findOne({email: user.email}, (err, issetUser) =>{    
            console.log('recarag---')
    
            if(err) {
                return res.status(500).send({
                    status : 'error',
                    msg    : "Error al comprobar duplicidad de usuario",
                    params
                });
            } 

            if(issetUser){ // ya se habia registrado
                return res.status(400).send({
                    status : 'error',
                    msg    : "El usuario ya se habia restrado",
                    params
                });
            }
            
            if(!issetUser){
                bcrypt.hash(params.password, null,null,(err, hash) =>{
                    user.password = hash; // encripta la contraseña
                    user.save((err,userStored) =>{
                        if(err) {
                            return res.status(500).send({
                                status : 'error',
                                message: "Error al guardar el usuario",
                                params
                            });
                        } 
                        if(userStored){ // Devolver respuesta ok
                            user.password = undefined
                            return res.status(200).send({
                                status: 'success',
                                msg: 'usuario creado',
                                user: userStored
                            })
                        }

                    }) // close save 
                }); // close bcrypt
            }    
                
        });// metodo find
    },

    login: function(req, res){
        // recoger los parametros de la petición
        var params = req.body;
        var error  = false;
        var msg    = '';
        // validar los datos
        var validate_email       = validator.isEmpty(params.email) || !validator.isEmail(params.email);
        var validate_password    = validator.isEmpty(params.password);

        if(validate_email){
            error = true;
            msg   = 'El email no es valido';
        }
        if(validate_password){
            error = true;
            msg   = 'La contraseña esta vacia';
        }
        if(error){
            return res.status(200).send({
                status : 'error',
                msg    : "parametro incorrecto "+ msg,
                params
            });
        }
        /***************************** */
        // Buscar el usuario
        User.findOne({email: params.email.toLowerCase()}, (err, user) =>{
            // Si encuentra comprobar la contraseña email y password
            if(err){
                return res.status(500).send({
                    status : 'error',
                    msg    : "Error al intentar indentificarse",
                    params
                });
            }
            if(!user){
                return res.status(404).send({
                    status : 'error',
                    msg    : "El usuario no existe",
                    params
                });
            }
       
            // Si es correcto, devovler los datos
            bcrypt.compare(params.password, user.password, (err, check) =>{

                if(check){

                    if(params.gettoken){
                        return res.status(200).send({
                            // Generar toquen de jwt
                             token : jwt.createToken(user)   
                        })
                    }else{
                        user.password = undefined
                        return res.status(200).send({
                            status: 'success',
                            msg   : 'Bienvenido',
                            user,
                        })
                    }

                }else{
                    return res.status(404).send({
                        status : 'error',
                        msg    : "Credeciales incorrectas",
                        params
                    });
                }
            }); // end compare
        });// end find
     
    }
    
};


module.exports = controller;