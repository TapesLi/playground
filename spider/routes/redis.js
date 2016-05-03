var redis = require('../utils/redis');
var express = require('express');
var router = express.Router();
const KEY = '___redis_test_key___';
const KEY_OF_LPUSH = '__LPUSH_TEST__';

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

router.get('/lpush', function (req, res, next) {
    "use strict";

    var content = req.query.content;

    redis.lpush(KEY_OF_LPUSH, content, function (err, result) {
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