﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_series.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _common_1 = require("./_common");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.typeNameSerializable = {
    propertyName: 'typeName', modelName: '@TypeNameSerializable', from: function (value) { return value; }
};
exports.barSeriesViewGroup = ['SideBySideBarSeriesView', 'StackedBarSeriesView', 'FullStackedBarSeriesView', 'SideBySideStackedBarSeriesView', 'SideBySideFullStackedBarSeriesView', 'OverlappedRangeBarSeriesView', 'SideBySideRangeBarSeriesView', 'OverlappedGanttSeriesView', 'SideBySideGanttSeriesView'];
exports.bar3DSeriesViewGroup = ['SideBySideBar3DSeriesView', 'StackedBar3DSeriesView', 'FullStackedBar3DSeriesView', 'SideBySideStackedBar3DSeriesView', 'SideBySideFullStackedBar3DSeriesView', 'ManhattanBarSeriesView'];
exports.barWidth = { propertyName: 'barWidth', modelName: '@BarWidth', displayName: 'Bar Width', defaultVal: 0.6, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.BarSeriesView.BarWidth' };
exports.colorEach = { propertyName: 'colorEach', modelName: '@ColorEach', displayName: 'Color Each', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, localizationId: 'DevExpress.XtraCharts.SeriesView3DColorEachSupportBase.ColorEach' };
exports.borderSerializationsInfo = [_common_1.color, _common_1.thickness, _common_1.visibility];
exports.border = { propertyName: 'border', modelName: 'Border', displayName: 'Border', info: exports.borderSerializationsInfo, defaultVal: {}, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraCharts.TotalLabel.Border' };
var color2 = { propertyName: 'color2', modelName: '@Color2', displayName: 'Color2', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraCharts.PaletteEntry.Color2' }, typeNameSerializableOptions = { propertyName: 'typeNameSerializable', modelName: '@TypeNameSerializable' };
exports.fillMode = {
    propertyName: 'fillMode', modelName: '@FillMode', displayName: 'Fill Mode', defaultVal: 'Empty', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Empty', displayValue: 'Empty', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAppearances.Empty' }, { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.FillMode3D.Solid' }, { value: 'Gradient', displayValue: 'Gradient', localizationId: 'DevExpress.XtraCharts.FillMode3D.Gradient' }, { value: 'Hatch', displayValue: 'Hatch', localizationId: 'DevExpress.XtraCharts.FillMode.Hatch' }],
    localizationId: 'DevExpress.XtraCharts.FillStyle3D.FillMode'
};
var gradientModeBase = {
    propertyName: 'gradientMode', modelName: '@GradientMode', displayName: 'Gradient Mode', defaultVal: 'TopToBottom', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'TopToBottom', displayValue: 'Top To Bottom', localizationId: 'DevExpress.XtraCharts.TextOrientation.TopToBottom' }, { value: 'BottomToTop', displayValue: 'Bottom To Top', localizationId: 'DevExpress.XtraCharts.TextOrientation.BottomToTop' }, { value: 'LeftToRight', displayValue: 'Left To Right' }, { value: 'RightToLeft', displayValue: 'Right To Left' }, { value: 'TopLeftToBottomRight', displayValue: 'Top Left To Bottom Right' }, { value: 'BottomRightToTopLeft', displayValue: 'Bottom Right To Top Left' }, { value: 'TopRightToBottomLeft', displayValue: 'Top Right To Bottom Left' }, { value: 'BottomLeftToTopRight', displayValue: 'Bottom Left To Top Right' }, { value: 'FromCenterHorizontal', displayValue: 'From Center Horizontal', localizationId: 'DevExpress.XtraCharts.RectangleGradientMode.FromCenterHorizontal' }, { value: 'ToCenterHorizontal', displayValue: 'To Center Horizontal', localizationId: 'DevExpress.XtraCharts.RectangleGradientMode.ToCenterHorizontal' }, { value: 'FromCenterVertical', displayValue: 'From Center Vertical', localizationId: 'DevExpress.XtraCharts.RectangleGradientMode.FromCenterVertical' }, { value: 'ToCenterVertical', displayValue: 'To Center Vertical', localizationId: 'DevExpress.XtraCharts.RectangleGradientMode.ToCenterVertical' }],
    localizationId: 'DevExpress.XtraCharts.PolygonGradientFillOptions.GradientMode'
}, GradientFillOptionsInfoBase = [gradientModeBase, color2, _common_1.tag, { propertyName: 'typeNameSerializable', modelName: '@TypeNameSerializable' }];
var hatchStyle = {
    propertyName: 'hatchStyle', modelName: '@HatchStyle', displayName: 'Hatch Style', defaultVal: 'BackwardDiagonal', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Horizontal', displayValue: 'Horizontal', localizationId: 'DevExpress.XtraCharts.TextOrientation.Horizontal' }, { value: 'Vertical', displayValue: 'Vertical', localizationId: 'DevExpress.XtraCharts.LayoutDirection.Vertical' }, { value: 'ForwardDiagonal', displayValue: 'ForwardDiagonal', localizationId: 'ChartStringId.WizHatchForwardDiagonal' }, { value: 'BackwardDiagonal', displayValue: 'BackwardDiagonal', localizationId: 'ChartStringId.WizHatchBackwardDiagonal' }, { value: 'LargeGrid', displayValue: 'LargeGrid', localizationId: 'ChartStringId.WizHatchLargeGrid' }, { value: 'DiagonalCross', displayValue: 'DiagonalCross', localizationId: 'ChartStringId.WizHatchDiagonalCross' }, { value: 'Percent05', displayValue: 'Percent05', localizationId: 'ChartStringId.WizHatchPercent05' }, { value: 'Percent10', displayValue: 'Percent10', localizationId: 'ChartStringId.WizHatchPercent10' }, { value: 'Percent20', displayValue: 'Percent20', localizationId: 'ChartStringId.WizHatchPercent20' }, { value: 'Percent25', displayValue: 'Percent25', localizationId: 'ChartStringId.WizHatchPercent25' }, { value: 'Percent30', displayValue: 'Percent30', localizationId: 'ChartStringId.WizHatchPercent30' }, { value: 'Percent40', displayValue: 'Percent40', localizationId: 'ChartStringId.WizHatchPercent40' }, { value: 'Percent50', displayValue: 'Percent50', localizationId: 'ChartStringId.WizHatchPercent50' }, { value: 'Percent60', displayValue: 'Percent60', localizationId: 'ChartStringId.WizHatchPercent60' }, { value: 'Percent70', displayValue: 'Percent70', localizationId: 'ChartStringId.WizHatchPercent70' }, { value: 'Percent75', displayValue: 'Percent75', localizationId: 'ChartStringId.WizHatchPercent75' }, { value: 'Percent80', displayValue: 'Percent80', localizationId: 'ChartStringId.WizHatchPercent80' }, { value: 'Percent90', displayValue: 'Percent90', localizationId: 'ChartStringId.WizHatchPercent90' }, { value: 'LightDownwardDiagonal', displayValue: 'LightDownwardDiagonal', localizationId: 'ChartStringId.WizHatchLightDownwardDiagonal' }, { value: 'LightUpwardDiagonal', displayValue: 'LightUpwardDiagonal', localizationId: 'ChartStringId.WizHatchLightUpwardDiagonal' }, { value: 'DarkDownwardDiagonal', displayValue: 'DarkDownwardDiagonal', localizationId: 'ChartStringId.WizHatchDarkDownwardDiagonal' }, { value: 'DarkUpwardDiagonal', displayValue: 'DarkUpwardDiagonal', localizationId: 'ChartStringId.WizHatchDarkUpwardDiagonal' }, { value: 'WideDownwardDiagonal', displayValue: 'WideDownwardDiagonal', localizationId: 'ChartStringId.WizHatchWideDownwardDiagonal' }, { value: 'WideUpwardDiagonal', displayValue: 'WideUpwardDiagonal', localizationId: 'ChartStringId.WizHatchWideUpwardDiagonal' }, { value: 'LightVertical', displayValue: 'LightVertical', localizationId: 'ChartStringId.WizHatchLightVertical' }, { value: 'LightHorizontal', displayValue: 'LightHorizontal', localizationId: 'ChartStringId.WizHatchLightHorizontal' }, { value: 'NarrowVertical', displayValue: 'NarrowVertical', localizationId: 'ChartStringId.WizHatchNarrowVertical' }, { value: 'NarrowHorizontal', displayValue: 'NarrowHorizontal', localizationId: 'ChartStringId.WizHatchNarrowHorizontal' }, { value: 'DarkVertical', displayValue: 'DarkVertical', localizationId: 'ChartStringId.WizHatchDarkVertical' }, { value: 'DarkHorizontal', displayValue: 'DarkHorizontal', localizationId: 'ChartStringId.WizHatchDarkHorizontal' }, { value: 'DashedDownwardDiagonal', displayValue: 'DashedDownwardDiagonal', localizationId: 'ChartStringId.WizHatchDashedDownwardDiagonal' }, { value: 'DashedUpwardDiagonal', displayValue: 'DashedUpwardDiagonal', localizationId: 'ChartStringId.WizHatchDashedUpwardDiagonal' }, { value: 'DashedHorizontal', displayValue: 'DashedHorizontal', localizationId: 'ChartStringId.WizHatchDashedHorizontal' }, { value: 'DashedVertical', displayValue: 'DashedVertical', localizationId: 'ChartStringId.WizHatchDashedVertical' }, { value: 'SmallConfetti', displayValue: 'SmallConfetti', localizationId: 'ChartStringId.WizHatchSmallConfetti' }, { value: 'LargeConfetti', displayValue: 'LargeConfetti', localizationId: 'ChartStringId.WizHatchLargeConfetti' }, { value: 'ZigZag', displayValue: 'ZigZag', localizationId: 'ChartStringId.WizHatchZigZag' }, { value: 'Wave', displayValue: 'Wave', localizationId: 'System.Drawing.Drawing2D.HatchStyle.Wave' }, { value: 'DiagonalBrick', displayValue: 'DiagonalBrick', localizationId: 'ChartStringId.WizHatchDiagonalBrick' }, { value: 'HorizontalBrick', displayValue: 'HorizontalBrick', localizationId: 'ChartStringId.WizHatchHorizontalBrick' }, { value: 'Weave', displayValue: 'Weave', localizationId: 'System.Drawing.Drawing2D.HatchStyle.Weave' }, { value: 'Plaid', displayValue: 'Plaid', localizationId: 'System.Drawing.Drawing2D.HatchStyle.Plaid' }, { value: 'Divot', displayValue: 'Divot', localizationId: 'System.Drawing.Drawing2D.HatchStyle.Divot' }, { value: 'DottedGrid', displayValue: 'DottedGrid', localizationId: 'ChartStringId.WizHatchDottedGrid' }, { value: 'DottedDiamond', displayValue: 'DottedDiamond', localizationId: 'ChartStringId.WizHatchDottedDiamond' }, { value: 'Shingle', displayValue: 'Shingle', localizationId: 'System.Drawing.Drawing2D.HatchStyle.Shingle' }, { value: 'Trellis', displayValue: 'Trellis', localizationId: 'System.Drawing.Drawing2D.HatchStyle.Trellis' }, { value: 'Sphere', displayValue: 'Sphere', localizationId: 'System.Drawing.Drawing2D.HatchStyle.Sphere' }, { value: 'SmallGrid', displayValue: 'SmallGrid', localizationId: 'ChartStringId.WizHatchSmallGrid' }, { value: 'SmallCheckerBoard', displayValue: 'SmallCheckerBoard', localizationId: 'ChartStringId.WizHatchSmallCheckerBoard' }, { value: 'LargeCheckerBoard', displayValue: 'LargeCheckerBoard', localizationId: 'ChartStringId.WizHatchLargeCheckerBoard' }, { value: 'OutlinedDiamond', displayValue: 'OutlinedDiamond', localizationId: 'ChartStringId.WizHatchOutlinedDiamond' }, { value: 'SolidDiamond', displayValue: 'SolidDiamond', localizationId: 'ChartStringId.WizHatchSolidDiamond' }],
    localizationId: 'DevExpress.XtraCharts.HatchFillOptions.HatchStyle'
}, hatchFillOptionsInfo = [hatchStyle, color2, _common_1.tag, typeNameSerializableOptions];
exports.fillStyleOptionsSerialize = { propertyName: 'options', modelName: 'Options', displayName: 'Options', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraPivotGrid.PivotGridFieldBase.Options' };
exports.fillMode3D = {
    propertyName: 'fillMode', modelName: '@FillMode', displayName: 'Fill Mode', defaultVal: 'Empty', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Empty', displayValue: 'Empty', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAppearances.Empty' }, { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.FillMode3D.Solid' }, { value: 'Gradient', displayValue: 'Gradient', localizationId: 'DevExpress.XtraCharts.FillMode3D.Gradient' }],
    localizationId: 'DevExpress.XtraCharts.FillStyle3D.FillMode'
};
exports.fillStyle = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraReports.UI.XRChart.FillStyle' };
var seriesAggregateFunction = {
    propertyName: 'aggregateFunction', modelName: '@AggregateFunction', displayName: 'Aggregate Function', localizationId: 'DevExpress.XtraCharts.XYDiagram2DSeriesViewBase.AggregateFunction', defaultVal: 'Default', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Default', displayValue: analytics_utils_1.getLocalization('Default', 'ChartStringId.WizAggregateFunctionDefault') }, { value: 'None', displayValue: analytics_utils_1.getLocalization('None', 'ChartStringId.WizAggregateFunctionNone') }, { value: 'Average', displayValue: analytics_utils_1.getLocalization('Average', 'ChartStringId.WizAggregateFunctionAverage') }, { value: 'Sum', displayValue: analytics_utils_1.getLocalization('Sum', 'ChartStringId.WizAggregateFunctionSum') }, { value: 'Minimum', displayValue: analytics_utils_1.getLocalization('Minimum', 'ChartStringId.WizAggregateFunctionMinimum') }, { value: 'Maximum', displayValue: analytics_utils_1.getLocalization('Maximum', 'ChartStringId.WizAggregateFunctionMaximum') }, { value: 'Count', displayValue: analytics_utils_1.getLocalization('Count', 'ChartStringId.WizAggregateFunctionCount') }, { value: 'Financial', displayValue: analytics_utils_1.getLocalization('Financial', 'ChartStringId.WizAggregateFunctionFinancial') }]
};
exports.viewSerializationsInfo = [exports.typeNameSerializable, _common_1.color, exports.colorEach, exports.border, seriesAggregateFunction, _common_1.tag];
exports.fillModeMapper = {
    'Empty': [],
    'Solid': [_common_1.tag],
    'Gradient': GradientFillOptionsInfoBase,
    'Hatch': hatchFillOptionsInfo
};
