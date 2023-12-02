'use strict'

var express        = require('express');
var UserController = require('../controllers/user');
var multipart      = require('connect-multiparty'); // recibir files por peticion

var router         = express.Router();
var md_auth        = require('../middlewares/autenticated');
var md_upload      = multipart({uploadDir:'./uploads/users' });

/**************** Rutas de prueba ********************* */
router.get('/probando',UserController.probando);
router.post('/testeando',UserController.testeando);
/****************************************************** */
/****************** Rutas de usuario ****************** */
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticated , UserController.update);
router.post('/upload-avatar/:id',[md_upload, md_auth.authenticated],  UserController.uploadAvatar);

module.exports = router;