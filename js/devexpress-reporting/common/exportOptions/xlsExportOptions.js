﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\xlsExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var XlsExportOptions = (function () {
    function XlsExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    XlsExportOptions.from = function (model, serializer) {
        return new XlsExportOptions(model || {}, serializer);
    };
    XlsExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, xlsMetaData_1.xlsExportOptionsSerializationInfo, refs);
    };
    XlsExportOptions.prototype.getInfo = function () {
        return xlsMetaData_1.xlsExportOptionsSerializationInfo;
    };
    XlsExportOptions.prototype.isPropertyDisabled = function (name) {
        return name === 'pageRange' && (this.xlsExportMode ? this.xlsExportMode() : metadata_1.xlsExportMode.defaultVal) === 'SingleFile';
    };
    XlsExportOptions.prototype.hasSensitiveData = function () {
        return !!(this.encryptionOptions && this.encryptionOptions.password());
    };
    return XlsExportOptions;
}());
exports.XlsExportOptions = XlsExportOptions;
var xlsMetaData_1 = require("./xlsMetaData");
