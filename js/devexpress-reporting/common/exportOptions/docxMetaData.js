﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\docxMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var metadata_1 = require("./metadata");
var rtfMetaData_1 = require("./rtfMetaData");
var docxExportDocumentOptions_1 = require("./options/docxExportDocumentOptions");
exports.docxDocumentOptions = { propertyName: 'documentOptions', modelName: 'DocumentOptions', displayName: 'Document Options', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions.DocumentOptions', from: docxExportDocumentOptions_1.DocxExportDocumentOptions.from, toJsonObject: docxExportDocumentOptions_1.DocxExportDocumentOptions.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.docxExportOptionsSerializationInfo = [
    metadata_1.docxExportMode,
    metadata_1.exportWatermarks,
    metadata_1.pageRange,
    metadata_1.rasterizeImages,
    metadata_1.rasterizationResolution,
    rtfMetaData_1.emptyFirstPageHeaderFooter,
    rtfMetaData_1.keepRowHeight,
    metadata_1.exportPageBreaks,
    metadata_1.docxTableLayout,
    { propertyName: 'allowFloatingPictures', modelName: '@AllowFloatingPictures', localizationId: 'DevExpress.XtraPrinting.DocxExportOptions.AllowFloatingPictures', displayName: 'Allow Floating Pictures', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, defaultVal: false },
    exports.docxDocumentOptions,
];
