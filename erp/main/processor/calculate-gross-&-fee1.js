/**
 * Created by tapes on 2016/10/16.
 */

"use strict";

const _ = require('underscore');
const utils = require('../../main/utils');

/**
 * 计算 gross 和 fee1
 * @param orders
 */
function process(orders) {

    return orders.map((order) => {

        let result = [];

        _.times(24, (index) => {
            let processor = processors[index] || processors['default'];

            result[index] = processor(order, index);
        });

        return result;

    });

}

const processors = {
    'default': function (record, index) {
        return record[index];
    },
    0: function (record, index) {

        let cell = record[index];

        return cell.split(' ')[0];
    },
    22: function (record, index) {

        if (utils.parseNum(record[13]) + utils.parseNum(record[16]) == 0) {
            return +utils.parseNum(record[12]);
        } else {
            if (record[8].trim() == 'Amazon') {
                return utils.parseNum(record[12]) + utils.parseNum(record[16]);
            } else {
                return utils.parseNum(record[12]) + utils.parseNum(record[13]) + utils.parseNum(record[16]);
            }
        }

    },
    23: function (record, index) {

        if (utils.parseNum(record[13]) + utils.parseNum(record[16]) == 0) {
            return utils.parseNum(record[17]) + utils.parseNum(record[18]) + utils.parseNum(record[20]);
        } else {
            if (record[8].trim() == 'Amazon') {
                return utils.parseNum(record[17]) + utils.parseNum(record[18]) + utils.parseNum(record[13]) + utils.parseNum(record[20]);
            } else {
                return utils.parseNum(record[17]) + utils.parseNum(record[18]) + utils.parseNum(record[20]);
            }
        }

    }
};

exports.process = process;
