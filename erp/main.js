/**
 * Created by tapes on 16/9/16.
 */

"use strict";

const fs = require('fs');
const parse = require('csv-parse');
const transform = require('stream-transform');
const stringify = require('csv-stringify');
const path = require('path');
const iconv = require('iconv-lite');
const _ = require('underscore');
const defaultProcessor = function (record, index) {
    return record[index];
};
const inputFileName = '20169 _          .csv';
const inputFileNameTmp = inputFileName + '.tmp';
// const inputFileName = '20168.csv';

const Alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const Numbe = [ 0,   1,   2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12,  13,  14,  15, 16,  17, 18, 19, 20, 21, 22, 23, 24, 25];

let ordersOfAmazon = [];
let ordersOfXixijie = [];
let ordersOfRefound = [];

let orderNumberMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'order-map.json'), 'utf-8'));

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function parseNum(numStr) {
    return parseInt(numStr.split(',').join(''), 10);
}

const processorsOfStep1 = {
    0: function (record, index) {

        let cell = record[index];

        return cell.split(' ')[0];
    },
    22: function (record, index) {

        if (parseNum(record[13]) + parseNum(record[16]) == 0) {
            return + parseNum(record[12]);
        } else {
            if (record[8].trim() == 'Amazon') {
                return parseNum(record[12]) + parseNum(record[16]);
            } else {
                return parseNum(record[12]) + parseNum(record[13]) + parseNum(record[16]);
            }
        }

    },
    23: function (record, index) {

        if (parseNum(record[13]) + parseNum(record[16]) == 0) {
            return parseNum(record[17]) + parseNum(record[18]) + parseNum(record[20]);
        } else {
            if (record[8].trim() == 'Amazon') {
                return parseNum(record[17]) + parseNum(record[18]) + parseNum(record[13]) + parseNum(record[20]);
            } else {
                return parseNum(record[17]) + parseNum(record[18]) + parseNum(record[20]);
            }
        }

    }
};

function getRealOrderNumber(orderNumber) {

    return orderNumberMap[orderNumber] && orderNumberMap[orderNumber].code || orderNumber;

}

function getRealOrderSales(orderNumber) {
    return orderNumberMap[orderNumber] && orderNumberMap[orderNumber].sales || '';
}

const processorsOfStep2 = {
    Amazon: function (order) {
        let orderNumbers = order[4].split('+');
        let percentages = [0.6, 0.4];
        let method = ['floor', 'ceil'];

        if (orderNumbers.length > 1) {
            orderNumbers.forEach((orderNumber, index) => {

                let  _order = deepCopy(order);

                _order[4] = getRealOrderNumber(orderNumber);

                _order[22] = Math[method[index]](order[22] * percentages[index]);
                _order[23] = Math[method[index]](order[23] * percentages[index]);
                _order[24] = getRealOrderSales(orderNumber);

                ordersOfAmazon.push(_order);
            });
        } else {
            let  _order = deepCopy(order);

            _order[4] = getRealOrderNumber(_order[4]);
            _order[24] = getRealOrderSales(_order[4]);
            ordersOfAmazon.push(_order);
        }

    },

    Xixijie: function (order) {
        let orderNumbers = order[4].split('+');
        let percentages = [0.6, 0.4];
        let method = ['ceil', 'floor'];

        if (orderNumbers.length > 1) {
            orderNumbers.forEach((orderNumber, index) => {

                let  _order = deepCopy(order);

                _order[4] = getRealOrderNumber(orderNumber);

                _order[22] = Math[method[index]](order[22] * percentages[index]);
                _order[23] = Math[method[index]](order[23] * percentages[index]);
                _order[24] = getRealOrderSales(orderNumber);

                ordersOfXixijie.push(_order);
            });
        } else {
            let  _order = deepCopy(order);

            _order[4] = getRealOrderNumber(_order[4]);
            _order[24] = getRealOrderSales(_order[4]);
            ordersOfXixijie.push(_order);
        }
    },

    Refound: function (order) {

    }
};

const processorsOfStep3 = {
    Amazon: function (orders, output) {
        orders = orders.map((order, index) => {
            return {
                'NO': index + 1,
                'Date': order[0],
                'Name': '',
                'Currency': 'JPY',
                'Gross': order[22] >= 0 ? order[22] : 0,
                'Fee1': order[22] >= 0 ? Math.abs(order[23]) : Math.abs(parseNum(order[17]) + parseNum(order[18])),
                'Fee2': '',
                'Fee3': 0,
                'Fee4': '',
                'Fee5': '',
                'Note': 'amazon',
                'From Email Address': '',
                'To Email Address': 'bluebluesky_0321@yahoo.co.jp',
                'Platform': 'AMAZON',
                'Counterparty Status': '',
                'Postal Address': '',
                'Address Status': '',
                'Qty': order[6],
                'Item Title': '',
                'Code': order[4],
                'Warehouse': 'U061',
                'Sales': order[24],
                'Item ID': '',
                'Postage and Packing': '',
                'Insurance Amount': '',
                'Buyer ID': '',
                'Item URL': '',
                'Closing Date': '',
                'Type': '',
                'Status': '',
                'Transaction ID': order[3],
                'ShipAdd01': '',
                'ShipAdd02': '',
                'ShipAdd03': '',
                'ShipAdd04': '',
                'ShipAdd05': '',
                'ShipAdd06': '',
                'ShipAdd07': '',
                'Account code': '601001'
            }
        });

        // console.log('ordersOfAmazon: ', ordersOfAmazon);
        // console.log('ordersOfXixijie: ', ordersOfXixijie);
        // console.log('ordersOfRefound: ', ordersOfRefound);



        output.write(_.keys(orders[0]).join(',') + '\n');

        orders.forEach((order) => {
            output.write(_.values(order).join(',') + '\n');
        });

        output.end();
    },

    Xixijie: function () {
        processorsOfStep3.Amazon.apply(null, arguments);
    }
};

let parser = parse({delimiter: ','});
let input = fs.createReadStream(path.join(__dirname, inputFileName));
let transformerStep1 = transform(function (record) {

    let result = [];

    _.times(24, (index) => {
        let processor = processorsOfStep1[index] || defaultProcessor;

        result[index] = processor(record, index);
    });

    return result;
});
// let stringifier = stringify();


let output = input
    .pipe(iconv.decodeStream('Shift_JIS'))
    .pipe(parser)
    .pipe(transformerStep1);

output.on('data', (order) => {
    // console.log(JSON.stringify(order));

    if (order[2] == '注文'  && order[8] == 'Amazon') {

        processorsOfStep2['Amazon'](order);

        // ordersOfAmazon.push(order);
    } else if (order[2] == '注文'  && order[8] == '出品者') {
        processorsOfStep2['Xixijie'](order);
        // ordersOfXixijie.push(order);
    } else if (order[2] == '返金') {
        processorsOfStep2['Refound'](order);
        // ordersOfRefound.push(order);
    }
}).on('end', () => {
    let outputOfAmazon = fs.createWriteStream(path.join(__dirname, 'JP Amazon 注文.csv'), {
        encoding: 'utf-8'
    });

    let outputOfXixijie = fs.createWriteStream(path.join(__dirname, 'JP Amazon 刷单.csv'), {
        encoding: 'utf-8'
    });

    processorsOfStep3.Amazon(ordersOfAmazon, outputOfAmazon);
    processorsOfStep3.Amazon(ordersOfXixijie, outputOfXixijie);



});


