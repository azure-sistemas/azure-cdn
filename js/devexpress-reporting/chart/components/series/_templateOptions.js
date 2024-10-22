﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_templateOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _valueWeight_1 = require("../../internal/data/_valueWeight");
var _value1Value2_1 = require("../../internal/data/_value1Value2");
var _stockValue_1 = require("../../internal/data/_stockValue");
exports.viewTypesDataMembers = {
    'BubbleSeriesView': _valueWeight_1.ValueWeightDataMembers,
    'OverlappedRangeBarSeriesView': _value1Value2_1.Value1Value2DataMembers,
    'SideBySideRangeBarSeriesView': _value1Value2_1.Value1Value2DataMembers,
    'RangeAreaSeriesView': _value1Value2_1.Value1Value2DataMembers,
    'RangeArea3DSeriesView': _value1Value2_1.Value1Value2DataMembers,
    'OverlappedGanttSeriesView': _value1Value2_1.Value1Value2DataMembers,
    'SideBySideGanttSeriesView': _value1Value2_1.Value1Value2DataMembers,
    'StockSeriesView': _stockValue_1.StockValueDataMembers,
    'CandleStickSeriesView': _stockValue_1.StockValueDataMembers
};
exports.mapTypes = {
    'SideBySideBarSeriesView': 'SideBySideBarSeriesLabel',
    'StackedBarSeriesView': 'StackedBarSeriesLabel',
    'FullStackedBarSeriesView': 'FullStackedBarSeriesLabel',
    'SideBySideStackedBarSeriesView': 'StackedBarSeriesLabel',
    'SideBySideFullStackedBarSeriesView': 'FullStackedBarSeriesLabel',
    'WaterfallSeriesView': 'WaterfallSeriesLabel',
    'SideBySideBar3DSeriesView': 'Bar3DSeriesLabel',
    'StackedBar3DSeriesView': 'StackedBar3DSeriesLabel',
    'FullStackedBar3DSeriesView': 'FullStackedBar3DSeriesLabel',
    'SideBySideStackedBar3DSeriesView': 'StackedBar3DSeriesLabel',
    'SideBySideFullStackedBar3DSeriesView': 'FullStackedBar3DSeriesLabel',
    'ManhattanBarSeriesView': 'Bar3DSeriesLabel',
    'PointSeriesView': 'PointSeriesLabel',
    'BubbleSeriesView': 'BubbleSeriesLabel',
    'LineSeriesView': 'PointSeriesLabel',
    'StackedLineSeriesView': 'StackedLineSeriesLabel',
    'FullStackedLineSeriesView': 'StackedLineSeriesLabel',
    'StepLineSeriesView': 'PointSeriesLabel',
    'SplineSeriesView': 'PointSeriesLabel',
    'ScatterLineSeriesView': 'PointSeriesLabel',
    'SwiftPlotSeriesView': null,
    'Line3DSeriesView': 'Line3DSeriesLabel',
    'StackedLine3DSeriesView': 'StackedLine3DSeriesLabel',
    'FullStackedLine3DSeriesView': 'StackedLine3DSeriesLabel',
    'StepLine3DSeriesView': 'Line3DSeriesLabel',
    'Spline3DSeriesView': 'Line3DSeriesLabel',
    'PieSeriesView': 'PieSeriesLabel',
    'DoughnutSeriesView': 'DoughnutSeriesLabel',
    'NestedDoughnutSeriesView': 'NestedDoughnutSeriesLabel',
    'Pie3DSeriesView': 'Pie3DSeriesLabel',
    'Doughnut3DSeriesView': 'Doughnut3DSeriesLabel',
    'FunnelSeriesView': 'FunnelSeriesLabel',
    'Funnel3DSeriesView': 'Funnel3DSeriesLabel',
    'AreaSeriesView': 'PointSeriesLabel',
    'StackedAreaSeriesView': 'PointSeriesLabel',
    'FullStackedAreaSeriesView': 'FullStackedAreaSeriesLabel',
    'StepAreaSeriesView': 'PointSeriesLabel',
    'SplineAreaSeriesView': 'PointSeriesLabel',
    'StackedSplineAreaSeriesView': 'PointSeriesLabel',
    'FullStackedSplineAreaSeriesView': 'FullStackedSplineAreaSeriesLabel',
    'Area3DSeriesView': 'Area3DSeriesLabel',
    'StackedArea3DSeriesView': 'StackedArea3DSeriesLabel',
    'FullStackedArea3DSeriesView': 'FullStackedArea3DSeriesLabel',
    'StepArea3DSeriesView': 'Area3DSeriesLabel',
    'SplineArea3DSeriesView': 'Area3DSeriesLabel',
    'StackedSplineArea3DSeriesView': 'StackedArea3DSeriesLabel',
    'FullStackedSplineArea3DSeriesView': 'FullStackedArea3DSeriesLabel',
    'OverlappedRangeBarSeriesView': 'RangeBarSeriesLabel',
    'SideBySideRangeBarSeriesView': 'RangeBarSeriesLabel',
    'RangeAreaSeriesView': 'RangeAreaSeriesLabel',
    'RangeArea3DSeriesView': 'RangeArea3DSeriesLabel',
    'RadarPointSeriesView': 'RadarPointSeriesLabel',
    'RadarLineSeriesView': 'RadarPointSeriesLabel',
    'RadarAreaSeriesView': 'RadarPointSeriesLabel',
    'PolarPointSeriesView': 'RadarPointSeriesLabel',
    'PolarLineSeriesView': 'RadarPointSeriesLabel',
    'PolarAreaSeriesView': 'RadarPointSeriesLabel',
    'StockSeriesView': 'StockSeriesLabel',
    'CandleStickSeriesView': 'StockSeriesLabel',
    'OverlappedGanttSeriesView': 'RangeBarSeriesLabel',
    'SideBySideGanttSeriesView': 'RangeBarSeriesLabel'
};
exports.onlyNumericArgumentSupportedSeriesViewTypes = [
    'PolarPointSeriesView',
    'PolarLineSeriesView',
    'PolarAreaSeriesView'
];
