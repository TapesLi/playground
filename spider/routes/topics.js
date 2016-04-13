var express = require('express');
var TopicService = require('../services/TopicService');
var router = express.Router();

router.get('/', function(req, res, next) {
    TopicService.getTopics(function(err, topics) {
        if (err) {
            next();
        } else {
            res.render('topics', {
                topics: topics
            });
        }
    });

});

module.exports = router;