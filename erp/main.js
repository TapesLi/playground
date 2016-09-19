/**
 * Created by tapes on 16/9/16.
 */

"use strict";

const fs = require('fs');
const parse = require('csv-parse');
const transform = require('stream-transform');
const path = require('path');
const iconv = require('iconv-lite');

var parser = parse({delimiter: ','});
var input = fs.createReadStream(path.join(__dirname, '20168.csv'));
var transformer = transform(function (record, callback) {
    // setTimeout(function () {
        callback(null, record.join(' | ') + '\n');
    // }, 500);
}, {parallel: 10});

input.pipe(iconv.decodeStream('Shift_JIS')).pipe(parser).pipe(transformer).pipe(process.stdout);