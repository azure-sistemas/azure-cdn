﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\pdfExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var pdfMetaData_1 = require("./pdfMetaData");
var PdfExportOptions = (function () {
    function PdfExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    PdfExportOptions.from = function (model, serializer) {
        return new PdfExportOptions(model || {}, serializer);
    };
    PdfExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, pdfMetaData_1.pdfExportOptionsSerializationInfo, refs);
    };
    PdfExportOptions.prototype.isPropertyDisabled = function (propertyName) {
        var _pdfACompatibility = this.pdfACompatibility ? this.pdfACompatibility() : pdfMetaData_1.pdfACompatibility.defaultVal;
        var _pdfUACompatibility = this.pdfUACompatibility ? this.pdfUACompatibility() : pdfMetaData_1.pdfUACompatibility.defaultVal;
        if (propertyName === 'exportEditingFieldsToAcroForms')
            return _pdfACompatibility === pdfMetaData_1.pdfACompatibilityValues.PdfA1b;
        else if (propertyName === 'neverEmbeddedFonts')
            return _pdfACompatibility != pdfMetaData_1.pdfACompatibilityValues.None || _pdfUACompatibility != pdfMetaData_1.pdfUACompatibilityValues.None;
        else if (propertyName === 'pdfPasswordSecurityOptions' || propertyName === 'showPrintDialogOnOpen')
            return _pdfACompatibility != pdfMetaData_1.pdfACompatibilityValues.None;
    };
    PdfExportOptions.prototype.getInfo = function () {
        return pdfMetaData_1.pdfExportOptionsSerializationInfo;
    };
    PdfExportOptions.prototype.hasSensitiveData = function () {
        return this.pdfPasswordSecurityOptions && this.pdfPasswordSecurityOptions.hasSensitiveData();
    };
    return PdfExportOptions;
}());
exports.PdfExportOptions = PdfExportOptions;
