﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\xlsMetaData.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var documentOptionsSerializationsInfo = [
    pdfExportDocumentOptions_1.author, pdfExportDocumentOptions_1.application, pdfExportDocumentOptions_1.title, pdfExportDocumentOptions_1.subject,
    { propertyName: 'tags', modelName: '@Tags', displayName: 'Tags', localizationId: 'DevExpress.XtraPrinting.XlDocumentOptions.Tags', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'category', modelName: '@Category', displayName: 'Category', localizationId: 'DevExpress.XtraPrinting.XlDocumentOptions.Category', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'comments', modelName: '@Comments', displayName: 'Comments', localizationId: 'DevExpress.XtraPrinting.XlDocumentOptions.Comments', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'company', modelName: '@Company', displayName: 'Company', localizationId: 'DevExpress.XtraPrinting.XlDocumentOptions.Company', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') }
];
var documentOptions = { propertyName: 'documentOptions', modelName: 'DocumentOptions', displayName: 'Document Options', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.DocumentOptions', info: documentOptionsSerializationsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
var encryptionOptionsSerializationsInfo = [
    {
        propertyName: 'type', modelName: '@Type', displayName: 'Type', localizationId: 'DevExpress.XtraPrinting.XlEncryptionOptions.Type', defaultVal: 'Strong', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), from: analytics_utils_1.fromEnum,
        valuesArray: [
            { value: 'Strong', displayValue: 'Strong', localizationId: 'DevExpress.XtraPrinting.XlEncryptionType.Strong' },
            { value: 'Compatible', displayValue: 'Compatible', localizationId: 'DevExpress.XtraPrinting.XlEncryptionType.Compatible' }
        ]
    },
    analytics_internal_1.createPasswordSerializationInfo({ propertyName: 'password', modelName: '@Password', displayName: 'Password', localizationId: 'DevExpress.XtraPrinting.XlEncryptionOptions.Password', defaultVal: '' })
];
var encryptionOptions = { propertyName: 'encryptionOptions', modelName: 'EncryptionOptions', displayName: 'Encryption Options', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.EncryptionOptions', info: encryptionOptionsSerializationsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.xlsExportOptionsSerializationInfoCommon = [
    metadata_1.xlsExportHyperlinks,
    metadata_1.pageRange,
    metadata_1.xlsRawDataMode,
    metadata_1.xlsExportOptionsSheetName,
    metadata_1.xlsShowGridLines,
    metadata_1.xlsTextExportMode,
    metadata_1.rasterizeImages,
    metadata_1.rasterizationResolution,
    { propertyName: 'fitToPrintedPageWidth', modelName: '@FitToPrintedPageWidth', displayName: 'Fit To Printed Page Width', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.FitToPrintedPageWidth', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    { propertyName: 'fitToPrintedPageHeight', modelName: '@FitToPrintedPageHeight', displayName: 'Fit To Printed Page Height', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.FitToPrintedPageHeight', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    {
        propertyName: 'ignoreErrors', modelName: '@IgnoreErrors', displayName: 'Ignore Errors', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.IgnoreErrors', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'None', from: analytics_utils_1.fromEnum, valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.XlIgnoreErrors.None' },
            { value: 'NumberStoredAsText', displayValue: 'Number Stored As Text', localizationId: 'DevExpress.XtraPrinting.XlIgnoreErrors.NumberStoredAsText' }
        ]
    },
    {
        propertyName: 'rightToLeftDocument', modelName: '@RightToLeftDocument', displayName: 'Right To Left Document', localizationId: 'DevExpress.XtraPrinting.XlExportOptionsBase.RightToLeftDocument', defaultVal: 'Default', from: analytics_utils_1.fromEnum, editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [
            { value: 'True', displayValue: 'True', localizationId: 'DevExpress.Utils.DefaultBoolean.True' },
            { value: 'False', displayValue: 'False', localizationId: 'DevExpress.Utils.DefaultBoolean.False' },
            { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.Utils.DefaultBoolean.Default' }
        ]
    },
    documentOptions,
    encryptionOptions
];
exports.xlsExportOptionsSerializationInfoBase = [
    { propertyName: 'suppress256ColumnsWarning', modelName: '@Suppress256ColumnsWarning', displayName: 'Suppress 256 Columns Warning', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.Suppress256ColumnsWarning', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    { propertyName: 'suppress65536RowsWarning', modelName: '@Suppress65536RowsWarning', displayName: 'Suppress 65536 Rows Warning', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.Suppress65536RowsWarning', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    {
        propertyName: 'workbookColorPaletteCompliance', modelName: '@WorkbookColorPaletteCompliance', displayName: 'Workbook Color Palette Compliance', localizationId: 'DevExpress.XtraPrinting.XlsExportOptions.WorkbookColorPaletteCompliance', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'ReducePaletteForExactColors', from: analytics_utils_1.fromEnum,
        valuesArray: [
            { value: 'ReducePaletteForExactColors', displayValue: 'ReducePaletteForExactColors', localizationId: 'DevExpress.XtraPrinting.WorkbookColorPaletteCompliance.ReducePaletteForExactColors' },
            { value: 'AdjustColorsToDefaultPalette', displayValue: 'AdjustColorsToDefaultPalette', localizationId: 'DevExpress.XtraPrinting.WorkbookColorPaletteCompliance.AdjustColorsToDefaultPalette' }
        ]
    }
];
exports.xlsExportOptionsSerializationInfo = [metadata_1.xlsExportMode].concat(exports.xlsExportOptionsSerializationInfoCommon, exports.xlsExportOptionsSerializationInfoBase);
