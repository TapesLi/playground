/**
 * Created by tapes on 16/9/16.
 */

"use strict";

const fs = require('fs');
const parse = require('csv-parse');
const transform = require('stream-transform');
const stringify = require('csv-stringify');
const path = require('path');
const iconv = require('iconv-lite');
const _ = require('underscore');
const defaultProcessor = function (record, index) {
    return record[index];
};

const Alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const Numbe = [ 0,   1,   2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

function parseNum(numStr) {
    return parseInt(numStr.split(',').join(''), 10);
}

const processors = {
    0: function (record, index) {

        let cell = record[index];

        return cell.split(' ')[0];
    },
    22: function (record, index) {

        if (parseNum(record[13]) + parseNum(record[16]) == 0) {
            return parseNum(record[12]);
        } else {
            if (record[8].trim() == 'Amazon') {
                return parseNum(record[12]) + parseNum(record[16]);
            } else {
                return parseNum(record[12]) + parseNum(record[13]) + parseNum(record[16]);
            }
        }

    },
    23: function (record, index) {

        if (parseNum(record[13]) + parseNum(record[16]) == 0) {
            return parseNum(record[17]) + parseNum(record[18]) + parseNum(record[20]);
        } else {
            if (record[8].trim() == 'Amazon') {
                return parseNum(record[17]) + parseNum(record[18]) + parseNum(record[13]) + parseNum(record[20]);
            } else {
                return parseNum(record[17]) + parseNum(record[18]) + parseNum(record[20]);
            }
        }

    }
};

let parser = parse({delimiter: ','});
let input = fs.createReadStream(path.join(__dirname, '20168.csv'));
let transformerStep1 = transform(function (record) {

    let result = [];

    _.times(24, (index) => {
        let processor = processors[index] || defaultProcessor;

        result[index] = processor(record, index);
    });


    return result;
});
let stringifier = stringify();


input
    .pipe(iconv.decodeStream('Shift_JIS'))
    .pipe(parser)
    .pipe(transformerStep1)
    .pipe(stringifier)
    .pipe(process.stdout);