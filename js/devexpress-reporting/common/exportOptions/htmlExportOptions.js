﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\htmlExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var HtmlExportOptions = (function () {
    function HtmlExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    HtmlExportOptions.from = function (model, serializer) {
        return new HtmlExportOptions(model || {}, serializer);
    };
    HtmlExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, htmlMetaData_1.htmlExportOptionsSerializationInfo, refs);
    };
    HtmlExportOptions.prototype.getInfo = function () {
        return htmlMetaData_1.htmlExportOptionsSerializationInfo;
    };
    HtmlExportOptions.prototype.isPropertyDisabled = function (name) {
        return ((name === 'pageRange') || (name === 'pageBorderWidth') || (name === 'exportWatermarks')) && ((this.htmlExportMode ? this.htmlExportMode() : metadata_1.htmlExportMode.defaultVal) === 'SingleFile');
    };
    return HtmlExportOptions;
}());
exports.HtmlExportOptions = HtmlExportOptions;
var htmlMetaData_1 = require("./htmlMetaData");
var metadata_1 = require("./metadata");
