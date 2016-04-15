var redis = require('../utils/redis');
var express = require('express');
var router = express.Router();
var KEY = '___redis_test_key___';

router.get('/get', function (req, res, next) {
    redis.get(KEY, function (err, result) {
        if (err) {
            next();
        } else {
            res.render('redis', {
                result: result
            });
        }
    });
});

router.get('/set', function (req, res, next) {
    redis.set(KEY, 'Hello World', function (err, result) {
        if (err) {
            next();
        } else {
            res.render('redis', {
                result: result
            });
        }
    });
});

router.get('/setex', function (req, res, next) {
    redis.setex(KEY, 60, 'Hello World Expired By 60s', function (err, result) {
        if (err) {
            next();
        } else {
            res.render('redis', {
                result: result
            });
        }
    });
});

module.exports = router;