'use strict'

var express            = require('express');
var CommnetController  = require('../controllers/comment');
var md_auth            = require('../middlewares/autenticated'); 

var router = express.Router();

router.post('/comment/topic/:topicId', md_auth.authenticated, CommnetController.add);
router.put('/comment/:commentId', md_auth.authenticated, CommnetController.update);
router.delete('/comment/:topicId/:commentId', md_auth.authenticated, CommnetController.delete);
module.exports = router;
