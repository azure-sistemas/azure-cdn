﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\pdfMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var pdfExportDocumentOptions_1 = require("./options/pdfExportDocumentOptions");
var pdfPasswordSecurityOptions_1 = require("./options/pdfPasswordSecurityOptions");
exports.pdfACompatibilityValues = { None: 'None', PdfA1b: 'PdfA1b', PdfA2b: 'PdfA2b', PdfA3b: 'PdfA3b' };
exports.pdfACompatibility = {
    propertyName: 'pdfACompatibility', modelName: '@PdfACompatibility', displayName: 'PDF A Compatibility', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.PdfACompatibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: exports.pdfACompatibilityValues.None, from: analytics_utils_1.fromEnum,
    valuesArray: [
        { value: exports.pdfACompatibilityValues.None, displayValue: exports.pdfACompatibilityValues.None, localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.None' },
        { value: exports.pdfACompatibilityValues.PdfA1b, displayValue: exports.pdfACompatibilityValues.PdfA1b, localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.PdfA1b' },
        { value: exports.pdfACompatibilityValues.PdfA2b, displayValue: exports.pdfACompatibilityValues.PdfA2b, localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.PdfA2b' },
        { value: exports.pdfACompatibilityValues.PdfA3b, displayValue: exports.pdfACompatibilityValues.PdfA3b, localizationId: 'DevExpress.XtraPrinting.PdfACompatibility.PdfA3b' }
    ]
};
exports.pdfUACompatibilityValues = { None: 'None', PdfUA1: 'PdfUA1' };
exports.pdfUACompatibility = {
    propertyName: 'pdfUACompatibility', modelName: '@PdfUACompatibility', displayName: 'PDF UA Compatibility', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.PdfUACompatibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: exports.pdfUACompatibilityValues.None, from: analytics_utils_1.fromEnum,
    valuesArray: [
        { value: exports.pdfUACompatibilityValues.None, displayValue: exports.pdfACompatibilityValues.None, localizationId: 'DevExpress.XtraPrinting.PdfUACompatibility.None' },
        { value: exports.pdfUACompatibilityValues.PdfUA1, displayValue: exports.pdfUACompatibilityValues.PdfUA1, localizationId: 'DevExpress.XtraPrinting.PdfUACompatibility.PdfUA1' }
    ]
};
exports.pdfExportOptionsSerializationInfo = [
    { propertyName: 'convertImagesToJpeg', modelName: '@ConvertImagesToJpeg', displayName: 'Convert Images to Jpeg', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.ConvertImagesToJpeg', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    { propertyName: 'showPrintDialogOnOpen', modelName: '@ShowPrintDialogOnOpen', displayName: 'Show Print Dialog on Open', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.ShowPrintDialogOnOpen', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    { propertyName: 'neverEmbeddedFonts', modelName: '@NeverEmbeddedFonts', displayName: 'Never Embedded Fonts', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.NeverEmbeddedFonts', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'exportEditingFieldsToAcroForms', modelName: '@ExportEditingFieldsToAcroForms', displayName: 'Export Editing Fields To AcroForms', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.ExportEditingFieldsToAcroForms', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    {
        propertyName: 'imageQuality', modelName: '@ImageQuality', displayName: 'Image Quality', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.ImageQuality', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Highest', from: analytics_utils_1.fromEnum,
        valuesArray: [
            { value: 'Lowest', displayValue: 'Lowest', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.Lowest' },
            { value: 'Low', displayValue: 'Low', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.Low' },
            { value: 'Medium', displayValue: 'Medium', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.Medium' },
            { value: 'High', displayValue: 'High', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.High' },
            { value: 'Highest', displayValue: 'Highest', localizationId: 'DevExpress.XtraPrinting.PdfJpegImageQuality.Highest' }
        ]
    },
    exports.pdfACompatibility,
    metadata_1.pageRange,
    metadata_1.rasterizationResolution,
    metadata_1.rasterizeImages,
    { propertyName: 'documentOptions', modelName: 'DocumentOptions', displayName: 'Document Options', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.DocumentOptions', from: pdfExportDocumentOptions_1.PdfExportDocumentOptions.from, toJsonObject: pdfExportDocumentOptions_1.PdfExportDocumentOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') },
    { propertyName: 'pdfPasswordSecurityOptions', modelName: 'PasswordSecurityOptions', displayName: 'Pdf Password Security Options', localizationId: 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions', from: pdfPasswordSecurityOptions_1.PdfPasswordSecurityOptions.from, toJsonObject: pdfPasswordSecurityOptions_1.PdfPasswordSecurityOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') }
];
