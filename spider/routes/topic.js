"use strict";

var express = require('express');
var TopicService = require('../services/TopicService');
var router = express.Router();

router.get('/list', function(req, res, next) {
    TopicService.getTopics(function(err, topics) {
        if (err) {
            next(err);
        } else {
            res.render('topics', {
                topics: topics
            });
        }
    });
});

router.get('/fetch', function (req, res, next) {
    TopicService.fetchTopics(function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json({
                result: result
            });
        }
    });
});

module.exports = router;