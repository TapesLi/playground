/**
 * Created by tapes on 2016/10/31.
 */

"use strict";

const fs = require('fs');

function process(fileName) {
    return fs.readFileSync(fileName);
}

exports.process = process;
