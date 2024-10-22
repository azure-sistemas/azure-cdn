﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\layoutOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var enums_1 = require("../../crossTab/enums");
var headerPositions = [
    { displayValue: 'Inner', value: enums_1.TotalHeaderPosition[enums_1.TotalHeaderPosition.Inner], localizationId: 'DevExpress.XtraReports.UI.CrossTab.TotalHeaderPosition.Inner' },
    { displayValue: 'Outer', value: enums_1.TotalHeaderPosition[enums_1.TotalHeaderPosition.Outer], localizationId: 'DevExpress.XtraReports.UI.CrossTab.TotalHeaderPosition.Outer' }
];
var totalsPositions = [
    { displayValue: 'AfterData', value: enums_1.TotalsPosition[enums_1.TotalsPosition.AfterData], localizationId: 'DevExpress.XtraReports.UI.CrossTab.TotalsPosition.AfterData' },
    { displayValue: 'BeforeData', value: enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData], localizationId: 'DevExpress.XtraReports.UI.CrossTab.TotalsPosition.BeforeData' },
];
exports.crossTabLayoutOptionsInfo = [
    {
        propertyName: 'cornerHeaderDisplayMode', modelName: '@CornerHeaderDisplayMode', displayName: 'Corner Header Display Mode', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.CornerHeaderDisplayMode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'RowFieldNames', valuesArray: [
            { displayValue: 'None', value: enums_1.CornerHeaderDisplayMode[enums_1.CornerHeaderDisplayMode.None], localizationId: 'DevExpress.XtraReports.UI.CrossTab.CornerHeaderDisplayMode.None' },
            { displayValue: 'Row Field Names', value: enums_1.CornerHeaderDisplayMode[enums_1.CornerHeaderDisplayMode.RowFieldNames], localizationId: 'DevExpress.XtraReports.UI.CrossTab.CornerHeaderDisplayMode.RowFieldNames' },
            { displayValue: 'Column Field Names', value: enums_1.CornerHeaderDisplayMode[enums_1.CornerHeaderDisplayMode.ColumnFieldNames], localizationId: 'DevExpress.XtraReports.UI.CrossTab.CornerHeaderDisplayMode.ColumnFieldNames' },
        ]
    }, {
        propertyName: 'dataFieldLayout', modelName: '@DataFieldLayout', displayName: 'Data Field Layout', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.DataFieldLayout', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'InRow', valuesArray: [
            { displayValue: 'In Row', value: enums_1.DataFieldLayout[enums_1.DataFieldLayout.InRow], localizationId: 'DevExpress.XtraReports.UI.CrossTab.DataFieldLayout.InRow' },
            { displayValue: 'In Column', value: enums_1.DataFieldLayout[enums_1.DataFieldLayout.InColumn], localizationId: 'DevExpress.XtraReports.UI.CrossTab.DataFieldLayout.InColumn' },
        ]
    }, { propertyName: 'columnTotalsPosition', modelName: '@ColumnTotalsPosition', displayName: 'Column Totals Position', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.ColumnTotalsPosition', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'AfterData', valuesArray: totalsPositions },
    { propertyName: 'rowTotalsPosition', modelName: '@RowTotalsPosition', displayName: 'Row Totals Position', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.RowTotalsPosition', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'AfterData', valuesArray: totalsPositions },
    { propertyName: 'columnTotalHeaderPosition', modelName: '@ColumnTotalHeaderPosition', displayName: 'Column Total Header Position', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.ColumnTotalHeaderPosition', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Outer', valuesArray: headerPositions },
    { propertyName: 'rowTotalHeaderPosition', modelName: '@RowTotalHeaderPosition', displayName: 'Row Total Header Position', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.RowTotalHeaderPosition', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Outer', valuesArray: headerPositions },
    { propertyName: 'hierarchicalRowLayout', modelName: '@HierarchicalRowLayout', displayName: 'Hierarchical Row Layout', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabLayoutOptions.HierarchicalRowLayout', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false, from: analytics_utils_1.parseBool }
];
exports.crossTabLayoutOptions = { propertyName: 'layoutOptions', modelName: 'LayoutOptions', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.LayoutOptions', displayName: 'Layout Options', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: exports.crossTabLayoutOptionsInfo };
