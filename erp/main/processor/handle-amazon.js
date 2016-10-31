/**
 * Created by tapes on 2016/10/31.
 */

"use strict";

const utils = require('../utils');

function cutOutFBA(orderNumber) {
    let flag = '-FBA';
    let index = orderNumber.indexOf(flag);

    return index > -1 ? orderNumber.slice(0, index) : orderNumber;
}

function process (orders) {

    let _orders = [];

    orders.forEach(function (order) {
        let orderNumbers = order[4].split('+');
        let percentages = [0.6, 0.4];
        let method = ['floor', 'ceil'];

        if (orderNumbers.length > 1) {
            orderNumbers.forEach((orderNumber, index) => {

                let _order = utils.deepCopy(order);

                orderNumber = cutOutFBA(orderNumber);

                _order[4] = utils.getRealOrderNumber(orderNumber);

                _order[22] = Math[method[index]](order[22] * percentages[index]);
                _order[23] = Math[method[index]](order[23] * percentages[index]);
                _order[24] = utils.getRealOrderSales(orderNumber);

                _orders.push(_order);
            });
        } else {
            let _order = utils.deepCopy(order);

            _order[4] = utils.getRealOrderNumber(_order[4]);
            _order[24] = utils.getRealOrderSales(_order[4]);
            _orders.push(_order);
        }

    });

    return _orders;

}

exports.process = process;
