﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\xlsxExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var XlsxExportOptions = (function () {
    function XlsxExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    XlsxExportOptions.from = function (model, serializer) {
        return new XlsxExportOptions(model || {}, serializer);
    };
    XlsxExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, xlsxMetaData_1.xlsxExportOptionsSerializationInfo, refs);
    };
    XlsxExportOptions.prototype.getInfo = function () {
        return xlsxMetaData_1.xlsxExportOptionsSerializationInfo;
    };
    XlsxExportOptions.prototype.isPropertyDisabled = function (name) {
        return name === 'pageRange' && (this.xlsxExportMode ? this.xlsxExportMode() : metadata_1.xlsxExportMode.defaultVal) === 'SingleFile';
    };
    XlsxExportOptions.prototype.hasSensitiveData = function () {
        return !!(this.encryptionOptions && this.encryptionOptions.password());
    };
    return XlsxExportOptions;
}());
exports.XlsxExportOptions = XlsxExportOptions;
var xlsxMetaData_1 = require("./xlsxMetaData");
