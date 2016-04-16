var redis = require('../utils/redis');

const KEY_OF_TOPICS = '__topics__';
const EXPIRED_TIME = 60;

module.exports = {
    getTopics: function (callback) {
        redis.get(KEY_OF_TOPICS, function (err, topicsStr) {
            var topics;

            if (err) {
                callback(err);
            } else {
                try {
                    topics = JSON.parse(topicsStr) || [];
                } catch (err) {
                    console.log('TopicDao.getTopics', err);
                    callback(err);
                }

                callback(null, topics);
            }
        });
    },
    
    setTopics: function (topics, callback) {
        var topicsStr;

        try {
            topicsStr = JSON.stringify(topics);
        } catch (err) {
            console.log('TopicDao.setTopics', err);
            callback(err, null);
        }

        redis.setex(KEY_OF_TOPICS, EXPIRED_TIME, topicsStr, callback);
    }
};