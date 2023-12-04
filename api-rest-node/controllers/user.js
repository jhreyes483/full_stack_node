'use strict'

var validator = require('validator');
var bcrypt    = require('bcrypt-nodejs')
var fs        = require('fs'); /* files */
var path      = require('path'); /**file */
var User      = require('../models/user');
var jwt       = require('../services/jwt');
var file_management = require('../services/file_management');

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
        try{
        // Validar los datos
        var validate_name     = validator.isEmpty(params.name);
        var validate_surname  = validator.isEmpty(params.surname);
        var validate_emial    = (validator.isEmpty(params.email) || !validator.isEmail(params.email));
        var validate_password = validator.isEmpty(params.password);

        }catch(err){
            error = true 
            msg   = 'faltan campos en la petción'
        }
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

        try{
        // validar los datos
        var validate_email       = validator.isEmpty(params.email) || !validator.isEmail(params.email);
        var validate_password    = validator.isEmpty(params.password);
        }catch(err){
            error = true;
            msg   = 'Faltan datos por enviar';
        }

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
                            token : jwt.createToken(user)
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
     
    },
    update: function(req, res){
        var params = req.body;
        let error = false;
        let msg   = '';
        try{
        var validate_name     = validator.isEmpty(params.name);
        var validate_surname  = validator.isEmpty(params.surname);
        var validate_emial    = (validator.isEmpty(params.email) || !validator.isEmail(params.email));
        }catch(err){
            error = true 
            msg   = 'Faltan datos por enviar'
        }
        if(params.password){
            delete params.password;
        }
        

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
        

        if( error ){
            return res.status(200).send({
                status : 'error',
                msg    : "parametro incorrecto "+ msg,
                params
            });
        }
        // Comprobar si el email es unico
        if(req.user.email != params.email ){
             // Buscar el usuario
            User.findOne({email: params.email.toLowerCase()}, (err, user) =>{
            // Si encuentra comprobar la contraseña email y password
                if(err){
                    error  = true;
                    return res.status(500).send({
                        status : 'error',
                        msg    : "Error al intentar indentificarse",
                        params
                    });
                }
                if(user && user.email == params.email){
                    error  = true;
                    return res.status(200).send({
                        status : 'error',
                        msg    : "El email no puede ser modificado",
                        params
                    });
                }

            });
        }


    // User.findOneAndUpdate(condicion, datos a actualizar, opciones, callback )
    if(!error) User.findOneAndUpdate(
        {_id: req.user._id }, 
        params,
            {
                new : true /**retornar el actualizado */
            }, 
        (err, userUpdate) => {
            if(err){
                console.log(err)
                return res.status(500).send({
                    status: 'error',
                    msg   : 'Error al actualizar usuario'
                })
            }
            console.log(userUpdate, 'userUpdate')

            if(!userUpdate){
                return res.status(500).send({
                    status: 'error',
                    msg   : 'No se encontro user'
                })
            }

            return res.status(200).send({
                status: 'success',
                msg   : 'Metodo de actualizacion',
                user  : userUpdate
            });
       })
       
    },
    uploadAvatar: function(req, res){
        var error = false;
        // Configurar el modulo multparty (md)

        // recoger el fichero de la peticion
        var file_name ='Avatar no sublido....';

        if(!req.files.file){
            error = true;
            return res.status(404).send({
                status: 'error',
                msg   : 'No ha anexado el archivo',
            });
        }
        // conseguir el nombre y la extencion 
        var file_path  = req.files.file.path;
        var file_ext   = file_management.get_ext(file_path)
        var file_name  = file_management.get_name(file_path)
        
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            error =true;
            file_management.delete(file_path) 
            return res.status(200).send({
                status: 'error',
                msg   : 'formato incorrecto',
                file_path,
                file_name,
                file_ext
            });
        }
        // sacar el ide de usuario idnetificado
        var user_id = req.user._id;
        // Buscar y actualizar documento en db
        User.findByIdAndUpdate(
            {_id: user_id},
            {image:file_name}, 
            {new:true} 
            ,(err, userUpdate)=>{
                if(err || !userUpdate){
                    error = true;
                    return res.status(500).send({
                        status: 'error',
                        msg   : 'Error al guardar el usuario',
                        file_path,
                        file_name,
                        file_ext
            
                    });
                }

                if(!error) return res.status(200).send({
                    status: 'success',
                    msg   : 'Upload avatar',
                    file_path,
                    file_name,
                    file_ext
        
                });
        });
    },

    avatar: function(req, res){
        var fileName = req.params.fileName;
        var pathFile = './uploads/users/'+fileName;

        fs.exists(pathFile, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(pathFile));
            }else{
                return res.status(400).send({
                    status : 'error',
                    msg:'La imagen no existe'

                })
            }
        })
    },

    getUsers: function(req, res){
        User.find().exec((err, users) => {
            if(err || !users){
                return res.status(400).send({
                    status : 'error',
                    msg:'No existen usuarios'

                })
            }else{
                return res.status(200).send({
                    status : 'success',
                    msg:'Users',
                    users

                })
            }
        })

    },
    getUser: function(req, res){
        var userId = req.params.userId;

        User.findById(userId).exec((err, user) => {
            if(err || !user){
                return res.status(400).send({
                    status : 'error',
                    msg:'No existe el usuario'

                })
            }else{
                return res.status(200).send({
                    status : 'success',
                    msg:'Users',
                    user
                })
            }
        });
    }
    
};


module.exports = controller;