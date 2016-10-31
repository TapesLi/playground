/**
 * Created by tapes on 2016/10/16.
 */

"use strict";

const parse = require('csv-parse/lib/sync');

/**
 * 读取 csv，转换成行列
 * @param content
 */
function process(content) {
    /*return content.split('\n').filter((lineStr) => {
        return !_.isEmpty(lineStr);
    }).map((lineStr) => {
        return lineStr.split(',').map((cell) => {
            return cell.split('"')[1];
        });
    });*/

    return parse(content, {delimiter: ','});
}

exports.process = process;