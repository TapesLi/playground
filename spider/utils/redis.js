var redis = require('redis');

var client = redis.createClient({
    host: '192.168.0.2'
});

module.exports = client;