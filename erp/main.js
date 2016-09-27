/**
 * Created by tapes on 16/9/16.
 */

"use strict";

const fs               = require('fs');
const parse            = require('csv-parse');
const transform        = require('stream-transform');
const stringify        = require('csv-stringify');
const path             = require('path');
const iconv            = require('iconv-lite');
const _                = require('underscore');
const defaultProcessor = function (record, index) {
    return record[index];
};

const Alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const processors       = {
    0: function (record, index) {

        let cell = record[index];

        return cell.split(' ')[0];
    },
    20: function (record, index) {

        if (parseInt(record[9], 10) + parseInt(record[12], 10) == 0 ) {
            return
        }


        if (record[7] == 'Amazon') {

        }

        return index;
    },

    21: function (record, index) {
        return index;
    }
};

let parser      = parse({delimiter: ','});
let input       = fs.createReadStream(path.join(__dirname, '20168.csv'));
let transformer = transform(function (record) {

    let result = [];

    _.times(22, (index) => {
        let processor = processors[index] || defaultProcessor;

        result[index] = processor(record, index);
    });


    return result;
});
let stringifier = stringify();


input.pipe(iconv.decodeStream('Shift_JIS')).pipe(parser).pipe(transformer).pipe(stringifier).pipe(process.stdout);