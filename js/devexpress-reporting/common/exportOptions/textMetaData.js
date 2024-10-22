﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\textMetaData.js)
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
exports.textExportOptionsSerializationInfo = [
    metadata_1.textEncodingType,
    { propertyName: 'quoteStringsWithSeparators', modelName: '@QuoteStringsWithSeparators', displayName: 'Quote Strings with Separators', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.QuoteStringsWithSeparators', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    { propertyName: 'separator', modelName: '@Separator', displayName: 'Separator', localizationId: 'DevExpress.XtraPrinting.TextExportOptionsBase.Separator', defaultVal: 'TAB', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    metadata_1.textExportMode
];
