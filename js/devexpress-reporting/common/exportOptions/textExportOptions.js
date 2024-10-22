﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\textExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textMetaData_1 = require("./textMetaData");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var TextExportOptions = (function () {
    function TextExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    TextExportOptions.from = function (model, serializer) {
        return new TextExportOptions(model || {}, serializer);
    };
    TextExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, textMetaData_1.textExportOptionsSerializationInfo, refs);
    };
    TextExportOptions.prototype.getInfo = function () {
        return textMetaData_1.textExportOptionsSerializationInfo;
    };
    return TextExportOptions;
}());
exports.TextExportOptions = TextExportOptions;
