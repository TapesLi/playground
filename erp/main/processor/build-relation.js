/**
 * Created by tapes on 2016/10/31.
 */

"use strict";


function process(lines) {

    let map = {};

    lines.forEach((words) => {

        map[words[0].trim()] = {
            code: words[1].trim(),
            sales: words[2]
        };

    });

    return map;
}

exports.process = process;

