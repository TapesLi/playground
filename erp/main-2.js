/**
 * Created by tapes on 2016/10/31.
 */

"use strict";

const path = require('path');

const utils = require('./main/utils');
const readFile = require('./main/processor/read-file');
const transformEncoding = require('./main/processor/transform-encoding.js');
const removeUnusedRow = require('./main/processor/remove-unused-row.js');
const parseCsv = require('./main/processor/parse-csv.js');
const handleEmptySkuOrder = require('./main/processor/handle-empy-sku-order.js');
const calculateGrossAndFee1 = require('./main/processor/calculate-gross-&-fee1.js');

const handleAmazon = require('./main/processor/handle-amazon');
const handleXixijie = require('./main/processor/handle-xixijie');
const handleRefound = require('./main/processor/handle-refound');

const buildAmazonResult = require('./main/processor/build-amazon-result');
const buildXixijieResult = require('./main/processor/build-xixijie-result');
const buildRefoundResult = require('./main/processor/build-refound-result');

const writFile = require('./main/processor/write-file');

let orders =
    calculateGrossAndFee1.process(
        handleEmptySkuOrder.process(
            parseCsv.process(
                removeUnusedRow.process(
                    transformEncoding.process(
                        readFile.process(path.join(__dirname, './res/20169 _          .csv')), 'Shift_JIS')))));

let ordersOfAmazon = [];
let ordersOfXixijie = [];
let ordersOfRefound = [];

orders.forEach(function (order) {
    if (utils.isAmazon(order)) {
        ordersOfAmazon.push(order);
    } else if (utils.isXixijie(order)) {
        ordersOfXixijie.push(order);
    } else if (utils.isRefound(order)) {
        ordersOfRefound.push(order);
    }
});

writFile.process(
    path.join(__dirname, '1. amazon.csv'), buildAmazonResult.process(
        handleAmazon.process(ordersOfAmazon)));

writFile.process(
    path.join(__dirname, '2. xixijie.csv'), buildXixijieResult.process(
        handleXixijie.process(ordersOfXixijie)));

writFile.process(
    path.join(__dirname, '3. refound.csv'), buildRefoundResult.process(
        handleRefound.process(ordersOfRefound)));
