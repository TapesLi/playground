/**
 * Created by tapes on 16/7/12.
 */

"use strict";

const mysql = require('mysql');
const _ = require('underscore');
const fs = require('fs');

fs.createReadStream('./realnotvisit_20160705.log').on('data', function (data) {
    // console.log('data: ', arguments);

    let text = data.toString('utf-8');

    console.log('text: ', text);

    let statIdList = text.trim().split('\n').map(function (statId) {
        return statId.trim();
    });

    console.log('statIdList: ', statIdList);

}).on('close', function () {
    console.log('close: ', arguments);
}).on('end', function () {
    console.log('end: ', arguments);
});
