var redis = require('../utils/redis');

var KEY_OF_TOPIC = '__topic__';
var EXPIRED_TIME = 60;

module.exports = {
    getTopics: function (callback) {
        redis.get(KEY_OF_TOPIC, function (err, result) {
            callback(err, JSON.parse(result));
        });
    },
    
    setTopics: function (topics, callback) {
        redis.setex(KEY_OF_TOPIC, EXPIRED_TIME, JSON.stringify(topics), callback);
    }
};