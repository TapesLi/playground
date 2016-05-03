"use strict";

var _ = require('lodash');

function Spec(options) {
    this.second = _.trim(options.second);
    this.minute = _.trim(options.minute);
    this.hour = _.trim(options.hour);
    this.dayOfMonth = _.trim(options.dayOfMonth);
    this.month = _.trim(options.month);
    this.dayOfWeek = _.trim(options.dayOfWeek);
}

Spec.prototype.toFormat = function () {
    var arr = [this.second, this.minute, this.hour, this.dayOfMonth, this.month, this.dayOfWeek];
    return arr.reduce(function (memo, item) {
        return memo + ' ' + (_.isEmpty(item) ? '*' : item);
    }, '').trim();
};

module.exports = Spec;