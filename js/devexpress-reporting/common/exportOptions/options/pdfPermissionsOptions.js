﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\options\pdfPermissionsOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var PdfPermissionsOptions = (function () {
    function PdfPermissionsOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    PdfPermissionsOptions.from = function (model, serializer) {
        return new PdfPermissionsOptions(model || {}, serializer);
    };
    PdfPermissionsOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, exports.pdfExportPermissionsOptionsSerializationInfo, refs);
    };
    PdfPermissionsOptions.prototype.getInfo = function () {
        return exports.pdfExportPermissionsOptionsSerializationInfo;
    };
    return PdfPermissionsOptions;
}());
exports.PdfPermissionsOptions = PdfPermissionsOptions;
exports.pdfExportPermissionsOptionsSerializationInfo = [
    {
        propertyName: 'printingPermissions', modelName: '@PrintingPermissions', displayName: 'Printing Permissions', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions.PrintingPermissions', defaultVal: 'None', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.PrintingPermissions.None' },
            { value: 'LowResolution', displayValue: 'LowResolution', localizationId: 'DevExpress.XtraPrinting.PrintingPermissions.LowResolution' },
            { value: 'HighResolution', displayValue: 'HighResolution', localizationId: 'DevExpress.XtraPrinting.PrintingPermissions.HighResolution' }
        ]
    },
    {
        propertyName: 'changingPermissions', modelName: '@ChangingPermissions', displayName: 'Changing Permissions', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions.ChangingPermissions', defaultVal: 'None', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.None' },
            { value: 'InsertingDeletingRotating', displayValue: 'InsertingDeletingRotating', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.InsertingDeletingRotating' },
            { value: 'FillingSigning', displayValue: 'FillingSigning', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.FillingSigning' },
            { value: 'CommentingFillingSigning', displayValue: 'CommentingFillingSigning', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.CommentingFillingSigning' },
            { value: 'AnyExceptExtractingPages', displayValue: 'AnyExceptExtractingPages', localizationId: 'DevExpress.XtraPrinting.ChangingPermissions.AnyExceptExtractingPages' }
        ]
    },
    { propertyName: 'enableCopying', modelName: '@EnableCopying', displayName: 'Enable Copying', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions.EnableCopying', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    { propertyName: 'enableScreenReaders', modelName: '@EnableScreenReaders', displayName: 'Enable Screen Readers', localizationId: 'DevExpress.XtraPrinting.PdfPermissionsOptions.EnableScreenReaders', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool }
];
