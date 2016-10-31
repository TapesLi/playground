/**
 * Created by tapes on 2016/10/31.
 */

"use strict";

const utils = require('../utils');

function process (orders) {
    return orders.map((order, index) => {
        return {
            'NO': index + 1,
            'Date': order[0],
            'Name': '',
            'Currency': 'JPY',
            'Gross': order[22] >= 0 ? order[22] : 0,
            'Fee1': order[22] >= 0 ? Math.abs(order[23]) : Math.abs(utils.parseNum(order[17]) + utils.parseNum(order[18])),
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

}

exports.process = process;
