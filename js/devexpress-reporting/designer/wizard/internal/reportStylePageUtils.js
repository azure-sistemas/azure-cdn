﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\reportStylePageUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ReportStyle;
(function (ReportStyle) {
    ReportStyle[ReportStyle["Bold"] = 0] = "Bold";
    ReportStyle[ReportStyle["Casual"] = 1] = "Casual";
    ReportStyle[ReportStyle["Compact"] = 2] = "Compact";
    ReportStyle[ReportStyle["Corporate"] = 3] = "Corporate";
    ReportStyle[ReportStyle["Formal"] = 4] = "Formal";
})(ReportStyle = exports.ReportStyle || (exports.ReportStyle = {}));
var ReportStyleItem = (function () {
    function ReportStyleItem(textDefault, textID, reportStyle) {
        this.reportStyle = reportStyle;
        this.text = analytics_utils_1.getLocalization(textDefault, textID);
    }
    Object.defineProperty(ReportStyleItem.prototype, "className", {
        get: function () {
            return 'dxrd-wizard-report-style-image ' + ReportStyle[this.reportStyle].toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    return ReportStyleItem;
}());
exports.ReportStyleItem = ReportStyleItem;
