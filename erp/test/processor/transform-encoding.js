/**
 * Created by tapes on 2016/10/16.
 */
"use strict";

const path = require('path');
const readFile = require('../../main/processor/read-file');
const transformEncoding = require('../../main/processor/transform-encoding.js');

let content =
    transformEncoding.process(
        readFile.process(path.join(__dirname, '../../res/20169 _          .csv')), 'Shift_JIS');


console.log('content: ', content);
