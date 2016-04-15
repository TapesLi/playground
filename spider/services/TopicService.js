var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var url = require('url');

var TopicDao = require('../dao/TopicDao');

var cnodeUrl = 'https://cnodejs.org';
var concurrencyCount = 0;

function getTopicUrls(siteUrl, callback) {
    superagent.get(siteUrl)
        .end(function(err, res) {
            if (err) {
                callback(err);
            } else {
                var topicUrls = [];
                var $ = cheerio.load(res.text);

                $('#topic_list .topic_title').each(function(idx, element) {
                    var $element = $(element);
                    var href = $element.attr('href');

                    topicUrls.push(siteUrl + href);
                });

                console.log(topicUrls);
                console.log('topicUrls length: ', topicUrls.length);

                callback(null, topicUrls);
            }
        });
}

function getTopicDetail(topicUrl, callback) {
    var start = Date.now();

    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', topicUrl);
    superagent.get(topicUrl)
        .end(function(err, res) {
            var end = Date.now();

            concurrencyCount--;
            if (err) {
                console.log('fetch ', topicUrl, ' fail', '，耗时' + (end - start) + '毫秒');
                callback(err);
                // callback(null, [topicUrl, 'ERROR']);
            } else {
                console.log('fetch ', topicUrl, ' successful', '，耗时' + (end - start) + '毫秒');
                callback(null, buildTopicDetail(topicUrl, res.text));
            }
        });
}

function buildTopicDetail(topicUrl, topicContent) {
    var $ = cheerio.load(topicContent);

    return {
        title: $('.topic_full_title').text().trim(),
        href: topicUrl,
        comment1: $('.reply_content').eq(0).text().trim()
    }
}

function getTopics(callback) {

    TopicDao.getTopics(function(err, topics) {
        console.log('TopicDao.getTopics: ', err, topics);

        if (err) {
            callback(err);
        } else {

            if (topics && topics.length && topics.length > 0) {
                callback(null, topics);
            } else {
                getTopicUrls(cnodeUrl, function(err, topicUrls) {
                    if (err) {
                        callback(err);
                    } else {
                        async.mapLimit(topicUrls, 5, getTopicDetail, function(err, topics) {
                            if (err) {
                                callback(err);
                            } else {
                                console.log('final: ');
                                console.log(topics);

                                TopicDao.setTopics(topics, function(err, res) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback(null, topics);
                                    }
                                });

                            }
                        });
                    }
                });
            }

        }

    });


}

module.exports = {
    getTopics: getTopics
}