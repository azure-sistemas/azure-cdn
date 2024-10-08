﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_view.js)
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
var _editorTemplates_1 = require("../_editorTemplates");
var _title_1 = require("../../components/models/_title");
var _fillStyle_1 = require("../../components/series/_fillStyle");
var _series_1 = require("./_series");
var _utils_1 = require("../../_utils");
var _indicator_1 = require("../../components/series/_indicator");
exports.paneName = { propertyName: 'paneName', modelName: '@PaneName', displayName: 'Pane', localizationId: 'DevExpress.XtraCharts.XYDiagramPane', defaultVal: analytics_utils_1.getLocalization('Default Pane', 'ChartStringId.DefaultPaneName'), editor: _editorTemplates_1.editorTemplates.getEditor('panes') };
exports.axisXName = { propertyName: 'axisXName', modelName: '@AxisXName', displayName: 'AxisX', localizationId: 'DevExpress.XtraCharts.GanttAxisX', defaultVal: analytics_utils_1.getLocalization('Primary AxisX', 'ChartStringId.PrimaryAxisXName'), editor: _editorTemplates_1.editorTemplates.getEditor('axisX') };
exports.axisYName = { propertyName: 'axisYName', modelName: '@AxisYName', displayName: 'AxisY', localizationId: 'DevExpress.XtraCharts.SeparatePaneIndicator.AxisY', defaultVal: analytics_utils_1.getLocalization('Primary AxisY', 'ChartStringId.PrimaryAxisYName'), editor: _editorTemplates_1.editorTemplates.getEditor('axisY') };
var arrowWidthValidationRules = [{
        type: 'custom',
        validationCallback: function (options) {
            return options.value % 2 !== 0;
        },
        get message() {
            return analytics_utils_1.getLocalization('The arrow width should be always odd and greater than 0', 'ChartStringId.MsgIncorrectArrowWidth');
        }
    }];
var invertedStep = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.FullStackedStepAreaSeriesView.InvertedStep', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var viewFillMode = {
    propertyName: 'fillMode', modelName: '@FillMode', displayName: 'Fill Mode', localizationId: 'DevExpress.XtraCharts.FillStyle2D.FillMode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Empty', displayValue: 'Empty', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAppearances.Empty' }, { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.FillMode3D.Solid' }, { value: 'Gradient', displayValue: 'Gradient', localizationId: 'DevExpress.XtraCharts.FillMode3D.Gradient' }, { value: 'Hatch', displayValue: 'Hatch', localizationId: 'DevExpress.XtraCharts.FillMode.Hatch' }], defaultVal: 'Empty'
};
exports.fillStyleInfo = [viewFillMode, _series_1.fillStyleOptionsSerialize, _common_1.tag];
var viewFillStyle = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.FillStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), from: _fillStyle_1.FillStyle.from(exports.fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: _fillStyle_1.FillStyle.toJson };
var transparency = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.Transparency', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var viewEnableAntialiasing = {
    propertyName: 'enableAntialiasing', modelName: '@EnableAntialiasing', displayName: 'Enable Antialiasing', localizationId: 'DevExpress.XtraCharts.LineSeriesView.EnableAntialiasing', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var size = { propertyName: 'size', modelName: '@Size', displayName: 'Size', localizationId: 'DevExpress.XtraCharts.Shadow.Size', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 2, editorOptions: { min: 1 } };
var viewColor = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.Shadow.Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: '79,0,0,0' };
var viewVisible = { propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraCharts.Shadow.Visible', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var shadowInfo = [size, viewColor, viewVisible, _common_1.tag];
var shadow = { propertyName: 'shadow', modelName: 'Shadow', displayName: 'Shadow', localizationId: 'DevExpress.XtraCharts.XYDiagramSeriesViewBase.Shadow', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: shadowInfo, };
var viewAggregateFunction = {
    propertyName: 'aggregateFunction', modelName: '@AggregateFunction', displayName: 'Aggregate Function', localizationId: 'DevExpress.XtraCharts.XYDiagram2DSeriesViewBase.AggregateFunction', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'Average', displayValue: 'Average', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Average' }, { value: 'Minimum', displayValue: 'Minimum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum' }, { value: 'Maximum', displayValue: 'Maximum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum' }, { value: 'Sum', displayValue: 'Sum', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Sum' }, { value: 'Count', displayValue: 'Count', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, { value: 'Financial', displayValue: 'Financial', localizationId: 'DevExpress.XtraCharts.SeriesAggregateFunction.Financial' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var indicators = {
    propertyName: 'indicators',
    modelName: 'Indicators',
    displayName: 'Indicators',
    localizationId: 'DevExpress.XtraCharts.XYDiagram2DSeriesViewBase.Indicators',
    array: true,
    from: function (model, serializer) {
        return _utils_1.deserializeModelArray(model, function (indicator, parent) { return new _indicator_1.Indicator(indicator, parent, serializer); }, _indicator_1.Indicator.prefix);
    }
};
var color1 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.SeriesViewBase.Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
var fullStackedStepAreaSeriesViewinfo = [invertedStep, viewFillStyle, transparency, viewEnableAntialiasing, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var viewColor2 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.Marker.Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
var size1 = { propertyName: 'size', modelName: '@Size', displayName: 'Size', localizationId: 'DevExpress.XtraCharts.SimpleMarker.Size', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 10, editorOptions: { min: 1 } };
var kind = {
    propertyName: 'kind', modelName: '@Kind', displayName: 'Kind', localizationId: 'DevExpress.XtraCharts.MarkerBase.Kind', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Square', displayValue: 'Square', localizationId: 'DevExpress.XtraCharts.MarkerKind.Square' }, { value: 'Diamond', displayValue: 'Diamond', localizationId: 'DevExpress.XtraCharts.MarkerKind.Diamond' }, { value: 'Triangle', displayValue: 'Triangle', localizationId: 'DevExpress.XtraCharts.MarkerKind.Triangle' }, { value: 'InvertedTriangle', displayValue: 'InvertedTriangle' }, { value: 'Circle', displayValue: 'Circle', localizationId: 'DevExpress.XtraCharts.CircleEasingFunction' }, { value: 'Plus', displayValue: 'Plus', localizationId: 'DevExpress.XtraCharts.MarkerKind.Plus' }, { value: 'Cross', displayValue: 'Cross', localizationId: 'DevExpress.XtraCharts.MarkerKind.Cross' }, { value: 'Star', displayValue: 'Star', localizationId: 'DevExpress.XtraCharts.MarkerKind.Star' }, { value: 'Pentagon', displayValue: 'Pentagon', localizationId: 'DevExpress.XtraCharts.MarkerKind.Pentagon' }, { value: 'Hexagon', displayValue: 'Hexagon', localizationId: 'DevExpress.XtraCharts.MarkerKind.Hexagon' }], defaultVal: 'Circle'
};
var starPointCount = { propertyName: 'starPointCount', modelName: '@StarPointCount', displayName: 'Star Point Count', localizationId: 'DevExpress.XtraCharts.MarkerBase.StarPointCount', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 5, editorOptions: { min: 3, max: 100 } };
var fillStyle1 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.MarkerBase.FillStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), from: _fillStyle_1.FillStyle.from(exports.fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: _fillStyle_1.FillStyle.toJson };
var viewBorderVisible = { propertyName: 'borderVisible', modelName: '@BorderVisible', displayName: 'Border Visible', localizationId: 'DevExpress.XtraCharts.MarkerBase.BorderVisible', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var viewBorderColor = { propertyName: 'borderColor', modelName: '@BorderColor', displayName: 'Border Color', localizationId: 'DevExpress.XtraCharts.MarkerBase.BorderColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
var marker1Info = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, _common_1.tag];
var marker1 = { propertyName: 'marker1', modelName: 'Marker1', displayName: 'Marker 1', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Marker1', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: marker1Info, };
var marker2Info = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, _common_1.tag];
var marker2 = { propertyName: 'marker2', modelName: 'Marker2', displayName: 'Marker 2', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Marker2', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: marker2Info, };
var color3 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.BorderBase.Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
var viewThickness = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', localizationId: 'DevExpress.XtraCharts.BorderBase.Thickness', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { min: 1 } };
var viewVisibility = {
    propertyName: 'visibility', modelName: '@Visibility', displayName: 'Visibility', localizationId: 'DevExpress.XtraCharts.BorderBase.Visibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var border1Info = [color3, viewThickness, viewVisibility, _common_1.tag];
var border1 = { propertyName: 'border1', modelName: 'Border1', displayName: 'Border 1', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Border1', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: border1Info, };
var border2Info = [color3, viewThickness, viewVisibility, _common_1.tag];
var border2 = { propertyName: 'border2', modelName: 'Border2', displayName: 'Border 2', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Border2', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: border2Info, };
var marker1Visibility = {
    propertyName: 'marker1Visibility', modelName: '@Marker1Visibility', displayName: 'Marker 1 Visibility', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Marker1Visibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var marker2Visibility = {
    propertyName: 'marker2Visibility', modelName: '@Marker2Visibility', displayName: 'Marker 2 Visibility', localizationId: 'DevExpress.XtraCharts.RadarRangeAreaSeriesView.Marker2Visibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var fillStyle2 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.RadarAreaSeriesView.FillStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), from: _fillStyle_1.FillStyle.from(exports.fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: _fillStyle_1.FillStyle.toJson };
var transparency1 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.RadarAreaSeriesView.Transparency', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 135 };
var aggregateFunction1 = {
    propertyName: 'aggregateFunction', modelName: '@AggregateFunction', displayName: 'Aggregate Function', localizationId: 'DevExpress.XtraCharts.RadarSeriesViewBase.AggregateFunction', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'Average', displayValue: 'Average', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Average' }, { value: 'Minimum', displayValue: 'Minimum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum' }, { value: 'Maximum', displayValue: 'Maximum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum' }, { value: 'Sum', displayValue: 'Sum', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Sum' }, { value: 'Count', displayValue: 'Count', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, { value: 'Financial', displayValue: 'Financial', localizationId: 'DevExpress.XtraCharts.SeriesAggregateFunction.Financial' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var shadow1 = { propertyName: 'shadow', modelName: 'Shadow', displayName: 'Shadow', localizationId: 'DevExpress.XtraCharts.RadarSeriesViewBase.Shadow', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: shadowInfo, };
var viewColorEach = { propertyName: 'colorEach', modelName: '@ColorEach', displayName: 'Color Each', localizationId: 'DevExpress.XtraCharts.RadarSeriesViewBase.ColorEach', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var polarRangeAreaSeriesViewinfo = [marker1, marker2, border1, border2, marker1Visibility, marker2Visibility, fillStyle2, transparency1, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var radarRangeAreaSeriesViewinfo = [marker1, marker2, border1, border2, marker1Visibility, marker2Visibility, fillStyle2, transparency1, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var areaWidth = { propertyName: 'areaWidth', modelName: '@AreaWidth', displayName: 'Area Width', localizationId: 'DevExpress.XtraCharts.Area3DSeriesView.AreaWidth', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 1 } };
var aggregateFunction2 = {
    propertyName: 'aggregateFunction', modelName: '@AggregateFunction', displayName: 'Aggregate Function', localizationId: 'DevExpress.XtraCharts.XYDiagram3DSeriesViewBase.AggregateFunction', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'Average', displayValue: 'Average', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Average' }, { value: 'Minimum', displayValue: 'Minimum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum' }, { value: 'Maximum', displayValue: 'Maximum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum' }, { value: 'Sum', displayValue: 'Sum', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Sum' }, { value: 'Count', displayValue: 'Count', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, { value: 'Financial', displayValue: 'Financial', localizationId: 'DevExpress.XtraCharts.SeriesAggregateFunction.Financial' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var transparency2 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.XYDiagram3DSeriesViewBase.Transparency', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var rangeArea3DSeriesViewinfo = [areaWidth, aggregateFunction2, transparency2, color1, _common_1.tag];
var marker11 = { propertyName: 'marker1', modelName: 'Marker1', displayName: 'Marker 1', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker1', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: marker1Info, };
var marker21 = { propertyName: 'marker2', modelName: 'Marker2', displayName: 'Marker 2', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker2', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: marker2Info, };
var border11 = { propertyName: 'border1', modelName: 'Border1', displayName: 'Border 1', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Border1', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: border1Info, };
var border21 = { propertyName: 'border2', modelName: 'Border2', displayName: 'Border 2', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Border2', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: border2Info, };
var marker1Visibility1 = {
    propertyName: 'marker1Visibility', modelName: '@Marker1Visibility', displayName: 'Marker 1 Visibility', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker1Visibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var marker2Visibility1 = {
    propertyName: 'marker2Visibility', modelName: '@Marker2Visibility', displayName: 'Marker 2 Visibility', localizationId: 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker2Visibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var transparency3 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.Transparency', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 135 };
var colorEach1 = { propertyName: 'colorEach', modelName: '@ColorEach', displayName: 'Color Each', localizationId: 'DevExpress.XtraCharts.SeriesViewColorEachSupportBase.ColorEach', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var rangeAreaSeriesViewinfo = [marker11, marker21, border11, border21, marker1Visibility1, marker2Visibility1, viewFillStyle, transparency3, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var invertedStep1 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StackedStepAreaSeriesView.InvertedStep', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var borderInfo = [color3, viewThickness, viewVisibility, _common_1.tag];
var viewBorder1 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.Border', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: borderInfo, };
var stackedStepAreaSeriesViewinfo = [invertedStep1, viewBorder1, viewFillStyle, transparency, viewEnableAntialiasing, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var invertedStep2 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StepArea3DSeriesView.InvertedStep', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var transparency4 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.XYDiagram3DSeriesViewBase.Transparency', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 135 };
var stepArea3DSeriesViewinfo = [invertedStep2, areaWidth, aggregateFunction2, transparency4, color1, _common_1.tag];
var invertedStep3 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StepAreaSeriesView.InvertedStep', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var markerOptionsInfo = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, _common_1.tag];
var markerOptions = { propertyName: 'markerOptions', modelName: 'MarkerOptions', displayName: 'Marker Options', localizationId: 'DevExpress.XtraCharts.AreaSeriesViewBase.MarkerOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: markerOptionsInfo, };
var viewMarkerVisibility = {
    propertyName: 'markerVisibility', modelName: '@MarkerVisibility', displayName: 'Marker Visibility', localizationId: 'DevExpress.XtraCharts.LineSeriesView.MarkerVisibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var stepAreaSeriesViewinfo = [invertedStep3, viewBorder1, viewFillStyle, markerOptions, transparency3, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var stackedGroup = { propertyName: 'stackedGroup', modelName: '@StackedGroupSerializable', displayName: 'Stacked Group', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBar3DSeriesView.StackedGroup', editor: _editorTemplates_1.editorTemplates.getEditor('group'), defaultVal: null };
var barDistance = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBar3DSeriesView.BarDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var barDistanceFixed = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBar3DSeriesView.BarDistanceFixed', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
var equalBarWidth = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBar3DSeriesView.EqualBarWidth', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var viewBarWidth = { propertyName: 'barWidth', modelName: '@BarWidth', displayName: 'Bar Width', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.BarWidth', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 0, step: 0.1 } };
var barDepth = { propertyName: 'barDepth', modelName: '@BarDepth', displayName: 'Bar Depth', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.BarDepth', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 0, step: 0.1 } };
var barDepthAuto = { propertyName: 'barDepthAuto', modelName: '@BarDepthAuto', displayName: 'Bar Depth Auto', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.BarDepthAuto', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var fillMode1 = {
    propertyName: 'fillMode', modelName: '@FillMode', displayName: 'Fill Mode', localizationId: 'DevExpress.XtraCharts.FillStyle3D.FillMode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Empty', displayValue: 'Empty', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAppearances.Empty' }, { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.FillMode3D.Solid' }, { value: 'Gradient', displayValue: 'Gradient', localizationId: 'DevExpress.XtraCharts.FillMode3D.Gradient' }], defaultVal: 'Empty'
};
var fillStyleInfo1 = [fillMode1, _series_1.fillStyleOptionsSerialize, _common_1.tag];
var fillStyle3 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.FillStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), from: _fillStyle_1.FillStyle.from(fillStyleInfo1, 'RectangleGradientFillOptions'), toJsonObject: _fillStyle_1.FillStyle.toJson };
var model = {
    propertyName: 'model', modelName: '@Model', displayName: 'Model', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.Model', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Box', displayValue: 'Box', localizationId: 'DevExpress.XtraCharts.Bar3DModel.Box' }, { value: 'Cylinder', displayValue: 'Cylinder', localizationId: 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Cylinder' }, { value: 'Cone', displayValue: 'Cone', localizationId: 'DevExpress.XtraCharts.Bar3DModel.Cone' }, { value: 'Pyramid', displayValue: 'Pyramid', localizationId: 'DevExpress.XtraCharts.Bar3DModel.Pyramid' }], defaultVal: 'Box'
};
var showFacet = { propertyName: 'showFacet', modelName: '@ShowFacet', displayName: 'Show Facet', localizationId: 'DevExpress.XtraCharts.Bar3DSeriesView.ShowFacet', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var colorEach2 = { propertyName: 'colorEach', modelName: '@ColorEach', displayName: 'Color Each', localizationId: 'DevExpress.XtraCharts.SeriesView3DColorEachSupportBase.ColorEach', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var sideBySideFullStackedBar3DSeriesViewinfo = [stackedGroup, barDistance, barDistanceFixed, equalBarWidth, viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, _common_1.tag];
var stackedGroup1 = { propertyName: 'stackedGroup', modelName: '@StackedGroupSerializable', displayName: 'Stacked Group', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBarSeriesView.StackedGroup', editor: _editorTemplates_1.editorTemplates.getEditor('group'), defaultVal: null };
var barDistance1 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBarSeriesView.BarDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var barDistanceFixed1 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBarSeriesView.BarDistanceFixed', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
var equalBarWidth1 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideFullStackedBarSeriesView.EqualBarWidth', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var barWidth1 = { propertyName: 'barWidth', modelName: '@BarWidth', displayName: 'Bar Width', localizationId: 'DevExpress.XtraCharts.BarSeriesView.BarWidth', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 0, step: 0.1 } };
var border3 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.BarSeriesView.Border', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: borderInfo };
var fillStyle4 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.BarSeriesView.FillStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), from: _fillStyle_1.FillStyle.from(exports.fillStyleInfo, 'RectangleGradientFillOptions'), toJsonObject: _fillStyle_1.FillStyle.toJson };
var transparency5 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.BarSeriesView.Transparency', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var sideBySideFullStackedBarSeriesViewinfo = [stackedGroup1, barDistance1, barDistanceFixed1, equalBarWidth1, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var stackedGroup2 = { propertyName: 'stackedGroup', modelName: '@StackedGroupSerializable', displayName: 'Stacked Group', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBar3DSeriesView.StackedGroup', editor: _editorTemplates_1.editorTemplates.getEditor('group'), defaultVal: null };
var barDistance2 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBar3DSeriesView.BarDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var barDistanceFixed2 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBar3DSeriesView.BarDistanceFixed', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
var equalBarWidth2 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBar3DSeriesView.EqualBarWidth', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var sideBySideStackedBar3DSeriesViewinfo = [stackedGroup2, barDistance2, barDistanceFixed2, equalBarWidth2, viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, _common_1.tag];
var stackedGroup3 = { propertyName: 'stackedGroup', modelName: '@StackedGroupSerializable', displayName: 'Stacked Group', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBarSeriesView.StackedGroup', editor: _editorTemplates_1.editorTemplates.getEditor('group'), defaultVal: null };
var barDistance3 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBarSeriesView.BarDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var barDistanceFixed3 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBarSeriesView.BarDistanceFixed', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
var equalBarWidth3 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideStackedBarSeriesView.EqualBarWidth', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var sideBySideStackedBarSeriesViewinfo = [stackedGroup3, barDistance3, barDistanceFixed3, equalBarWidth3, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var lineThickness = { propertyName: 'lineThickness', modelName: '@LineThickness', displayName: 'Line Thickness', localizationId: 'DevExpress.XtraCharts.Line3DSeriesView.LineThickness', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 5, editorOptions: { min: 1 } };
var lineWidth = { propertyName: 'lineWidth', modelName: '@LineWidth', displayName: 'Line Width', localizationId: 'DevExpress.XtraCharts.Line3DSeriesView.LineWidth', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0.6, editorOptions: { min: 1 } };
var fullStackedLine3DSeriesViewinfo = [lineThickness, lineWidth, aggregateFunction2, transparency2, color1, _common_1.tag];
var thickness1 = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', localizationId: 'DevExpress.XtraCharts.LineStyle.Thickness', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 2, editorOptions: { min: 1 } };
var viewDashStyle = {
    propertyName: 'dashStyle', modelName: '@DashStyle', displayName: 'Dash Style', localizationId: 'DevExpress.XtraCharts.LineStyle.DashStyle', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.FillMode3D.Solid' }, { value: 'Dash', displayValue: 'Dash', localizationId: 'DevExpress.XtraCharts.DashStyle.Dash' }, { value: 'Dot', displayValue: 'Dot', localizationId: 'DevExpress.XtraCharts.DashStyle.Dot' }, { value: 'DashDot', displayValue: 'DashDot' }, { value: 'DashDotDot', displayValue: 'DashDotDot' }], defaultVal: 'Solid'
};
var lineJoin = {
    propertyName: 'lineJoin', modelName: '@LineJoin', displayName: 'Line Join', localizationId: 'DevExpress.XtraCharts.LineStyle.LineJoin', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Miter', displayValue: 'Miter', localizationId: 'System.Drawing.Drawing2D.LineJoin.Miter' }, { value: 'Bevel', displayValue: 'Bevel', localizationId: 'System.Drawing.Drawing2D.LineJoin.Bevel' }, { value: 'Round', displayValue: 'Round', localizationId: 'System.Drawing.Drawing2D.LineJoin.Round' }, { value: 'MiterClipped', displayValue: 'MiterClipped', localizationId: 'System.Drawing.Drawing2D.LineJoin.MiterClipped' }], defaultVal: 'Miter'
};
var lineStyleInfo = [thickness1, viewDashStyle, lineJoin, _common_1.tag];
var viewLineStyle = { propertyName: 'lineStyle', modelName: 'LineStyle', displayName: 'Line Style', localizationId: 'DevExpress.XtraCharts.LineSeriesView.LineStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: lineStyleInfo, };
var lineMarkerOptionsInfo = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, _common_1.tag];
var lineMarkerOptions = { propertyName: 'lineMarkerOptions', modelName: 'LineMarkerOptions', displayName: 'Line Marker Options', localizationId: 'DevExpress.XtraCharts.LineSeriesView.LineMarkerOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: lineMarkerOptionsInfo, };
var fullStackedLineSeriesViewinfo = [viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var lineStyle1 = { propertyName: 'lineStyle', modelName: 'LineStyle', displayName: 'Line Style', localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.LineStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: lineStyleInfo, };
var closed = { propertyName: 'closed', modelName: '@Closed', displayName: 'Closed', localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.Closed', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var lineMarkerOptions1 = { propertyName: 'lineMarkerOptions', modelName: 'LineMarkerOptions', displayName: 'Line Marker Options', localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.LineMarkerOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: lineMarkerOptionsInfo, };
var markerVisibility1 = {
    propertyName: 'markerVisibility', modelName: '@MarkerVisibility', displayName: 'Marker Visibility', localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.MarkerVisibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var scatterPolarLineSeriesViewinfo = [lineStyle1, closed, lineMarkerOptions1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var scatterRadarLineSeriesViewinfo = [lineStyle1, closed, lineMarkerOptions1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var stackedLine3DSeriesViewinfo = [lineThickness, lineWidth, aggregateFunction2, transparency2, color1, _common_1.tag];
var stackedLineSeriesViewinfo = [viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var weight = { propertyName: 'weight', modelName: '@Weight', displayName: 'Weight', localizationId: 'DevExpress.XtraCharts.NestedDoughnutSeriesView.Weight', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { min: 1 } };
var innerIndent = { propertyName: 'innerIndent', modelName: '@InnerIndent', displayName: 'Inner Indent', localizationId: 'DevExpress.XtraCharts.NestedDoughnutSeriesView.InnerIndent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 5, editorOptions: { min: 0 } };
var group = { propertyName: 'group', modelName: '@GroupSerializable', displayName: 'Group', localizationId: 'DevExpress.XtraCharts.NestedDoughnutSeriesView.Group', editor: _editorTemplates_1.editorTemplates.getEditor('group'), defaultVal: null };
var holeRadiusPercent = { propertyName: 'holeRadiusPercent', modelName: '@HoleRadiusPercent', displayName: 'Hole Radius Percent', localizationId: 'DevExpress.XtraCharts.DoughnutSeriesView.HoleRadiusPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 40, editorOptions: { min: 0, max: 100 } };
var minAllowedSizePercentage = { propertyName: 'minAllowedSizePercentage', modelName: '@MinAllowedSizePercentage', displayName: 'Min Allowed Size Percentage', localizationId: 'DevExpress.XtraCharts.PieSeriesView.MinAllowedSizePercentage', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 50, editorOptions: { min: 0, max: 100 } };
var rotation = { propertyName: 'rotation', modelName: '@Rotation', displayName: 'Rotation', localizationId: 'DevExpress.XtraCharts.PieSeriesView.Rotation', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var heightToWidthRatio = { propertyName: 'heightToWidthRatio', modelName: '@HeightToWidthRatio', displayName: 'Height to Width Ratio', localizationId: 'DevExpress.XtraCharts.PieSeriesView.HeightToWidthRatio', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { min: 0 } };
var border4 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.PieSeriesView.Border', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: borderInfo, };
var fillStyle5 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.PieSeriesView.FillStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), from: _fillStyle_1.FillStyle.from(exports.fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: _fillStyle_1.FillStyle.toJson };
var runtimeExploding = { propertyName: 'runtimeExploding', modelName: '@RuntimeExploding', displayName: 'Runtime Exploding', localizationId: 'DevExpress.XtraCharts.PieSeriesView.RuntimeExploding', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var explodedDistancePercentage = { propertyName: 'explodedDistancePercentage', modelName: '@ExplodedDistancePercentage', displayName: 'Exploded Distance Percentage', localizationId: 'DevExpress.XtraCharts.PieSeriesViewBase.ExplodedDistancePercentage', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 10, editorOptions: { min: 1 } };
var explodeMode = {
    propertyName: 'explodeMode', modelName: '@ExplodeMode', displayName: 'Explode Mode', localizationId: 'DevExpress.XtraCharts.PieSeriesViewBase.ExplodeMode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'All', displayValue: 'All', localizationId: 'DevExpress.XtraCharts.PieExplodeMode.All' }, { value: 'MinValue', displayValue: 'MinValue' }, { value: 'MaxValue', displayValue: 'MaxValue' }, { value: 'UsePoints', displayValue: 'UsePoints' }, { value: 'UseFilters', displayValue: 'UseFilters' }, { value: 'Others', displayValue: 'Others', localizationId: 'DevExpress.XtraCharts.PieExplodeMode.Others' }], defaultVal: 'None'
};
var sweepDirection = {
    propertyName: 'sweepDirection', modelName: '@SweepDirection', displayName: 'Sweep Direction', localizationId: 'DevExpress.XtraCharts.PieSeriesViewBase.SweepDirection', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Counterclockwise', displayValue: 'Counterclockwise', localizationId: 'DevExpress.XtraCharts.PieSweepDirection.Counterclockwise' }, { value: 'Clockwise', displayValue: 'Clockwise', localizationId: 'DevExpress.XtraCharts.PieSweepDirection.Clockwise' }], defaultVal: 'Counterclockwise'
};
var totalLabelInfo = [_common_1.textColor, _common_1.backColor, viewEnableAntialiasing, _common_1.maxWidth, _common_1.maxLineCount, _common_1.textAlignment, _common_1.textPattern, viewVisible, _common_1.tag, _common_1.font12, viewBorder1, viewFillStyle, shadow];
var totalLabel = { propertyName: 'totalLabel', modelName: 'TotalLabel', displayName: 'Total Label', localizationId: 'DevExpress.XtraCharts.PieSeriesView.TotalLabel', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: totalLabelInfo, };
var viewTitles = {
    propertyName: 'titles',
    modelName: 'Titles',
    array: true,
    from: function (model, serializer) {
        return _utils_1.deserializeModelArray(model, function (title, parent) { return new _title_1.TitleViewModel(title, parent, serializer); }, _title_1.TitleViewModel.prefix);
    },
    displayName: 'Titles',
    localizationId: 'DevExpress.XtraCharts.SimpleDiagramSeriesViewBase.Titles'
};
var nestedDoughnutSeriesViewinfo = [weight, innerIndent, group, holeRadiusPercent, minAllowedSizePercentage, rotation, heightToWidthRatio, border4, fillStyle5, runtimeExploding, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, _common_1.tag, totalLabel];
var thickness2 = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', localizationId: 'DevExpress.XtraCharts.LineStyle.Thickness', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { min: 1 } };
var lineStyleInfo1 = [thickness2, viewDashStyle, lineJoin, _common_1.tag];
var lineStyle2 = { propertyName: 'lineStyle', modelName: 'LineStyle', displayName: 'Line Style', localizationId: 'DevExpress.XtraCharts.SwiftPlotSeriesView.LineStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: lineStyleInfo1, };
var viewAntialiasing = { propertyName: 'antialiasing', modelName: '@Antialiasing', displayName: 'Antialiasing', localizationId: 'DevExpress.XtraCharts.SwiftPlotSeriesView.Antialiasing', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var swiftPlotSeriesViewinfo = [lineStyle2, viewAntialiasing, exports.axisXName, exports.axisYName, exports.paneName, viewAggregateFunction, indicators, color1, _common_1.tag];
var holeRadiusPercent1 = { propertyName: 'holeRadiusPercent', modelName: '@HoleRadiusPercent', displayName: 'Hole Radius Percent', localizationId: 'DevExpress.XtraCharts.Funnel3DSeriesView.HoleRadiusPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 90, editorOptions: { min: 0, max: 100 } };
var heightToWidthRatio1 = { propertyName: 'heightToWidthRatio', modelName: '@HeightToWidthRatio', displayName: 'Height to Width Ratio', localizationId: 'DevExpress.XtraCharts.FunnelSeriesViewBase.HeightToWidthRatio', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1 };
var pointDistance = { propertyName: 'pointDistance', modelName: '@PointDistance', displayName: 'Point Distance', localizationId: 'DevExpress.XtraCharts.FunnelSeriesViewBase.PointDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0, editorOptions: { min: 0 } };
var funnel3DSeriesViewinfo = [holeRadiusPercent1, heightToWidthRatio1, pointDistance, viewTitles, _common_1.tag];
var border5 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.FunnelSeriesView.Border', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: borderInfo, };
var fillStyle6 = { propertyName: 'fillStyle', modelName: 'FillStyle', displayName: 'Fill Style', localizationId: 'DevExpress.XtraCharts.FunnelSeriesView.FillStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), from: _fillStyle_1.FillStyle.from(exports.fillStyleInfo, 'PolygonGradientFillOptions'), toJsonObject: _fillStyle_1.FillStyle.toJson };
var alignToCenter = { propertyName: 'alignToCenter', modelName: '@AlignToCenter', displayName: 'Align to Center', localizationId: 'DevExpress.XtraCharts.FunnelSeriesView.AlignToCenter', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var heightToWidthRatioAuto = { propertyName: 'heightToWidthRatioAuto', modelName: '@HeightToWidthRatioAuto', displayName: 'Height to Width Ratio Auto', localizationId: 'DevExpress.XtraCharts.FunnelSeriesView.HeightToWidthRatioAuto', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var funnelSeriesViewinfo = [border5, fillStyle6, alignToCenter, heightToWidthRatioAuto, heightToWidthRatio1, pointDistance, viewTitles, _common_1.tag];
var scatterLineSeriesViewinfo = [viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var bubbleMarkerOptionsInfo = [kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, _common_1.tag];
var bubbleMarkerOptions = { propertyName: 'bubbleMarkerOptions', modelName: 'BubbleMarkerOptions', displayName: 'Bubble Marker Options', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.BubbleMarkerOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: bubbleMarkerOptionsInfo, };
var autoSize = { propertyName: 'autoSize', modelName: '@AutoSize', displayName: 'Automatic Size', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.AutoSize', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var maxSize = { propertyName: 'maxSize', modelName: '@MaxSize', displayName: 'Max Size', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.MaxSize', editor: _editorTemplates_1.editorTemplates.getEditor('maxSize'), defaultVal: 0.9 };
var minSize = { propertyName: 'minSize', modelName: '@MinSize', displayName: 'Min Size', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.MinSize', editor: _editorTemplates_1.editorTemplates.getEditor('minSize'), defaultVal: 0.3, editorOptions: { min: 0 } };
var transparency6 = { propertyName: 'transparency', modelName: '@Transparency', displayName: 'Transparency', localizationId: 'DevExpress.XtraCharts.BubbleSeriesView.Transparency', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var bubbleSeriesViewinfo = [bubbleMarkerOptions, autoSize, maxSize, minSize, transparency6, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var lineTensionPercent = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.Spline3DSeriesView.LineTensionPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
var spline3DSeriesViewinfo = [lineTensionPercent, lineThickness, lineWidth, aggregateFunction2, transparency2, color1, _common_1.tag];
var lineTensionPercent1 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.SplineArea3DSeriesView.LineTensionPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
var splineArea3DSeriesViewinfo = [lineTensionPercent1, areaWidth, aggregateFunction2, transparency4, color1, _common_1.tag];
var lineTensionPercent2 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.FullStackedSplineArea3DSeriesView.LineTensionPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
var fullStackedSplineArea3DSeriesViewinfo = [lineTensionPercent2, areaWidth, aggregateFunction2, transparency4, color1, _common_1.tag];
var lineTensionPercent3 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.SplineAreaSeriesView.LineTensionPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
var splineAreaSeriesViewinfo = [lineTensionPercent3, viewBorder1, viewFillStyle, markerOptions, transparency3, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var lineTensionPercent4 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.FullStackedSplineAreaSeriesView.LineTensionPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
var fullStackedSplineAreaSeriesViewinfo = [lineTensionPercent4, viewFillStyle, transparency, viewEnableAntialiasing, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var lineTensionPercent5 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.StackedSplineArea3DSeriesView.LineTensionPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
var stackedSplineArea3DSeriesViewinfo = [lineTensionPercent5, areaWidth, aggregateFunction2, transparency4, color1, _common_1.tag];
var lineTensionPercent6 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.SplineSeriesView.LineTensionPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
var splineSeriesViewinfo = [lineTensionPercent6, viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var lineTensionPercent7 = { propertyName: 'lineTensionPercent', modelName: '@LineTensionPercent', displayName: 'Line Tension Percent', localizationId: 'DevExpress.XtraCharts.StackedSplineAreaSeriesView.LineTensionPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 80, editorOptions: { min: 0, max: 100 } };
var stackedSplineAreaSeriesViewinfo = [lineTensionPercent7, viewBorder1, viewFillStyle, transparency, viewEnableAntialiasing, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var area3DSeriesViewinfo = [areaWidth, aggregateFunction2, transparency4, color1, _common_1.tag];
var fullStackedArea3DSeriesViewinfo = [areaWidth, aggregateFunction2, transparency4, color1, _common_1.tag];
var border6 = { propertyName: 'border', modelName: 'Border', displayName: 'Border', localizationId: 'DevExpress.XtraCharts.RadarAreaSeriesView.Border', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: borderInfo, };
var markerOptions1 = { propertyName: 'markerOptions', modelName: 'MarkerOptions', displayName: 'Marker Options', localizationId: 'DevExpress.XtraCharts.RadarAreaSeriesView.MarkerOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: markerOptionsInfo, };
var polarAreaSeriesViewinfo = [border6, fillStyle2, markerOptions1, transparency1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var radarAreaSeriesViewinfo = [border6, fillStyle2, markerOptions1, transparency1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var stackedArea3DSeriesViewinfo = [areaWidth, aggregateFunction2, transparency4, color1, _common_1.tag];
var fullStackedBar3DSeriesViewinfo = [viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, _common_1.tag];
var barDistance4 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideBar3DSeriesView.BarDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var barDistanceFixed4 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideBar3DSeriesView.BarDistanceFixed', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
var equalBarWidth4 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideBar3DSeriesView.EqualBarWidth', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var sideBySideBar3DSeriesViewinfo = [barDistance4, barDistanceFixed4, equalBarWidth4, viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, _common_1.tag];
var stackedBar3DSeriesViewinfo = [viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, _common_1.tag];
var polarLineSeriesViewinfo = [lineStyle1, closed, lineMarkerOptions1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var radarLineSeriesViewinfo = [lineStyle1, closed, lineMarkerOptions1, markerVisibility1, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var holeRadiusPercent2 = { propertyName: 'holeRadiusPercent', modelName: '@HoleRadiusPercent', displayName: 'Hole Radius Percent', localizationId: 'DevExpress.XtraCharts.Doughnut3DSeriesView.HoleRadiusPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 60, editorOptions: { min: 0, max: 100 } };
var depth = { propertyName: 'depth', modelName: '@Depth', displayName: 'Depth', localizationId: 'DevExpress.XtraCharts.Pie3DSeriesView.Depth', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 15, editorOptions: { min: 1, max: 100 } };
var sizeAsPercentage = { propertyName: 'sizeAsPercentage', modelName: '@SizeAsPercentage', displayName: 'Size As Percentage', localizationId: 'DevExpress.XtraCharts.Pie3DSeriesView.SizeAsPercentage', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 100, editorOptions: { min: 0, max: 100 } };
var pieFillStyleInfo = [fillMode1, _series_1.fillStyleOptionsSerialize, _common_1.tag];
var pieFillStyle = { propertyName: 'pieFillStyle', modelName: 'PieFillStyle', displayName: 'Pie Fill Style', localizationId: 'DevExpress.XtraCharts.Pie3DSeriesView.PieFillStyle', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: pieFillStyleInfo, };
var doughnut3DSeriesViewinfo = [holeRadiusPercent2, depth, sizeAsPercentage, pieFillStyle, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, _common_1.tag];
var holeRadiusPercent3 = { propertyName: 'holeRadiusPercent', modelName: '@HoleRadiusPercent', displayName: 'Hole Radius Percent', localizationId: 'DevExpress.XtraCharts.DoughnutSeriesView.HoleRadiusPercent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 60, editorOptions: { min: 0, max: 100 } };
var doughnutSeriesViewinfo = [holeRadiusPercent3, minAllowedSizePercentage, rotation, heightToWidthRatio, border4, fillStyle5, runtimeExploding, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, _common_1.tag, totalLabel];
var size2 = { propertyName: 'size', modelName: '@Size', displayName: 'Size', localizationId: 'DevExpress.XtraCharts.SimpleMarker.Size', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 8, editorOptions: { min: 1 } };
var pointMarkerOptionsInfo = [size2, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, _common_1.tag];
var pointMarkerOptions = { propertyName: 'pointMarkerOptions', modelName: 'PointMarkerOptions', displayName: 'Point Marker Options', localizationId: 'DevExpress.XtraCharts.RadarPointSeriesView.PointMarkerOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: pointMarkerOptionsInfo, };
var polarPointSeriesViewinfo = [pointMarkerOptions, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var arrowWidth = { propertyName: 'arrowWidth', modelName: '@ArrowWidth', displayName: 'Arrow Width', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.ArrowWidth', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 7, editorOptions: { min: 1 }, validationRules: arrowWidthValidationRules };
var arrowHeight = { propertyName: 'arrowHeight', modelName: '@ArrowHeight', displayName: 'Arrow Height', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.ArrowHeight', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 5, editorOptions: { min: 1 } };
var viewMinIndent = { propertyName: 'minIndent', modelName: '@MinIndent', displayName: 'Min Indent', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.MinIndent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 2, editorOptions: { min: 0 } };
var thickness3 = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.Thickness', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 3, editorOptions: { min: 1 } };
var visible1 = { propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.Visible', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var colorSource = {
    propertyName: 'colorSource', modelName: '@ColorSource', displayName: 'Color Source', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.ColorSource', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'ParentColor', displayValue: 'ParentColor' }, { value: 'ParentBorderColor', displayValue: 'ParentBorderColor' }, { value: 'ChildColor', displayValue: 'ChildColor' }, { value: 'ChildBorderColor', displayValue: 'ChildBorderColor' }, { value: 'OwnColor', displayValue: 'OwnColor' }], defaultVal: 'ParentColor'
};
var color4 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: _editorTemplates_1.editorTemplates.getEditor('undoCustomColorEditor'), defaultVal: 'transparent' };
var inFront = { propertyName: 'inFront', modelName: '@InFront', displayName: 'In Front', localizationId: 'DevExpress.XtraCharts.TaskLinkOptions.InFront', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var linkOptionsInfo = [arrowWidth, arrowHeight, viewMinIndent, thickness3, visible1, colorSource, color4, inFront, _common_1.tag];
var linkOptions = { propertyName: 'linkOptions', modelName: 'LinkOptions', displayName: 'Link Options', localizationId: 'DevExpress.XtraCharts.GanttSeriesView.LinkOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: linkOptionsInfo, };
var minValueMarkerInfo = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, _common_1.tag];
var minValueMarker = { propertyName: 'minValueMarker', modelName: 'MinValueMarker', displayName: 'Min Value Marker', localizationId: 'DevExpress.XtraCharts.RangeBarSeriesView.MinValueMarker', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: minValueMarkerInfo, };
var maxValueMarkerInfo = [viewColor2, size1, kind, starPointCount, fillStyle1, viewBorderVisible, viewBorderColor, _common_1.tag];
var maxValueMarker = { propertyName: 'maxValueMarker', modelName: 'MaxValueMarker', displayName: 'Max Value Marker', localizationId: 'DevExpress.XtraCharts.RangeBarSeriesView.MaxValueMarker', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: maxValueMarkerInfo, };
var minValueMarkerVisibility = {
    propertyName: 'minValueMarkerVisibility', modelName: '@MinValueMarkerVisibility', displayName: 'Min Value Marker Visibility', localizationId: 'DevExpress.XtraCharts.RangeBarSeriesView.MinValueMarkerVisibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var maxValueMarkerVisibility = {
    propertyName: 'maxValueMarkerVisibility', modelName: '@MaxValueMarkerVisibility', displayName: 'Max Value Marker Visibility', localizationId: 'DevExpress.XtraCharts.RangeBarSeriesView.MaxValueMarkerVisibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' }, { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }], defaultVal: 'Default'
};
var overlappedGanttSeriesViewinfo = [linkOptions, minValueMarker, maxValueMarker, minValueMarkerVisibility, maxValueMarkerVisibility, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var radarPointSeriesViewinfo = [pointMarkerOptions, aggregateFunction1, shadow1, viewColorEach, color1, _common_1.tag];
var barDistance5 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideGanttSeriesView.BarDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var barDistanceFixed5 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideGanttSeriesView.BarDistanceFixed', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
var equalBarWidth5 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideGanttSeriesView.EqualBarWidth', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var sideBySideGanttSeriesViewinfo = [barDistance5, barDistanceFixed5, equalBarWidth5, linkOptions, minValueMarker, maxValueMarker, minValueMarkerVisibility, maxValueMarkerVisibility, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var areaSeriesViewinfo = [viewBorder1, viewFillStyle, markerOptions, transparency3, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var fillMode2 = {
    propertyName: 'fillMode', modelName: '@FillMode', displayName: 'Fill Mode', localizationId: 'DevExpress.XtraCharts.CandleStickReductionOptions.FillMode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'FilledOnReduction', displayValue: 'FilledOnReduction' }, { value: 'FilledOnIncrease', displayValue: 'FilledOnIncrease' }, { value: 'AlwaysEmpty', displayValue: 'AlwaysEmpty' }, { value: 'AlwaysFilled', displayValue: 'AlwaysFilled' }], defaultVal: 'FilledOnReduction'
};
var color5 = { propertyName: 'color', modelName: '@Color', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.ReductionStockOptions.Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: '255,255,0,0' };
var level = {
    propertyName: 'level', modelName: '@Level', displayName: 'Level', localizationId: 'DevExpress.XtraCharts.ReductionStockOptions.Level', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Low', displayValue: 'Low', localizationId: 'DevExpress.XtraCharts.StockLevel.Low' }, { value: 'High', displayValue: 'High', localizationId: 'DevExpress.XtraCharts.StockLevel.High' }, { value: 'Open', displayValue: 'Open', localizationId: 'DevExpress.XtraCharts.StockLevel.Open' }, { value: 'Close', displayValue: 'Close', localizationId: 'DevExpress.XtraCharts.StockLevel.Close' }], defaultVal: 'Close'
};
var visible2 = { propertyName: 'visible', modelName: '@Visible', displayName: 'Visible', localizationId: 'DevExpress.XtraCharts.ReductionStockOptions.Visible', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var colorMode = {
    propertyName: 'colorMode', modelName: '@ColorMode', displayName: 'Color Mode', localizationId: 'DevExpress.XtraCharts.ReductionStockOptions.ColorMode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'PreviousToCurrentPoint', displayValue: 'PreviousToCurrentPoint' }, { value: 'OpenToCloseValue', displayValue: 'OpenToCloseValue' }], defaultVal: 'PreviousToCurrentPoint'
};
var reductionOptionsInfo = [fillMode2, color5, level, visible2, colorMode, _common_1.tag];
var reductionOptions = { propertyName: 'reductionOptions', modelName: 'ReductionOptions', displayName: 'Reduction Options', localizationId: 'DevExpress.XtraCharts.CandleStickSeriesView.ReductionOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: reductionOptionsInfo, };
var levelLineLength = { propertyName: 'levelLineLength', modelName: '@LevelLineLength', displayName: 'Level Line Length', localizationId: 'DevExpress.XtraCharts.FinancialSeriesViewBase.LevelLineLength', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0.25, editorOptions: { min: 1 } };
var lineThickness1 = { propertyName: 'lineThickness', modelName: '@LineThickness', displayName: 'Line Thickness', localizationId: 'DevExpress.XtraCharts.FinancialSeriesViewBase.LineThickness', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 2, editorOptions: { min: 1 } };
var reductionOptionsInfo1 = [color5, level, visible2, colorMode, _common_1.tag];
var reductionOptions1 = { propertyName: 'reductionOptions', modelName: 'ReductionOptions', displayName: 'Reduction Options', localizationId: 'DevExpress.XtraCharts.FinancialSeriesViewBase.ReductionOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: reductionOptionsInfo1, };
var candleStickSeriesViewinfo = [reductionOptions, levelLineLength, lineThickness1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var fullStackedAreaSeriesViewinfo = [viewFillStyle, transparency, viewEnableAntialiasing, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var fullStackedBarSeriesViewinfo = [barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var line3DSeriesViewinfo = [lineThickness, lineWidth, aggregateFunction2, transparency2, color1, _common_1.tag];
var lineSeriesViewinfo = [viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var manhattanBarSeriesViewinfo = [viewBarWidth, barDepth, barDepthAuto, fillStyle3, model, showFacet, colorEach2, aggregateFunction2, transparency2, color1, _common_1.tag];
var overlappedRangeBarSeriesViewinfo = [minValueMarker, maxValueMarker, minValueMarkerVisibility, maxValueMarkerVisibility, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var pie3DSeriesViewinfo = [depth, sizeAsPercentage, pieFillStyle, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, _common_1.tag];
var pieSeriesViewinfo = [minAllowedSizePercentage, rotation, heightToWidthRatio, border4, fillStyle5, runtimeExploding, explodedDistancePercentage, explodeMode, sweepDirection, viewTitles, _common_1.tag, totalLabel];
var pointMarkerOptions1 = { propertyName: 'pointMarkerOptions', modelName: 'PointMarkerOptions', displayName: 'Point Marker Options', localizationId: 'DevExpress.XtraCharts.PointSeriesView.PointMarkerOptions', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: pointMarkerOptionsInfo, };
var pointSeriesViewinfo = [pointMarkerOptions1, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var barDistance6 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideBarSeriesView.BarDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var barDistanceFixed6 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideBarSeriesView.BarDistanceFixed', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
var equalBarWidth6 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideBarSeriesView.EqualBarWidth', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var sideBySideBarSeriesViewinfo = [barDistance6, barDistanceFixed6, equalBarWidth6, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var barDistance7 = { propertyName: 'barDistance', displayName: 'Bar Distance', localizationId: 'DevExpress.XtraCharts.SideBySideRangeBarSeriesView.BarDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0 };
var barDistanceFixed7 = { propertyName: 'barDistanceFixed', displayName: 'Bar Distance Fixed', localizationId: 'DevExpress.XtraCharts.SideBySideRangeBarSeriesView.BarDistanceFixed', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 1, editorOptions: { format: '#0' } };
var equalBarWidth7 = { propertyName: 'equalBarWidth', modelName: '@EqualBarWidth', displayName: 'Equal Bar Width', localizationId: 'DevExpress.XtraCharts.SideBySideRangeBarSeriesView.EqualBarWidth', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true };
var sideBySideRangeBarSeriesViewinfo = [barDistance7, barDistanceFixed7, equalBarWidth7, minValueMarker, maxValueMarker, minValueMarkerVisibility, maxValueMarkerVisibility, barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var stackedAreaSeriesViewinfo = [viewBorder1, viewFillStyle, transparency, viewEnableAntialiasing, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var stackedBarSeriesViewinfo = [barWidth1, border3, fillStyle4, transparency5, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var invertedStep4 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StepLineSeriesView.InvertedStep', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var stepLineSeriesViewinfo = [invertedStep4, viewLineStyle, lineMarkerOptions, viewMarkerVisibility, viewEnableAntialiasing, colorEach1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var showOpenClose = {
    propertyName: 'showOpenClose', modelName: '@ShowOpenClose', displayName: 'Show Open Close', localizationId: 'DevExpress.XtraCharts.StockSeriesView.ShowOpenClose', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Both', displayValue: 'Both', localizationId: 'DevExpress.XtraCharts.ErrorBarDirection.Both' }, { value: 'Open', displayValue: 'Open', localizationId: 'DevExpress.XtraCharts.StockLevel.Open' }, { value: 'Close', displayValue: 'Close', localizationId: 'DevExpress.XtraCharts.StockLevel.Close' }], defaultVal: 'Both'
};
var stockSeriesViewinfo = [showOpenClose, levelLineLength, lineThickness1, reductionOptions1, shadow, exports.paneName, exports.axisXName, exports.axisYName, viewAggregateFunction, indicators, color1, _common_1.tag];
var invertedStep5 = { propertyName: 'invertedStep', modelName: '@InvertedStep', displayName: 'Inverted Step', localizationId: 'DevExpress.XtraCharts.StepLine3DSeriesView.InvertedStep', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false };
var stepLine3DSeriesViewinfo = [invertedStep5, lineThickness, lineWidth, aggregateFunction2, transparency2, color1, _common_1.tag];
var risingbarcolor = { propertyName: 'risingBarColor', modelName: '@RisingBarColor', displayName: 'Rising Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.RisingBarColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
var fallingbarcolor = { propertyName: 'fallingBarColor', modelName: '@FallingBarColor', displayName: 'Falling Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.FallingBarColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'transparent' };
var startbarcolor = { propertyName: 'startBarColor', modelName: '@StartBarColor', displayName: 'Start Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.StartBarColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'Gray' };
var subtotalbarcolor = { propertyName: 'subtotalBarColor', modelName: '@SubtotalBarColor', displayName: 'Subtotal Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.SubtotalBarColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'Gray' };
var totalbarcolor = { propertyName: 'totalBarColor', modelName: '@TotalBarColor', displayName: 'Total Bar Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.TotalBarColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'Gray' };
var connectorcolor = { propertyName: 'connectorColor', modelName: '@ConnectorColor', displayName: 'Connector Color', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesView.ConnectorColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), defaultVal: 'Gray' };
var waterfallSeriesView = stackedBarSeriesViewinfo.concat([risingbarcolor, fallingbarcolor, startbarcolor, subtotalbarcolor, totalbarcolor, connectorcolor]);
exports.viewMapper = {
    FullStackedStepAreaSeriesView: fullStackedStepAreaSeriesViewinfo,
    PolarRangeAreaSeriesView: polarRangeAreaSeriesViewinfo,
    RadarRangeAreaSeriesView: radarRangeAreaSeriesViewinfo,
    RangeArea3DSeriesView: rangeArea3DSeriesViewinfo,
    RangeAreaSeriesView: rangeAreaSeriesViewinfo,
    StackedStepAreaSeriesView: stackedStepAreaSeriesViewinfo,
    StepArea3DSeriesView: stepArea3DSeriesViewinfo,
    StepAreaSeriesView: stepAreaSeriesViewinfo,
    SideBySideFullStackedBar3DSeriesView: sideBySideFullStackedBar3DSeriesViewinfo,
    SideBySideFullStackedBarSeriesView: sideBySideFullStackedBarSeriesViewinfo,
    SideBySideStackedBar3DSeriesView: sideBySideStackedBar3DSeriesViewinfo,
    SideBySideStackedBarSeriesView: sideBySideStackedBarSeriesViewinfo,
    FullStackedLine3DSeriesView: fullStackedLine3DSeriesViewinfo,
    FullStackedLineSeriesView: fullStackedLineSeriesViewinfo,
    WaterfallSeriesView: waterfallSeriesView,
    ScatterPolarLineSeriesView: scatterPolarLineSeriesViewinfo,
    ScatterRadarLineSeriesView: scatterRadarLineSeriesViewinfo,
    StackedLine3DSeriesView: stackedLine3DSeriesViewinfo,
    StackedLineSeriesView: stackedLineSeriesViewinfo,
    NestedDoughnutSeriesView: nestedDoughnutSeriesViewinfo,
    SwiftPlotSeriesView: swiftPlotSeriesViewinfo,
    Funnel3DSeriesView: funnel3DSeriesViewinfo,
    FunnelSeriesView: funnelSeriesViewinfo,
    ScatterLineSeriesView: scatterLineSeriesViewinfo,
    BubbleSeriesView: bubbleSeriesViewinfo,
    Spline3DSeriesView: spline3DSeriesViewinfo,
    SplineArea3DSeriesView: splineArea3DSeriesViewinfo,
    FullStackedSplineArea3DSeriesView: fullStackedSplineArea3DSeriesViewinfo,
    SplineAreaSeriesView: splineAreaSeriesViewinfo,
    FullStackedSplineAreaSeriesView: fullStackedSplineAreaSeriesViewinfo,
    StackedSplineArea3DSeriesView: stackedSplineArea3DSeriesViewinfo,
    SplineSeriesView: splineSeriesViewinfo,
    StackedSplineAreaSeriesView: stackedSplineAreaSeriesViewinfo,
    Area3DSeriesView: area3DSeriesViewinfo,
    FullStackedArea3DSeriesView: fullStackedArea3DSeriesViewinfo,
    PolarAreaSeriesView: polarAreaSeriesViewinfo,
    RadarAreaSeriesView: radarAreaSeriesViewinfo,
    StackedArea3DSeriesView: stackedArea3DSeriesViewinfo,
    FullStackedBar3DSeriesView: fullStackedBar3DSeriesViewinfo,
    SideBySideBar3DSeriesView: sideBySideBar3DSeriesViewinfo,
    StackedBar3DSeriesView: stackedBar3DSeriesViewinfo,
    PolarLineSeriesView: polarLineSeriesViewinfo,
    RadarLineSeriesView: radarLineSeriesViewinfo,
    Doughnut3DSeriesView: doughnut3DSeriesViewinfo,
    DoughnutSeriesView: doughnutSeriesViewinfo,
    PolarPointSeriesView: polarPointSeriesViewinfo,
    OverlappedGanttSeriesView: overlappedGanttSeriesViewinfo,
    RadarPointSeriesView: radarPointSeriesViewinfo,
    SideBySideGanttSeriesView: sideBySideGanttSeriesViewinfo,
    AreaSeriesView: areaSeriesViewinfo,
    CandleStickSeriesView: candleStickSeriesViewinfo,
    FullStackedAreaSeriesView: fullStackedAreaSeriesViewinfo,
    FullStackedBarSeriesView: fullStackedBarSeriesViewinfo,
    Line3DSeriesView: line3DSeriesViewinfo,
    LineSeriesView: lineSeriesViewinfo,
    ManhattanBarSeriesView: manhattanBarSeriesViewinfo,
    OverlappedRangeBarSeriesView: overlappedRangeBarSeriesViewinfo,
    Pie3DSeriesView: pie3DSeriesViewinfo,
    PieSeriesView: pieSeriesViewinfo,
    PointSeriesView: pointSeriesViewinfo,
    SideBySideBarSeriesView: sideBySideBarSeriesViewinfo,
    SideBySideRangeBarSeriesView: sideBySideRangeBarSeriesViewinfo,
    StackedAreaSeriesView: stackedAreaSeriesViewinfo,
    StackedBarSeriesView: stackedBarSeriesViewinfo,
    StepLineSeriesView: stepLineSeriesViewinfo,
    StockSeriesView: stockSeriesViewinfo,
    StepLine3DSeriesView: stepLine3DSeriesViewinfo,
};
