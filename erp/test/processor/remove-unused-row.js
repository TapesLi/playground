/**
 * Created by tapes on 2016/10/16.
 */

"use strict";

const path = require('path');
const readFile = require('../../main/processor/read-file');
const transformEncoding = require('../../main/processor/transform-encoding.js');
const removeUnusedRow = require('../../main/processor/remove-unused-row.js');

let lines =
    removeUnusedRow.process(
        transformEncoding.process(
            readFile.process(path.join(__dirname, '../../res/20169 _          .csv')), 'Shift_JIS'));

console.log('lines: \n', lines);