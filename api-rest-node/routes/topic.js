'use strict'

var express          = require('express');
var TopicController  = require('../controllers/topic');
var md_auth          = require('../middlewares/autenticated'); 

var router = express.Router();

router.get('/test', TopicController.test);
router.post('/topic',md_auth.authenticated ,TopicController.save);
router.get('/topics/:page?',TopicController.getTopics);
router.get('/user-topics/:user',TopicController.getTopicsByUser);
router.get('/topic/:id',TopicController.getTopic);
router.put('/topic/:id',md_auth.authenticated , TopicController.update);
router.delete('/topic/:id', md_auth.authenticated, TopicController.delete);
router.get('/search/:search', TopicController.serch);


module.exports = router;
