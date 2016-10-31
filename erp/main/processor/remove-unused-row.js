/**
 * Created by tapes on 2016/10/16.
 */

"use strict";

const _ = require('underscore');

/**
 * 去除表头无用行
 * @param lines
 */
function process(content) {

    let lines = content.split('\n');
    let index = 0;

    while (isNotDate(lines[index].substr(1, 19))) {
        index ++;
    }

    return lines.slice(index).join('\n');

}

function isNotDate(cell) {
    return _.isNaN(Date.parse(cell.split(' ')[0]));
}

exports.process = process;

