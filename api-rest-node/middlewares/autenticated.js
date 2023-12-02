
'use strict'

var jwt    = require('jwt-simple');
var moment = require('moment');
var secret = 'clave-secreta-para-generar-el-token-994';



exports.authenticated = function(req /*request*/, res /* response */, next){

    // comprobar si llega autorizacion
    if(!req.headers.authorization){
        return res.status(403).send({
            msg: 'La peticion no tiene cabecera de autorización',
        })
    }
    //console.log('headers->',req.headers)

    try{
        // limpiar el token
        var token = req.headers.authorization.replace(/['"']+/g,'')
         // decodificar el token
         var payload = jwt.decode(token, secret);
         if(payload.exp <= moment().unix()/* fecha actual */ ){
             // comprobar si el token ha expirado
             return res.status(404).send({
                msg: 'El token ha expirado'
            })
        }
    }catch(ex){
        console.log('ex->',ex)
        return res.status(404).send({
            msg: 'El token no es válido'
        })
    }
    console.log(payload,'payload');


    // Adluntar el usuario identificado a la request
    req.user = payload;

    console.log("Estas pasando por el midelware")
    next();
}