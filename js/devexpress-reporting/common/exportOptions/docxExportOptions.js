﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\docxExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var DocxExportOptions = (function () {
    function DocxExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    DocxExportOptions.from = function (model, serializer) {
        return new DocxExportOptions(model || {}, serializer);
    };
    DocxExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, docxMetaData_1.docxExportOptionsSerializationInfo, refs);
    };
    DocxExportOptions.prototype.getInfo = function () {
        return docxMetaData_1.docxExportOptionsSerializationInfo;
    };
    DocxExportOptions.prototype.isPropertyDisabled = function (name) {
        var exportMode = this.docxExportMode ? this.docxExportMode() : metadata_1.docxExportMode.defaultVal;
        if (name === 'pageRange' || name === 'tableLayout')
            return exportMode === 'SingleFile';
        else if (name === 'emptyFirstPageHeaderFooter' || name === 'exportPageBreaks') {
            return exportMode === 'SingleFilePageByPage';
        }
        else if (name === 'keepRowHeight') {
            return exportMode === 'SingleFilePageByPage' && !this.tableLayout();
        }
    };
    return DocxExportOptions;
}());
exports.DocxExportOptions = DocxExportOptions;
var metadata_1 = require("./metadata");
var docxMetaData_1 = require("./docxMetaData");
