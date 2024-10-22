﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\fields.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var metadata_1 = require("../properties/metadata");
var sortBySummary_1 = require("../pivotgrid/sortBySummary");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var pivotgridfield_1 = require("../pivotgrid/pivotgridfield");
var _metaUtils_1 = require("../../utils/_metaUtils");
exports.crossTabFieldName = { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabFieldBase.FieldName', editor: analytics_widgets_1.editorTemplates.getEditor('field'), defaultVal: '' };
var valuesGroupInterval = _metaUtils_1.valuesArrayAsEnumWithLocalizationId(pivotgridfield_1.groupInterval, 'DevExpress.XtraReports.UI.CrossTab.GroupInterval.').filter(function (item) { return item.value !== 'Custom'; });
exports.crossTabGroupInterval = { propertyName: 'crossTabGroupInterval', modelName: '@GroupInterval', displayName: 'Group Interval', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabGroupFieldBase.GroupInterval', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: valuesGroupInterval };
exports.crossTabGroupIntervalNumericRange = { propertyName: 'crossTabGroupIntervalNumericRange', modelName: '@GroupIntervalNumericRange', displayName: 'Group Interval Numeric Range', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabGroupFieldBase.GroupIntervalNumericRange', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 10 };
var valuesArraySummaryType = _metaUtils_1.valuesArrayAsEnumWithLocalizationId(sortBySummary_1.summaryType, 'DevExpress.XtraReports.UI.CrossTab.SummaryType.');
valuesArraySummaryType = valuesArraySummaryType.filter(function (item) { return item.value !== 'Custom'; });
exports.crossTabSummaryType = analytics_internal_1.extend({}, sortBySummary_1.summaryType, { localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabDataField.SummaryType', valuesArray: valuesArraySummaryType });
exports.crossTabSortBySummaryInfo = { propertyName: 'crossTabSortBySummaryInfo', modelName: '@SortBySummaryInfo', displayName: 'Sort By Summary Info', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabGroupFieldBase.SortBySummaryInfo', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: [analytics_internal_1.extend({}, exports.crossTabFieldName, { localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabFieldSortBySummaryInfo.FieldName' }), exports.crossTabSummaryType] };
var summaryDisplayTypeValuesArray = _metaUtils_1.valuesArrayAsEnumWithLocalizationId(pivotgridfield_1.summaryDisplayType, 'DevExpress.XtraReports.UI.CrossTab.SummaryDisplayType.');
var crossTabSummaryDisplayType = { propertyName: 'summaryDisplayType', modelName: '@SummaryDisplayType', displayName: 'Summary Display Type', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabDataField.SummaryDisplayType', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Default', valuesArray: summaryDisplayTypeValuesArray };
exports.crossTabDataFieldInfoBase = [exports.crossTabSummaryType, crossTabSummaryDisplayType];
exports.crossTabDataFieldInfo = exports.crossTabDataFieldInfoBase.concat([exports.crossTabFieldName]);
exports.sortOrderdefaultValAscending = analytics_internal_1.extend({}, metadata_1.sortOrder, { defaultVal: 'Ascending' });
exports.crossTabGroupFieldInfoBase = [exports.sortOrderdefaultValAscending, exports.crossTabGroupInterval, exports.crossTabGroupIntervalNumericRange, exports.crossTabSortBySummaryInfo];
exports.crossTabGroupFieldInfo = exports.crossTabGroupFieldInfoBase.concat([exports.crossTabFieldName]);
exports.rowFields = { propertyName: 'rowFields', modelName: 'RowFields', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.RowFields', displayName: 'Row Fields', array: true, editor: { custom: 'dx-commonCollection' }, template: '#dxrd-collectionItemWithAccordion', alwaysSerialize: true };
exports.columnFields = { propertyName: 'columnFields', modelName: 'ColumnFields', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.ColumnFields', displayName: 'Column Fields', array: true, editor: { custom: 'dx-commonCollection' }, template: '#dxrd-collectionItemWithAccordion', alwaysSerialize: true };
exports.dataFields = { propertyName: 'dataFields', modelName: 'DataFields', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.DataFields', displayName: 'Data Fields', array: true, editor: { custom: 'dx-commonCollection' }, template: '#dxrd-collectionItemWithAccordion', alwaysSerialize: true };
