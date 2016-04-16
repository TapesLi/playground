"use strict";

var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var url = require('url');
var TopicDao = require('../dao/TopicDao');

const URL_CNODE = 'https://cnodejs.org';
const CONCURRENCY_LIMIT = 5;
var concurrencyCount = 0;

function fetchTopicUrls(siteUrl, callback) {
    superagent.get(siteUrl)
        .end(function (err, res) {
            if (err) {
                callback(err);
            } else {
                var topicUrls = [];
                var $ = cheerio.load(res.text);

                $('#topic_list .topic_title').each(function (idx, element) {
                    var $element = $(element);
                    var href = $element.attr('href');

                    topicUrls.push(siteUrl + href);
                });

                console.log('TopicService fetchTopicUrls: ', topicUrls);
                callback(null, topicUrls);
            }
        });
}

function fetchTopicDetail(topicUrl, callback) {
    var start = Date.now();

    concurrencyCount++;
    console.log('fetchTopicDetail 现在的并发数是', concurrencyCount, '，正在抓取的是', topicUrl);
    superagent.get(topicUrl)
        .end(function (err, res) {
            var end = Date.now();

            concurrencyCount--;

            if (err) {
                console.log('fetchTopicDetail ', topicUrl, ' fail', '，耗时' + (end - start) + '毫秒');
                callback(err);
            } else {
                console.log('fetchTopicDetail ', topicUrl, ' successful', '，耗时' + (end - start) + '毫秒');
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
    };
}

module.exports = {
    getTopics: function (callback) {
        TopicDao.getTopics(callback);
    },
    fetchTopics: function (callback) {
        fetchTopicUrls(URL_CNODE, function (err, topicUrls) {
            if (err) {
                callback(err);
            } else {
                async.mapLimit(topicUrls, CONCURRENCY_LIMIT, fetchTopicDetail, function (err, topics) {
                    if (err) {
                        callback(err);
                    } else {
                        TopicDao.setTopics(topics, callback);

                    }
                });
            }
        });
    }
};