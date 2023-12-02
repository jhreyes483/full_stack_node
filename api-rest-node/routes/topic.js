'use strict'

var express          = require('express');
var TopicController  = require('../controllers/topic');
var md_auth          = require('../middlewares/autenticated'); 

var router = express.Router();

router.get('/test', TopicController.test);

module.exports = router;
