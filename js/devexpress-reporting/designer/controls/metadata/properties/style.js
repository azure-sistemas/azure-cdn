﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\style.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var editorTemplates_1 = require("../../../widgets/editorTemplates");
var _backColor = { propertyName: '_backColor', modelName: '@BackColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString };
var _foreColor = { propertyName: '_foreColor', modelName: '@ForeColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString };
var _borderColor = { propertyName: '_borderColor', modelName: '@BorderColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString };
exports.styleSerializationInfo = [__assign({}, metadata_1.name)].concat(analytics_internal_1.extend(true, [], [
    analytics_internal_1.extend(true, {}, metadata_1.font, { localizable: false }), metadata_1.textAlignment,
    _foreColor,
    _backColor,
    _borderColor,
    { propertyName: 'backColor', displayName: 'Background Color', localizationId: 'DevExpress.XtraReports.UI.XRControlStyle.BackColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') },
    { propertyName: 'foreColor', displayName: 'Foreground Color', localizationId: 'DevExpress.XtraReports.UI.XRControlStyle.ForeColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') },
    { propertyName: 'borderColor', displayName: 'Border Color', localizationId: 'DevExpress.XtraReports.UI.XRControlStyle.BorderColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') },
    { propertyName: 'borders', modelName: '@Sides', displayName: 'Borders', localizationId: 'DevExpress.XtraReports.UI.XRControlStyle.Borders', editor: analytics_widgets_1.editorTemplates.getEditor('borders') },
    { propertyName: 'borderWidth', modelName: '@BorderWidthSerializable', displayName: 'Border Width', localizationId: 'DevExpress.XtraReports.UI.XRControlStyle.BorderWidth', from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }
])).concat([metadata_1.borderDashStyle], metadata_1.paddingGroup);
exports.styleSerializationInfo.forEach(function (item) { delete item.defaultVal; });
exports.styleName = { propertyName: 'styleName', modelName: '@StyleName', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), displayName: 'Style', localizationId: 'DevExpress.XtraReports.UI.ConditionFormatting.Style', defaultVal: null };
exports.evenStyleName = { propertyName: 'evenStyleName', modelName: '@EvenStyleName', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), displayName: 'Even Style', localizationId: 'DevExpress.XtraReports.UI.XRControl.XRControlStyles.EvenStyle', defaultVal: null };
exports.oddStyleName = { propertyName: 'oddStyleName', modelName: '@OddStyleName', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), displayName: 'Odd Style', localizationId: 'DevExpress.XtraReports.UI.XRControl.XRControlStyles.OddStyle', defaultVal: null };
exports.stylePriority = { propertyName: 'stylePriority', modelName: 'StylePriority', info: metadata_1.stylePrioritySerializationInfo };
var cellStyleName = { propertyName: 'cellStyleName', modelName: '@CellStyleName', displayName: 'Cell', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.Cell', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, customTotalCellStyleName = { propertyName: 'customTotalCellStyleName', modelName: '@CustomTotalCellStyleName', displayName: 'Custom Total Cell', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.CustomTotalCell', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, fieldHeaderStyleName = { propertyName: 'fieldHeaderStyleName', modelName: '@FieldHeaderStyleName', displayName: 'Field Header', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldHeader', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, fieldValueGrandTotalStyleName = { propertyName: 'fieldValueGrandTotalStyleName', modelName: '@FieldValueGrandTotalStyleName', displayName: 'Field Value Grand Total', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAppearancesBase.FieldValueGrandTotal', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, fieldValueStyleName = { propertyName: 'fieldValueStyleName', modelName: '@FieldValueStyleName', displayName: 'Field Value', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldValue', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, fieldValueTotalStyleName = { propertyName: 'fieldValueTotalStyleName', modelName: '@FieldValueTotalStyleName', displayName: 'Field Value Total', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldValueTotal', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, filterSeparatorStyleName = { propertyName: 'filterSeparatorStyleName', modelName: '@FilterSeparatorStyleName', displayName: 'Filter Separator', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FilterSeparator', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, grandTotalCellStyleName = { propertyName: 'grandTotalCellStyleName', modelName: '@GrandTotalCellStyleName', displayName: 'Grand Total Cell', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.GrandTotalCell', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, headerGroupLineStyleName = { propertyName: 'headerGroupLineStyleName', modelName: '@HeaderGroupLineStyleName', displayName: 'Header Group Line', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.HeaderGroupLine', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, linesStyleName = { propertyName: 'linesStyleName', modelName: '@LinesStyleName', displayName: 'Lines', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.Lines', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, totalCellStyleName = { propertyName: 'totalCellStyleName', modelName: '@TotalCellStyleName', displayName: 'Total Cell', localizationId: 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.TotalCell', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, generalStyleName = { propertyName: 'generalStyleName', modelName: '@GeneralStyleName', displayName: 'General Style', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.GeneralStyleName', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, dataAreaStyleName = { propertyName: 'dataAreaStyleName', modelName: '@DataAreaStyleName', displayName: 'Data Area Style', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.DataAreaStyleName', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, headerAreaStyleName = { propertyName: 'headerAreaStyleName', modelName: '@HeaderAreaStyleName', displayName: 'Header Area Style', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.HeaderAreaStyleName', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null }, totalAreaStyleName = { propertyName: 'totalAreaStyleName', modelName: '@TotalAreaStyleName', displayName: 'Total Area Style', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.TotalAreaStyleName', editor: editorTemplates_1.designerEditorTemplates.getEditor('style'), defaultVal: null };
exports.pivotGridStyles = [cellStyleName, customTotalCellStyleName, fieldHeaderStyleName, fieldValueGrandTotalStyleName, fieldValueStyleName, fieldValueTotalStyleName, filterSeparatorStyleName,
    grandTotalCellStyleName, headerGroupLineStyleName, linesStyleName, totalCellStyleName];
exports.crossTabStyles = [generalStyleName, headerAreaStyleName, dataAreaStyleName, totalAreaStyleName];
exports.crossTabStylesDefaults = {
    generalStyleName: { '@Name': 'crossTabGeneralStyle', '@BorderStyle': 'Inset', '@Padding': '2,2,0,0,100', '@Font': 'Arial, 9.75pt', '@ForeColor': 'Black', '@BackColor': 'White', '@BorderColor': '255,160,160,160', '@Sides': 'All', '@StringFormat': 'Near;Near;0;None;Character;Default' },
    dataAreaStyleName: { '@Name': 'crossTabDataStyle', '@BorderStyle': 'Inset', '@StringFormat': 'Far;Center;0;None;Character;Default', '@TextAlignment': 'MiddleRight' },
    headerAreaStyleName: { '@Name': 'crossTabHeaderStyle', '@BorderStyle': 'Inset', '@BackColor': '255,240,240,240', '@StringFormat': 'Near;Center;0;None;Character;Default', '@TextAlignment': 'MiddleLeft' },
    totalAreaStyleName: { '@Name': 'crossTabTotalStyle', '@BorderStyle': 'Inset', '@StringFormat': 'Far;Center;0;None;Character;Default', '@TextAlignment': 'MiddleRight' }
};
exports.stylesInfo = [exports.evenStyleName, exports.oddStyleName, exports.styleName].concat(exports.pivotGridStyles, exports.crossTabStyles);
exports.stylesObj = { propertyName: 'styleObj', displayName: 'Styles', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraReports.UI.XRPivotGrid.Styles' };
