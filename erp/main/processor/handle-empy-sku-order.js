/**
 * Created by tapes on 2016/10/16.
 */

"use strict";

const utils = require('../../main/utils');

/**
 * 处理特殊订单 SKU 为空
 * @param lines
 */
function process(lines) {
    let linesOfEmptySku = lines.filter((line) => {
        return line[4].trim().length <= 0;
    });

    console.log('linesOfEmptySku number: ', linesOfEmptySku.length);

    linesOfEmptySku.forEach((lineOfEmptySku) => {
        let transactionID = lineOfEmptySku[3];
        let originLine = lines.find((line) => {
            return line[3] == transactionID;
        });

        originLine[18] = '' + (utils.parseNum(lineOfEmptySku[20]) + utils.parseNum(originLine[18]));

        let indexOfEmptySku = lines.indexOf(lineOfEmptySku);

        lines.splice(indexOfEmptySku, 1);

    });

    return lines;
}

exports.process = process;