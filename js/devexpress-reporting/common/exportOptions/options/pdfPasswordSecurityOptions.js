﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfPasswordSecurityOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var pdfPermissionsOptions_1 = require("./pdfPermissionsOptions");
var PdfPasswordSecurityOptions = (function () {
    function PdfPasswordSecurityOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    PdfPasswordSecurityOptions.from = function (model, serializer) {
        return new PdfPasswordSecurityOptions(model || {}, serializer);
    };
    PdfPasswordSecurityOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, exports.pdfExportPasswordSecurityOptionsSerializationInfo, refs);
    };
    PdfPasswordSecurityOptions.prototype.getInfo = function () {
        return exports.pdfExportPasswordSecurityOptionsSerializationInfo;
    };
    PdfPasswordSecurityOptions.prototype.isPropertyDisabled = function (name) {
        if (!(this.permissionsPassword && this.permissionsPassword())) {
            if (name === 'permissionsOptions')
                return true;
            if (name === exports.pdfEncryptionLevel.propertyName)
                return !(this.openPassword && this.openPassword());
            return false;
        }
    };
    PdfPasswordSecurityOptions.prototype.hasSensitiveData = function () {
        return !!(this.openPassword && this.openPassword() || this.permissionsPassword && this.permissionsPassword());
    };
    return PdfPasswordSecurityOptions;
}());
exports.PdfPasswordSecurityOptions = PdfPasswordSecurityOptions;
exports.pdfEncryptionLevel = {
    propertyName: 'encryptionLevel', modelName: '@EncryptionLevel', displayName: 'Encryption Level', localizationId: 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.EncryptionLevel', defaultVal: 'AES128', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'ARC4', displayValue: 'ARC4', localizationId: 'DevExpress.XtraPrinting.PdfEncryptionLevel.ARC4' },
        { value: 'AES128', displayValue: 'AES128', localizationId: 'DevExpress.XtraPrinting.PdfEncryptionLevel.AES128' },
        { value: 'AES256', displayValue: 'AES256', localizationId: 'DevExpress.XtraPrinting.PdfEncryptionLevel.AES256' },
    ]
};
exports.pdfExportPasswordSecurityOptionsSerializationInfo = [
    analytics_internal_1.createPasswordSerializationInfo({ propertyName: 'openPassword', modelName: '@OpenPassword', displayName: 'Open Password', localizationId: 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.OpenPassword', defaultVal: '' }),
    exports.pdfEncryptionLevel,
    analytics_internal_1.createPasswordSerializationInfo({ propertyName: 'permissionsPassword', modelName: '@PermissionsPassword', displayName: 'Permissions Password', localizationId: 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.PermissionsPassword', defaultVal: '' }),
    { propertyName: 'permissionsOptions', modelName: 'PermissionsOptions', displayName: 'Pdf Permissions Options', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions', from: pdfPermissionsOptions_1.PdfPermissionsOptions.from, toJsonObject: pdfPermissionsOptions_1.PdfPermissionsOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') }
];
