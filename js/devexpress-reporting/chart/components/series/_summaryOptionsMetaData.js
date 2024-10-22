﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_summaryOptionsMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _summaryFunctionEditor_1 = require("../../widgets/_summaryFunctionEditor");
var _common_1 = require("../../internal/meta/_common");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _editorTemplates_1 = require("../../internal/_editorTemplates");
exports.summaryFunctionSerializationInfo = {
    propertyName: 'summaryFunction', displayName: 'Summary Function', modelName: '@SummaryFunction', from: _summaryFunctionEditor_1.SummaryFunctionModel.from, toJsonObject: _summaryFunctionEditor_1.SummaryFunctionModel.toJson,
    editor: _editorTemplates_1.editorTemplates.getEditor('summaryFunction'), localizationId: 'DevExpress.XtraCharts.SummaryOptionsBase.SummaryFunction'
};
exports.summaryOptionsSerializationInfoArray = [
    exports.summaryFunctionSerializationInfo, _common_1.tag
];
exports.numericSummaryOptionsSerializationInfoArray = exports.summaryOptionsSerializationInfoArray.concat([
    { propertyName: 'measureUnit', modelName: '@MeasureUnit', displayName: 'Measure Unit', localizationId: 'DevExpress.XtraCharts.NumericSummaryOptions.MeasureUnit', defaultVal: 1, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') },
    { propertyName: 'useAxisMeasureUnit', modelName: '@UseAxisMeasureUnit', displayName: 'Use Axis Measure Unit', localizationId: 'DevExpress.XtraCharts.NumericSummaryOptions.UseAxisMeasureUnit', defaultVal: true, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool') },
]);
exports.dateTimeSummaryOptionsSerializationInfoArray = exports.summaryOptionsSerializationInfoArray.concat([
    {
        propertyName: 'measureUnit', modelName: '@MeasureUnit', displayName: 'Measure Unit', localizationId: 'DevExpress.XtraCharts.DateTimeSummaryOptions.MeasureUnit', defaultVal: 'Day', from: analytics_utils_1.fromEnum, editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
        valuesArray: [
            { value: 'Millisecond', displayValue: 'Millisecond', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Millisecond' },
            { value: 'Second', displayValue: 'Second', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Second' },
            { value: 'Minute', displayValue: 'Minute', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Minute' },
            { value: 'Hour', displayValue: 'Hour', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Hour' },
            { value: 'Day', displayValue: 'Day', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Day' },
            { value: 'Week', displayValue: 'Week', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Week' },
            { value: 'Month', displayValue: 'Month', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Month' },
            { value: 'Quarter', displayValue: 'Quarter', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Quarter' },
            { value: 'Year', displayValue: 'Year', localizationId: 'DevExpress.XtraCharts.DateTimeMeasureUnit.Year' },
        ]
    },
    { propertyName: 'measureUnitMultiplier', modelName: '@MeasureUnitMultiplier', displayName: 'Measure Unit Multiplier', localizationId: 'DevExpress.XtraCharts.DateTimeSummaryOptions.MeasureUnitMultiplier', defaultVal: 1, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') },
    { propertyName: 'useAxisMeasureUnit', modelName: '@UseAxisMeasureUnit', displayName: 'Use Axis Measure Unit', localizationId: 'DevExpress.XtraCharts.DateTimeSummaryOptions.UseAxisMeasureUnit', defaultVal: true, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool') }
]);
