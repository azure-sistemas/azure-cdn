﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\rtfExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rtfMetaData_1 = require("./rtfMetaData");
var metadata_1 = require("./metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var RtfExportOptions = (function () {
    function RtfExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    RtfExportOptions.from = function (model, serializer) {
        return new RtfExportOptions(model || {}, serializer);
    };
    RtfExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, rtfMetaData_1.rtfExportOptionsSerializationInfo, refs);
    };
    RtfExportOptions.prototype.getInfo = function () {
        return rtfMetaData_1.rtfExportOptionsSerializationInfo;
    };
    RtfExportOptions.prototype.isPropertyDisabled = function (name) {
        var exportMode = this.rtfExportMode ? this.rtfExportMode() : metadata_1.rtfExportMode.defaultVal;
        if (name === 'pageRange')
            return exportMode === 'SingleFile';
        else if (name === 'emptyFirstPageHeaderFooter' || name === 'exportPageBreaks' || name === 'keepRowHeight') {
            return exportMode === 'SingleFilePageByPage';
        }
    };
    return RtfExportOptions;
}());
exports.RtfExportOptions = RtfExportOptions;
