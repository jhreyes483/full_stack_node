'use strict'

var express          = require('express');
var TopicController  = require('../controllers/topic');
var md_auth          = require('../middlewares/autenticated'); 

var router = express.Router();

router.get('/test', TopicController.test);
router.post('/topic',md_auth.authenticated ,TopicController.save);
router.get('/topic/:page?',TopicController.getTopics);
router.get('/user-topiccs/:user',TopicController.getTopicsByUser);


module.exports = router;
