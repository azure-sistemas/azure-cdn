﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\rtfMetaData.js)
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
exports.rtfExportOptionsSerializationInfoBase = [
    metadata_1.pageRange,
    metadata_1.rasterizationResolution,
    metadata_1.exportPageBreaks,
    metadata_1.exportWatermarks
];
exports.emptyFirstPageHeaderFooter = { propertyName: 'emptyFirstPageHeaderFooter', modelName: '@EmptyFirstPageHeaderFooter', displayName: 'Empty First Page Header/Footer', localizationId: 'DevExpress.XtraPrinting.FormattedTextExportOptions.EmptyFirstPageHeaderFooter', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool };
exports.keepRowHeight = { propertyName: 'keepRowHeight', modelName: '@KeepRowHeight', displayName: 'Keep Row Height', localizationId: 'DevExpress.XtraPrinting.FormattedTextExportOptions.KeepRowHeight', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool };
exports.rtfExportOptionsSerializationInfo = [
    exports.emptyFirstPageHeaderFooter,
    exports.keepRowHeight,
    metadata_1.rtfExportMode
].concat(exports.rtfExportOptionsSerializationInfoBase);
