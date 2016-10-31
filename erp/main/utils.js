/**
 * Created by tapes on 2016/10/16.
 */

"use strict";

const path = require('path');
const readFile = require('./processor/read-file');
const parseCsv = require('./processor/parse-csv');
const buildRelation = require('./processor/build-relation');

const orderNumberMap =
    buildRelation.process(
        parseCsv.process(
            readFile.process(path.join(__dirname, '../res/relation.csv'))));

module.exports = {
    deepCopy: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    parseNum: function (numStr) {
        return parseInt(numStr.split(',').join(''), 10);
    },

    isAmazon: function (order) {
        return order[2] == '注文' && order[8] == 'Amazon';
    },

    isXixijie: function (order) {
        return order[2] == '注文' && order[8] == '出品者';
    },

    isRefound: function (order) {
        return order[2] == '返金'
    },

    getRealOrderNumber: function (orderNumber) {
        return orderNumberMap[orderNumber] && orderNumberMap[orderNumber].code || orderNumber;
    },

    getRealOrderSales: function (orderNumber) {
        return orderNumberMap[orderNumber] && orderNumberMap[orderNumber].sales || '';
    }
};

