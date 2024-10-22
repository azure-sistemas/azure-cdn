﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\xrCrossTabCell.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var metadata_1 = require("../properties/metadata");
var metadataGroups_1 = require("../properties/metadataGroups");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var fields_1 = require("./fields");
var _metaUtils_1 = require("../../utils/_metaUtils");
var dataBinding_1 = require("../../../dataObjects/metadata/dataBinding");
exports.autoSizeMode = _metaUtils_1.valuesArrayAsEnumWithLocalizationId(metadata_1.textFitMode, 'DevExpress.XtraReports.UI.AutoSizeMode.');
exports.rowVisible = { propertyName: 'rowVisible', modelName: '@RowVisible', displayName: 'Row Visible', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true, from: analytics_utils_1.parseBool };
exports.columnVisible = { propertyName: 'columnVisible', modelName: '@ColumnVisible', displayName: 'Column Visible', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true, from: analytics_utils_1.parseBool };
exports.rowAutoHeightMode = { propertyName: 'rowAutoHeightMode', modelName: '@RowAutoHeightMode', displayName: 'Row Auto Height Mode', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'None', valuesArray: exports.autoSizeMode };
exports.columnAutoWidthMode = { propertyName: 'columnAutoWidthMode', modelName: '@ColumnAutoWidthMode', displayName: 'Column Auto Width Mode', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'None', valuesArray: exports.autoSizeMode };
exports.crossTabCellOptionsInfo = [
    fields_1.crossTabFieldName,
    metadata_1.angle,
    exports.columnAutoWidthMode,
    exports.rowAutoHeightMode,
    exports.columnVisible,
    exports.rowVisible,
    metadata_1.keepTogether
].concat(fields_1.crossTabDataFieldInfoBase, fields_1.crossTabGroupFieldInfoBase);
exports.columnIndex = { propertyName: '_columnIndex', modelName: '@ColumnIndex', displayName: 'Column Index', localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.ColumnIndex', defaultVal: 0, from: analytics_utils_1.floatFromModel, alwaysSerialize: true, disabled: true, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.rowIndex = { propertyName: '_rowIndex', modelName: '@RowIndex', displayName: 'Row Index', localizationId: 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell.RowIndex', defaultVal: 0, from: analytics_utils_1.floatFromModel, alwaysSerialize: true, disabled: true, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.cellserializtionInfoBase = [
    exports.columnIndex,
    exports.rowIndex,
    { propertyName: '_columnSpan', modelName: '@ColumnSpan', defaultVal: 1, from: analytics_utils_1.floatFromModel },
    { propertyName: '_rowSpan', modelName: '@RowSpan', defaultVal: 1, from: analytics_utils_1.floatFromModel }
];
exports.cellserializtionInfo = exports.cellserializtionInfoBase.concat(metadataGroups_1.baseControlProperties, metadataGroups_1.sizeLocation, metadataGroups_1.bookmarkGroup, exports.crossTabCellOptionsInfo, metadataGroups_1.commonControlProperties, dataBinding_1.dataBindings(['Text', 'Tag']), metadata_1.nullValueText, metadata_1.text, metadata_1.textFormatString, metadata_1.textAlignment, metadata_1.font, metadata_1.foreColor);
