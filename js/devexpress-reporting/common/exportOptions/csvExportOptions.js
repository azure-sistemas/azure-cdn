﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\csvExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var CsvExportOptions = (function () {
    function CsvExportOptions(model, serializer) {
        var _this = this;
        this.defaultSeparatorValue = '';
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
        this.useCustomSeparator = ko.observable(this.separator && this.separator() !== this.defaultSeparatorValue);
        var separatorValue = ko.observable(this.separator());
        this.useCustomSeparator.subscribe(function (newValue) {
            if (!newValue)
                separatorValue(_this.defaultSeparatorValue);
        });
        this.separator = ko.computed({
            read: function () { return separatorValue(); },
            write: function (newValue) {
                separatorValue(newValue);
                if (_this.useCustomSeparator)
                    _this.useCustomSeparator(newValue !== _this.defaultSeparatorValue);
            }
        });
    }
    CsvExportOptions.from = function (model, serializer) {
        return new CsvExportOptions(model || {}, serializer);
    };
    CsvExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, csvMetaData_1.csvExportOptionsSerializationInfo, refs);
    };
    CsvExportOptions.prototype.getInfo = function () {
        return csvMetaData_1.csvExportOptionsSerializationInfo;
    };
    CsvExportOptions.prototype.isPropertyDisabled = function (name) {
        return (name === 'separator') && !(this.useCustomSeparator && this.useCustomSeparator());
    };
    return CsvExportOptions;
}());
exports.CsvExportOptions = CsvExportOptions;
var csvMetaData_1 = require("./csvMetaData");
