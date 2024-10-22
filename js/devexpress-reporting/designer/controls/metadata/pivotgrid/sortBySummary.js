﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\pivotgrid\sortBySummary.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.summaryTypeValues = [
    { value: 'Count', displayValue: 'Count', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Count' },
    { value: 'Sum', displayValue: 'Sum', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Sum' },
    { value: 'Min', displayValue: 'Min', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Min' },
    { value: 'Max', displayValue: 'Max', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Max' },
    { value: 'Average', displayValue: 'Average', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Average' },
    { value: 'StdDev', displayValue: 'Standard Deviation', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.StdDev' },
    { value: 'StdDevp', displayValue: 'Standard Deviation for Entire Population', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.StdDevp' },
    { value: 'Var', displayValue: 'Variation', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Var' },
    { value: 'Varp', displayValue: 'Variation for Entire Population', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Varp' },
    { value: 'Custom', displayValue: 'Custom', localizationId: 'DevExpress.Data.PivotGrid.PivotSummaryType.Custom' }
];
exports.summaryType = {
    propertyName: 'summaryType', modelName: '@SummaryType', displayName: 'Summary Type', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SummaryType',
    defaultVal: 'Sum', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: exports.summaryTypeValues
};
exports.fieldComponentName = {
    propertyName: 'fieldComponentName', modelName: '@FieldComponentName', displayName: 'Field', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.Field',
    defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: '', displayValue: '(none)', localizationId: 'ChartStringId.WizNoBackImage' }]
};
exports.conditions = {
    propertyName: 'conditions', modelName: 'Conditions', displayName: 'Conditions', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.Conditions', array: true,
    template: '#dxrd-commonCollectionItem',
    editor: { custom: 'dxrd-pivot-sortBySummaryInfo-conditions' }
};
exports.field = { propertyName: 'fieldName', modelName: '@FieldName', displayName: 'Field Name', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.FieldName', defaultVal: null, editor: analytics_widgets_1.editorTemplates.getEditor('text') };
exports.customTotalSummaryType = {
    propertyName: 'customTotalSummaryType', modelName: '@CustomTotalSummaryType', displayName: 'Custom Total Summary Type', localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.CustomTotalSummaryType',
    defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: '', displayValue: '(none)', localizationId: 'ChartStringId.WizNoBackImage' }].concat(exports.summaryTypeValues)
};
exports.sortBySummaryInfo = [exports.conditions, exports.customTotalSummaryType, exports.fieldComponentName, exports.field, exports.summaryType];
exports.sortBySummaryConditionInfo = [
    exports.fieldComponentName,
    { modelName: '@Value', propertyName: 'value', displayName: 'Value', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Value' },
    {
        modelName: '@Value_type', propertyName: 'valueType', displayName: 'Type', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: '<Null>', valuesArray: [
            { value: 'System.String', displayValue: 'String', localizationId: 'UtilsUIStringId.Parameter_Type_String' },
            { value: 'System.Byte', displayValue: 'Number (8 bit integer)', localizationId: 'DataAccessStringId.Type_SByte' },
            { value: 'System.Int16', displayValue: 'Number (16 bit integer)', localizationId: 'UtilsUIStringId.Parameter_Type_Int16' },
            { value: 'System.Int32', displayValue: 'Number (32 bit integer)', localizationId: 'UtilsUIStringId.Parameter_Type_Int32' },
            { value: 'System.Int64', displayValue: 'Number (64 bit integer)', localizationId: 'UtilsUIStringId.Parameter_Type_Int64' },
            { value: 'System.Single', displayValue: 'Number (floating-point)', localizationId: 'UtilsUIStringId.Parameter_Type_Float' },
            { value: 'System.Double', displayValue: 'Number (double-precision floating-point)', localizationId: 'UtilsUIStringId.Parameter_Type_Double' },
            { value: 'System.Decimal', displayValue: 'Number (decimal)', localizationId: 'UtilsUIStringId.Parameter_Type_Decimal' },
            { value: 'System.Boolean', displayValue: 'Boolean', localizationId: 'UtilsUIStringId.Parameter_Type_Boolean' },
            { value: 'System.Char', displayValue: 'Char', localizationId: 'DataAccessStringId.Type_Char' },
            { value: 'System.DateTime', displayValue: 'Date', localizationId: 'UtilsUIStringId.Parameter_Type_DateTime' },
            { value: '<Null>', displayValue: '<Null>' }
        ],
        localizationId: 'DevExpress.XtraPrinting.XlEncryptionOptions.Type'
    }
];
