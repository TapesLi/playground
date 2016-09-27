"use strict";

var http = require('http');

function main() {
    http.get('http://localhost:8888', (res) => {
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });

        res.on('end', () => {
            console.log('No more data in res');
        })
    });
}

main();