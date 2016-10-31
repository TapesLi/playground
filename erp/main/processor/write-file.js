/**
 * Created by tapes on 2016/10/31.
 */

"use strict";

const fs = require('fs');
const _ = require('underscore');

function process(fileName, orders) {
    let fileOutput = fs.createWriteStream(fileName, {
        encoding: 'utf-8'
    });

    fileOutput.write(_.keys(orders[0]).join(',') + '\n');

    orders.forEach((order) => {
        fileOutput.write(_.values(order).join(',') + '\n');
    });

    fileOutput.end();
}

exports.process = process;
