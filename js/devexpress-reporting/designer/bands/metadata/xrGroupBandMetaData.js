﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrGroupBandMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../../controls/metadata/properties/metadata");
var bandsMetadata_1 = require("./bandsMetadata");
var xrBandMetaData_1 = require("./xrBandMetaData");
var groupfieldMetaData_1 = require("./groupfieldMetaData");
var scriptMetadata_1 = require("../../controls/metadata/properties/scriptMetadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.groupUnion = {
    propertyName: 'groupUnion',
    modelName: '@GroupUnion', displayName: 'Group Union', localizationId: 'DevExpress.XtraReports.UI.GroupHeaderBand.GroupUnion', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'None', from: analytics_utils_1.fromEnum,
    valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.GroupUnion.None' },
        { value: 'WholePage', displayValue: 'Whole Page', localizationId: 'DevExpress.XtraReports.UI.GroupUnion.WholePage' },
        { value: 'WithFirstDetail', displayValue: 'With First Detail', localizationId: 'DevExpress.XtraReports.UI.GroupUnion.WithFirstDetail' }
    ]
};
exports.groupFooterUnion = {
    propertyName: 'groupFooterUnion',
    modelName: '@GroupUnion', displayName: 'Group Union', localizationId: 'DevExpress.XtraReports.UI.GroupFooterBand.GroupUnion', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'None', from: analytics_utils_1.fromEnum,
    valuesArray: [
        { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.GroupFooterUnion.None' },
        { value: 'WithLastDetail', displayValue: 'With Last Detail', localizationId: 'DevExpress.XtraReports.UI.GroupFooterUnion.WithLastDetail' }
    ]
};
var groupBand = [metadata_1.keepTogetherDefaultValueFalse, bandsMetadata_1.level, bandsMetadata_1.pageBreak, bandsMetadata_1.repeatEveryPage].concat(xrBandMetaData_1.bandSerializationInfo);
var sortingSummarySerializationsInfo = [
    { propertyName: 'enabled', modelName: '@Enabled', displayName: 'Enabled', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.Enabled', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool') },
    {
        propertyName: 'Function', modelName: '@Function', displayName: 'Function', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.Function', defaultVal: 'Sum', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
        valuesArray: metadata_1.getSummaryFunctionValues()
    },
    { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.FieldName', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('field') },
    { propertyName: 'ignoreNullValues', modelName: '@IgnoreNullValues', displayName: 'Ignore Null Values', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.IgnoreNullValues', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool') },
    {
        propertyName: 'sortOrder', modelName: '@SortOrder', displayName: 'SortOrder', localizationId: 'DevExpress.XtraReports.UI.XRGroupSortingSummary.SortOrder', defaultVal: 'Ascending', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'Ascending', displayValue: 'Ascending', localizationId: 'DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending' },
            { value: 'Descending', displayValue: 'Descending', localizationId: 'DevExpress.XtraReports.UI.XRColumnSortOrder.Descending' }
        ]
    },
];
exports.sortingSummary = { propertyName: 'sortingSummary', modelName: 'SortingSummary', displayName: 'Sorting Summary', localizationId: 'DevExpress.XtraReports.UI.GroupHeaderBand.SortingSummary', info: sortingSummarySerializationsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.groupHeaderBandSerializationInfo = [groupfieldMetaData_1.groupFields, exports.groupUnion, exports.sortingSummary, bandsMetadata_1.drillDownDetailReportExpanded,
    bandsMetadata_1.drillDownControl, scriptMetadata_1.groupHeaderBandScripts].concat(groupBand);
exports.groupFooterBandSerializationInfo = [exports.groupFooterUnion, bandsMetadata_1.printAtBottom, scriptMetadata_1.groupBandScripts].concat(groupBand);
exports.popularPropertiesGroupFooter = ['groupFooterUnion', 'pageBreak', 'keepTogether', 'repeatEveryPage', 'printAtBottom'];
exports.popularPropertiesGroupHeader = ['groupFields', 'groupUnion', 'level', 'pageBreak', 'keepTogether', bandsMetadata_1.printAcrossBands.propertyName, 'repeatEveryPage'];
