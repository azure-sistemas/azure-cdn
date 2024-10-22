﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\exportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exportOptionsMetaData_1 = require("./exportOptionsMetaData");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ExportOptions = (function () {
    function ExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    ExportOptions.from = function (model, serializer) {
        return new ExportOptions(model || {}, serializer);
    };
    ExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, exportOptionsMetaData_1.exportOptionsSerializationInfo, refs);
    };
    ExportOptions.prototype.getInfo = function () {
        return exportOptionsMetaData_1.exportOptionsSerializationInfo;
    };
    return ExportOptions;
}());
exports.ExportOptions = ExportOptions;
