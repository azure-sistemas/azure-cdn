﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_summaryOptionsPageUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var SummaryOptionsWrapper = (function () {
    function SummaryOptionsWrapper(name, displayName) {
        this.avg = ko.observable(false);
        this.count = ko.observable(false);
        this.max = ko.observable(false);
        this.min = ko.observable(false);
        this.sum = ko.observable(false);
        this._name = name;
        this.columnName = displayName;
    }
    SummaryOptionsWrapper._getNumber = function (value) {
        return value ? 1 : 0;
    };
    SummaryOptionsWrapper.prototype.getOptions = function () {
        return {
            columnName: this._name,
            flags: SummaryOptionsWrapper._getNumber(this.sum()) << 0 |
                SummaryOptionsWrapper._getNumber(this.avg()) << 1 |
                SummaryOptionsWrapper._getNumber(this.min()) << 2 |
                SummaryOptionsWrapper._getNumber(this.max()) << 3 |
                SummaryOptionsWrapper._getNumber(this.count()) << 4
        };
    };
    return SummaryOptionsWrapper;
}());
exports.SummaryOptionsWrapper = SummaryOptionsWrapper;
