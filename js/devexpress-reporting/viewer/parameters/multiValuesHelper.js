﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\multiValuesHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var MultiValuesHelper = (function () {
    function MultiValuesHelper(value, items, selectAllValues) {
        var _this = this;
        this.items = items;
        this.selectedItems = ko.observableArray([]);
        this.value = value;
        this.dataSource = items;
        var allValues;
        this.maxDisplayedTags = ((items && items.length) || 1) - 1;
        this.isSelectedAll = ko.pureComputed({
            read: function () { return _this.value.length == items.length; },
            write: function (selectAll) {
                var newValue = selectAll ? (allValues || (allValues = items.map(function (x) { return x.value; }))) : [];
                _this.value(newValue);
            }
        });
        if (selectAllValues)
            this.isSelectedAll(true);
    }
    return MultiValuesHelper;
}());
exports.MultiValuesHelper = MultiValuesHelper;
