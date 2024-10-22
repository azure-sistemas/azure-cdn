﻿/**
* DevExpress HTML/JS Reporting (chart\_dateUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
function parseDate(val) {
    if (!val)
        return null;
    if (val instanceof Date)
        return val;
    var chartDateParts = val.split('.');
    var date = analytics_internal_1.parseDate(chartDateParts[0]);
    if ((chartDateParts.length > 1) && date && (chartDateParts[1].length === 3)) {
        var milliseconds = parseInt(chartDateParts[1]);
        milliseconds && date.setMilliseconds(milliseconds);
    }
    return date;
}
exports.parseDate = parseDate;
function serializeDate(date) {
    var milliseconds = date.getMilliseconds().toString();
    var zeros;
    switch (3 - milliseconds.length) {
        case 2:
            zeros = '00';
            break;
        case 1:
            zeros = '0';
            break;
        default:
            zeros = '';
    }
    return analytics_utils_1.serializeDate(date) + '.' + zeros + milliseconds;
}
exports.serializeDate = serializeDate;
