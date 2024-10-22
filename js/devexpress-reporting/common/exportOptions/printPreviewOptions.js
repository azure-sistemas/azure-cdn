﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\printPreviewOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var PrintPreviewOptions = (function () {
    function PrintPreviewOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    PrintPreviewOptions.from = function (model, serializer) {
        return new PrintPreviewOptions(model || {}, serializer);
    };
    PrintPreviewOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, printPreviewMetaData_1.printPreviewOptionsSerializationInfo, refs);
    };
    PrintPreviewOptions.prototype.getInfo = function () {
        return printPreviewMetaData_1.printPreviewOptionsSerializationInfo;
    };
    return PrintPreviewOptions;
}());
exports.PrintPreviewOptions = PrintPreviewOptions;
var printPreviewMetaData_1 = require("./printPreviewMetaData");
