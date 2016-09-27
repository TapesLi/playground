"use strict";

const http = require('http');
const MAX = 10;
const DELAY = 2 * 1000;

function main() {

    http.createServer(function (req, res) {

        console.log('request is coming');

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        let count = 0;

        let intervalId = setInterval(function () {
            if (count >= MAX) {
                clearInterval(intervalId);

                res.end();

                console.log('request is end');
            } else {

                let data = 'response: ' + count;

                console.log(`BODY: ${data}`);
                res.write(data);
                count += 1;
            }
        }, DELAY);
    }).listen('8888');

    console.log('server is listening on 8888');

}

main();