var Redis = require('ioredis');

var client = new Redis({
    host: '192.168.0.2'
});

module.exports = client;