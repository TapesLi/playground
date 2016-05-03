var request = require('request');
var express = require('express');
var router = express.Router();

var Spec = require('../models/Spec');
var ScheduleService = require('../services/ScheduleService');

router.get('/', function (req, res, next) {

    console.log('scheduledJobs: ', ScheduleService.scheduledJobs);

    res.render('schedule/index.html');
});

router.get('/create', function (req, res, next) {
    res.render('schedule/create.html');
});

router.get('/test', function (req, res, next) {
    var now = new Date();
    console.log('now: ', now);

    request('http://192.168.0.3:3000/redis/lpush?content=' + now.toString(), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body); // Show the HTML for the Google homepage.

            res.json({
                result: body
            });
        } else {
            res.json({
                result: error
            });
        }
    });
});

router.post('/create', function (req, res, next) {

    var spec = new Spec(req.body);
    var specStr = spec.toFormat();

    ScheduleService.scheduleJob(specStr, function () {
        var now = new Date();
        console.log('now: ', now);

        request('http://192.168.0.3:3000/redis/lpush?content=' + now.toString(), function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // Show the HTML for the Google homepage.
            }
        });
    });

    res.redirect('/schedule');
});

module.exports = router;