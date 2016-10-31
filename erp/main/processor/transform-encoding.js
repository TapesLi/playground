/**
 * Created by tapes on 2016/10/16.
 */

"use strict";

const iconv = require('iconv-lite');

/**
 * 编码转换：Shift_JIS -> UTF-8
 * @param file
 * @param encoding
 */
function process(file, encoding) {
    return iconv.decode(file, encoding);
}

exports.process = process;

