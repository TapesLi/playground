/**
 * Created by tapes on 2016/10/31.
 */

"use strict";

const path = require('path');
const readFile = require('../../main/processor/read-file');
const parseCsv = require('../../main/processor/parse-csv.js');
const buildRelation = require('../../main/processor/build-relation');

let relationMap =
    buildRelation.process(
        parseCsv.process(
            readFile.process(path.join(__dirname, '../../res/relation.csv'))));


console.log('relationMap: ', relationMap);