﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\csvMetaData.js)
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
exports.csvExportOptionsSerializationInfo = [
    metadata_1.textEncodingType,
    metadata_1.textExportMode,
    { propertyName: 'quoteStringsWithSeparators', modelName: '@QuoteStringsWithSeparators', displayName: 'Quote Strings with Separators', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.QuoteStringsWithSeparators', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    metadata_1.useCustomSeparator, metadata_1.csvTextSeparator,
    { propertyName: 'skipEmptyRows', modelName: '@SkipEmptyRows', displayName: 'Skip Empty Rows', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions.SkipEmptyRows', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    { propertyName: 'skipEmptyColumns', modelName: '@SkipEmptyColumns', displayName: 'Skip Empty Columns', localizationId: 'DevExpress.XtraPrinting.CsvExportOptions.SkipEmptyColumns', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool }
];
