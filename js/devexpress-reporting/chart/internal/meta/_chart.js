﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_chart.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _series_1 = require("../../components/series/_series");
var _utils_1 = require("../_utils");
var _common_1 = require("./_common");
var _commonValue_1 = require("../data/_commonValue");
var _series_2 = require("./_series");
var _label_1 = require("../../components/series/_label");
var _dataFilter_1 = require("../../components/models/_dataFilter");
var _point_1 = require("../../components/series/_point");
var _view_1 = require("../../components/series/_view");
var _summaryOptionsMetaData_1 = require("../../components/series/_summaryOptionsMetaData");
var _summaryOptions_1 = require("../../components/series/_summaryOptions");
var _axis_1 = require("./_axis");
var _template_1 = require("../../components/series/_template");
var _dataContainer_1 = require("../../components/models/_dataContainer");
var _legend_1 = require("../../components/models/_legend");
var _diagram_1 = require("./_diagram");
var _chart_1 = require("../../components/models/_chart");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var _settings_1 = require("../../../designer/internal/_settings");
var _editorTemplates_1 = require("../_editorTemplates");
var sideBySideEqualBarWidth = { propertyName: 'equalBarWidth', modelName: '@SideBySideEqualBarWidth', displayName: 'Side By Side Equal Bar Width', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool }, sideBySideBarDistanceFixed = { propertyName: 'barDistanceFixed', modelName: '@SideBySideBarDistanceFixed', defaultVal: 1 }, sideBySideBarDistance = { propertyName: 'barDistance', modelName: '@SideBySideBarDistance', defaultVal: 0.0 };
exports.commonSeriesPointsSortingKeys = [{ value: 'Argument', displayValue: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesSelectionMode.Argument' }, { value: 'Value_1', displayValue: 'Value', localizationId: 'ChartStringId.WizValueLevelValue' }], exports.bubbleSeriesPointsSortingKeys = [{ value: 'Argument', displayValue: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesSelectionMode.Argument' }, { value: 'Value_1', displayValue: 'Value', localizationId: 'ChartStringId.WizValueLevelValue' }, { value: 'Value_2', displayValue: 'Weight', localizationId: 'ChartStringId.WizValueLevelWeight' }], exports.rangeSeriesPointsSortingKeys = [{ value: 'Argument', displayValue: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesSelectionMode.Argument' }, { value: 'Value_1', displayValue: 'Value_1', localizationId: 'ChartStringId.WizValueLevelValue_1' }, { value: 'Value_2', displayValue: 'Value_2', localizationId: 'ChartStringId.WizValueLevelValue_2' }], exports.stockSeriesPointsSortingKeys = [{ value: 'Argument', displayValue: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesSelectionMode.Argument' }, { value: 'Value_1', displayValue: 'Low', localizationId: 'ChartStringId.WizValueLevelLow' }, { value: 'Value_2', displayValue: 'High', localizationId: 'ChartStringId.WizValueLevelHigh' }, { value: 'Value_3', displayValue: 'Open', localizationId: 'ChartStringId.WizValueLevelOpen' }, { value: 'Value_4', displayValue: 'Close', localizationId: 'ChartStringId.WizValueLevelClose' }];
exports.seriesPointsSorting = {
    propertyName: 'seriesPointsSorting', modelName: '@SeriesPointsSorting', displayName: 'Series Points Sorting', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'Ascending', displayValue: 'Ascending', localizationId: 'DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending' }, { value: 'Descending', displayValue: 'Descending', localizationId: 'DevExpress.XtraReports.UI.XRColumnSortOrder.Descending' }],
    localizationId: 'DevExpress.XtraCharts.SeriesBase.SeriesPointsSorting'
}, exports.seriesPointsSortingKey = {
    propertyName: 'seriesPointsSortingKey', modelName: '@SeriesPointsSortingKey', displayName: 'Series Points Sorting Key', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: exports.commonSeriesPointsSortingKeys, localizationId: 'DevExpress.XtraCharts.SeriesBase.SeriesPointsSortingKey'
}, exports.legendTextPattern = { propertyName: 'legendTextPattern', modelName: '@LegendTextPattern', displayName: 'Legend Text Pattern', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraCharts.SeriesBase.LegendTextPattern' }, exports._argumentScaleTypeValidatorOptions = {
    _seriesViewModel: null,
    onInitialized: function (e) { exports._argumentScaleTypeValidatorOptions._seriesViewModel = e.model._model; },
    validationRules: [{
            type: 'custom',
            reevaluate: true,
            validationCallback: function (params) {
                var model = exports._argumentScaleTypeValidatorOptions._seriesViewModel.peek();
                if (model instanceof _series_1.SeriesViewModel) {
                    var unconvertiblePoint = _utils_1._getUnconvertiblePoint('argumentSerializable', model.argumentScaleType.peek(), params.value, model.points.peek());
                    var stringFormat = analytics_utils_1.getLocalization("The type of the '{0}' point isn't compatible with the {1} scale.", 'ChartStringId.MsgIncompatiblePointType');
                    var argumentValue = unconvertiblePoint && unconvertiblePoint.argumentSerializable();
                    if (argumentValue && (argumentValue instanceof Date))
                        argumentValue = analytics_internal_1.formatDate(argumentValue);
                    params.rule.message = analytics_internal_1.formatUnicorn(stringFormat, (argumentValue !== null || argumentValue !== void 0) ? argumentValue : '', params.value);
                    return !unconvertiblePoint;
                }
                return true;
            }
        }]
}, exports.argumentScaleType = {
    propertyName: 'argumentScaleType', modelName: '@ArgumentScaleType', displayName: 'Argument Scale Type', defaultVal: 'Auto', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: _common_1.scaleTypeValues, localizationId: 'DevExpress.XtraCharts.SeriesBase.ArgumentScaleType', validatorOptions: exports._argumentScaleTypeValidatorOptions
}, exports.valueScaleType = {
    propertyName: 'valueScaleType', modelName: '@ValueScaleType', displayName: 'Value Scale Type', defaultVal: 'Numerical', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Numerical', displayValue: 'Numerical', localizationId: 'DevExpress.XtraCharts.ScaleType.Numerical' },
        { value: 'DateTime', displayValue: 'DateTime', localizationId: 'DevExpress.XtraTreeList.Data.UnboundColumnType.DateTime' }
    ],
    localizationId: 'DevExpress.XtraCharts.SeriesBase.ValueScaleType'
}, exports.labelsVisibility = { propertyName: 'labelsVisibility', modelName: '@LabelsVisibility', displayName: 'Labels Visibility', defaultVal: 'Default', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: _common_1.defaultBooleanValues, localizationId: 'DevExpress.XtraCharts.SeriesBase.LabelsVisibility' }, exports.argumentDataMember = { propertyName: 'argumentDataMember', modelName: '@ArgumentDataMember', displayName: 'Argument Data Member', defaultVal: '', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.SeriesBase.ArgumentDataMember' }, exports.valueDataMembersSerializable = { propertyName: 'valueDataMembers', modelName: '@ValueDataMembersSerializable', displayName: 'Value Data Members', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), from: _commonValue_1.CommonValueDataMembers.from, toJsonObject: _commonValue_1.CommonValueDataMembers.toJson, localizationId: 'DevExpress.XtraCharts.SeriesBase.ValueDataMembers' };
var enabled = { propertyName: 'enabled', modelName: '@Enabled', displayName: 'Enabled', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, localizationId: 'DevExpress.XtraReports.UI.EditOptions.Enabled' }, mode = {
    propertyName: 'mode', modelName: '@Mode', displayName: 'Mode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Count', valuesArray: [{ value: 'Count', displayValue: 'Count', localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, { value: 'ThresholdValue', displayValue: 'Threshold Value', localizationId: 'DevExpress.XtraCharts.TopNMode.ThresholdValue' }, { value: 'ThresholdPercent', displayValue: 'Threshold Percent', localizationId: 'DevExpress.XtraCharts.TopNOptions.ThresholdPercent' }],
    localizationId: 'DevExpress.XtraReports.UI.MultiColumn.Mode'
}, count = { propertyName: 'count', modelName: '@Count', displayName: 'Count', defaultVal: 5, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count' }, showOthers = { propertyName: 'showOthers', modelName: '@ShowOthers', displayName: 'Show Others', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, localizationId: 'DevExpress.XtraCharts.TopNOptions.ShowOthers' }, othersArgument = { propertyName: 'othersArgument', modelName: '@OthersArgument', displayName: 'Others Argument', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraCharts.TopNOptions.OthersArgument' }, thresholdValue = { propertyName: 'thresholdValue', modelName: '@ThresholdValue', displayName: 'Threshold Value', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.TopNMode.ThresholdValue' }, thresholdPercent = { propertyName: 'thresholdPercent', modelName: '@ThresholdPercent', displayName: 'Threshold Percent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.TopNOptions.ThresholdPercent' };
var textOrientation = {
    propertyName: 'textOrientation', modelName: '@TextOrientation', displayName: 'Text Orientation', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Horizontal ', displayValue: 'Horizontal', localizationId: 'DevExpress.XtraCharts.TextOrientation.Horizontal' }, { value: 'TopToBottom', displayValue: 'Top To Bottom', localizationId: 'DevExpress.XtraCharts.TextOrientation.TopToBottom' }, { value: 'BottomToTop', displayValue: 'Bottom To Top', localizationId: 'DevExpress.XtraCharts.TextOrientation.BottomToTop' }],
    localizationId: 'DevExpress.XtraCharts.SeriesLabelBase.TextOrientation'
}, resolveOverlappingMode = {
    propertyName: 'resolveOverlappingMode', modelName: '@ResolveOverlappingMode', displayName: 'Resolve Overlapping Mode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.MultiColumnMode.None' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }, { value: 'HideOverlapped', displayValue: 'Hide Overlapped', localizationId: 'DevExpress.XtraCharts.AxisLabelResolveOverlappingMode.HideOverlapped' }, { value: 'JustifyAroundPoint', displayValue: 'Justify Around Point', localizationId: 'DevExpress.XtraCharts.ResolveOverlappingMode.JustifyAroundPoint' }, { value: 'JustifyAllAroundPoint', displayValue: 'Justify All Around Point', localizationId: 'DevExpress.XtraCharts.ResolveOverlappingMode.JustifyAllAroundPoint' }],
    localizationId: 'DevExpress.XtraCharts.StackedBarTotalLabel.ResolveOverlappingMode'
}, lineColor = { propertyName: 'lineColor', modelName: '@LineColor', displayName: 'Line Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraCharts.SeriesLabelBase.LineColor' }, lineVisibility = { propertyName: 'lineVisibility', modelName: '@LineVisibility', displayName: 'Line Visibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: _common_1.defaultBooleanValues, localizationId: 'DevExpress.XtraCharts.SeriesLabelBase.LineVisibility' }, lineLength = { propertyName: 'lineLength', modelName: '@LineLength', displayName: 'Line Length', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.SeriesLabelBase.LineLength' }, showForZeroValues = { propertyName: 'showForZeroValues', modelName: '@ShowForZeroValues', displayName: 'Show for Zero Values', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, localizationId: 'DevExpress.XtraCharts.BarSeriesLabel.ShowForZeroValues' };
exports.barPositionValues = [
    { value: 'Top', displayValue: 'Top', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Top' },
    { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.XtraCharts.FunnelSeriesLabelPosition.Center' },
    { value: 'TopInside', displayValue: 'Top Inside', localizationId: 'DevExpress.XtraCharts.BarSeriesLabelPosition.TopInside' },
    { value: 'BottomInside', displayValue: 'Bottom Inside', localizationId: 'DevExpress.XtraCharts.BarSeriesLabelPosition.BottomInside' }
];
exports.piePositionValues = [
    { value: 'Inside', displayValue: 'Inside', localizationId: 'ChartStringId.WizPieSeriesLabelPositionInside' },
    { value: 'Outside', displayValue: 'Outside', localizationId: 'ChartStringId.WizPieSeriesLabelPositionOutside' },
    { value: 'Radial', displayValue: 'Radial', localizationId: 'ChartStringId.WizPieSeriesLabelPositionRadial' },
    { value: 'Tangent', displayValue: 'Tangent', localizationId: 'ChartStringId.WizPieSeriesLabelPositionTangent' },
    { value: 'TwoColumns', displayValue: 'Two Columns', localizationId: 'ChartStringId.WizPieSeriesLabelPositionTwoColumns' }
];
exports.funnelPositionValues = [
    { value: 'LeftColumn', displayValue: 'Left Column', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionLeftColumn' },
    { value: 'Left', displayValue: 'Left', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionLeft' },
    { value: 'Center', displayValue: 'Center', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionCenter' },
    { value: 'Right', displayValue: 'Right', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionRight' },
    { value: 'RightColumn', displayValue: 'Right Column', localizationId: 'ChartStringId.WizFunnelSeriesLabelPositionRightColumn' }
];
exports.waterfallPositionValues = [
    { value: 'Auto', displayValue: 'Auto', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesLabelPosition.Auto' },
    { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesLabelPosition.Center' },
    { value: 'InsideEnd', displayValue: 'Insid End', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesLabelPosition.InsideEnd' },
    { value: 'InsideStart', displayValue: 'Inside Start', localizationId: 'DevExpress.XtraCharts.WaterfallSeriesLabelPosition.InsideStart' },
];
var position = {
    propertyName: 'seriesLabelPosition', modelName: '@Position', displayName: 'Position', editor: _editorTemplates_1.editorTemplates.getEditor('comboboxPositionSeriesLabel'), valuesArray: [],
    localizationId: 'DevExpress.XtraCharts.PointSeriesLabel.Position'
};
var dashStyle = {
    propertyName: 'dashStyle', modelName: '@DashStyle', displayName: 'Dash Style', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Empty', displayValue: 'Empty', localizationId: 'DevExpress.XtraPivotGrid.PivotGridAppearances.Empty' }, { value: 'Solid', displayValue: 'Solid', localizationId: 'DevExpress.XtraCharts.FillMode3D.Solid' }, { value: 'Dash', displayValue: 'Dash', localizationId: 'DevExpress.XtraCharts.DashStyle.Dash' }, { value: 'Dot', displayValue: 'Dot', localizationId: 'DevExpress.XtraCharts.DashStyle.Dot' }, { value: 'DashDot', displayValue: 'Dash-Dot', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.DashDot' }, { value: 'DashDotDot', displayValue: 'Dash-Dot-Dot', localizationId: 'DevExpress.XtraPrinting.BorderDashStyle.DashDotDot' }],
    localizationId: 'DevExpress.XtraCharts.LineStyle.DashStyle'
};
var markerVisibility = { propertyName: 'markerVisibility', modelName: '@MarkerVisibility', displayName: 'Marker Visibility', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: _common_1.defaultBooleanValues, localizationId: 'DevExpress.XtraCharts.RadarLineSeriesView.MarkerVisibility' }, markerKind = {
    propertyName: 'kind', modelName: '@Kind', displayName: 'Kind', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Square', displayValue: 'Square', localizationId: 'DevExpress.XtraCharts.MarkerKind.Square' }, { value: 'Diamond', displayValue: 'Diamond', localizationId: 'DevExpress.XtraCharts.MarkerKind.Diamond' }, { value: 'Triangle', displayValue: 'Triangle', localizationId: 'DevExpress.XtraCharts.MarkerKind.Triangle' }, { value: 'InvertedTriangle', displayValue: 'Inverted Triangle', localizationId: 'DevExpress.XtraCharts.MarkerKind.InvertedTriangle' }, { value: 'Circle', displayValue: 'Circle', localizationId: 'DevExpress.XtraCharts.CircleEasingFunction' }, { value: 'Plus', displayValue: 'Plus', localizationId: 'DevExpress.XtraCharts.MarkerKind.Plus' }, { value: 'Cross', displayValue: 'Cross', localizationId: 'DevExpress.XtraCharts.MarkerKind.Cross' }, { value: 'Star', displayValue: 'Star', localizationId: 'DevExpress.XtraCharts.MarkerKind.Star' }, { value: 'Pentagon', displayValue: 'Pentagon', localizationId: 'DevExpress.XtraCharts.MarkerKind.Pentagon' }, { value: 'Hexagon', displayValue: 'Hexagon', localizationId: 'DevExpress.XtraCharts.MarkerKind.Hexagon' }],
    localizationId: 'DevExpress.XtraCharts.MarkerBase.Kind'
}, borderVisible = { propertyName: 'borderVisible', modelName: '@BorderVisible', displayName: 'Border Visible', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, localizationId: 'DevExpress.XtraCharts.MarkerBase.BorderVisible' };
var direction = {
    propertyName: 'direction', modelName: '@Direction', displayName: 'Direction', defaultVal: 'TopToBottom', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'TopToBottom', displayValue: 'Top To Bottom', localizationId: 'DevExpress.XtraCharts.TextOrientation.TopToBottom' }, { value: 'BottomToTop', displayValue: 'Bottom To Top', localizationId: 'DevExpress.XtraCharts.TextOrientation.BottomToTop' }, { value: 'LeftToRight', displayValue: 'Left To Right' }, { value: 'RightToLeft', displayValue: 'Right To Left' }],
    localizationId: 'DevExpress.XtraReports.UI.MultiColumn.Direction'
}, alignmentVertical = {
    propertyName: 'alignmentVertical', modelName: '@AlignmentVertical', displayName: 'Vertical Alignment', defaultVal: 'Top', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Top', displayValue: 'Top', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Top' }, { value: 'TopOutside', displayValue: 'Top Outside', localizationId: 'DevExpress.XtraCharts.LegendAlignmentVertical.TopOutside' }, { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.XtraCharts.FunnelSeriesLabelPosition.Center' }, { value: 'Bottom', displayValue: 'Bottom', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Bottom' }, { value: 'BottomOutside', displayValue: 'Bottom Outside', localizationId: 'DevExpress.XtraCharts.LegendAlignmentVertical.BottomOutside' }],
    localizationId: 'DevExpress.XtraCharts.Legend.AlignmentVertical'
}, alignmentHorizontal = {
    propertyName: 'alignmentHorizontal', modelName: '@AlignmentHorizontal', displayName: 'Horizontal Alignment', defaultVal: 'RightOutside', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Left', displayValue: 'Left', localizationId: 'DevExpress.XtraReports.UI.XRControl.Left' }, { value: 'LeftOutside', displayValue: 'Left Outside', localizationId: 'DevExpress.XtraCharts.LegendAlignmentHorizontal.LeftOutside' }, { value: 'Center', displayValue: 'Center', localizationId: 'DevExpress.XtraCharts.FunnelSeriesLabelPosition.Center' }, { value: 'Right', displayValue: 'Right', localizationId: 'DevExpress.XtraCharts.RectangleIndents.Right' }, { value: 'RightOutside', displayValue: 'Right Outside', localizationId: 'DevExpress.XtraCharts.LegendAlignmentHorizontal.RightOutside' }],
    localizationId: 'DevExpress.XtraCharts.Legend.AlignmentHorizontal'
};
var dock = {
    propertyName: 'dock', modelName: '@Dock', displayName: 'Dock', defaultVal: 'Top', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Top', displayValue: 'Top', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Top' }, { value: 'Bottom', displayValue: 'Bottom', localizationId: 'DevExpress.XtraReports.UI.XRDockStyle.Bottom' }, { value: 'Left', displayValue: 'Left', localizationId: 'DevExpress.XtraReports.UI.XRControl.Left' }, { value: 'Right', displayValue: 'Right', localizationId: 'DevExpress.XtraCharts.RectangleIndents.Right' }],
    localizationId: 'DevExpress.XtraCharts.DockableTitle.Dock'
};
var chartTitleText = { propertyName: 'text', modelName: '@Text', localizable: true, displayName: 'Text', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizationId: 'ASPxReportsStringId.ExportName_txt' };
exports.padding = { propertyName: 'chartPadding', modelName: 'Padding', displayName: 'Padding', info: [_common_1.left, _common_1.right, _common_1.top, _common_1.bottom], editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraReports.UI.XRBarCode.PaddingInfo' };
var lineMarkerOptionsSerializationsInfo = [_common_1.color, _series_2.colorEach, markerVisibility], lineMarker = { propertyName: 'lineMarker', modelName: 'LineMarker', displayName: 'Line Marker', info: lineMarkerOptionsSerializationsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
var topNOptionsSerializationsInfo = [enabled, mode, count, thresholdPercent, thresholdValue, showOthers, othersArgument], topNOptions = { propertyName: 'topNOptions', modelName: 'TopNOptions', displayName: 'Top N Options', info: topNOptionsSerializationsInfo, defaultVal: {}, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraCharts.SeriesBase.TopNOptions' };
var lineStyleSerializationsInfo = [_common_1.thickness, dashStyle], lineStyle = { propertyName: 'lineStyle', modelName: 'LineStyle', displayName: 'Line Style', info: lineStyleSerializationsInfo, defaultVal: {}, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraReports.UI.XRShape.LineStyle' };
exports.seriesLabelSerializationsInfo = [_common_1.typeNameNotShow, _common_1.textPattern, _common_1.textAlignment, _common_1.maxLineCount, _common_1.maxWidth, textOrientation, resolveOverlappingMode,
    lineColor, lineVisibility, lineLength, _common_1.antialiasing, _common_1.backColor, _common_1.textColor, position, showForZeroValues, _common_1.font8, lineStyle, _series_2.border];
exports.seriesLabel = { propertyName: 'label', modelName: 'Label', displayName: 'Label', info: exports.seriesLabelSerializationsInfo, defaultVal: {}, from: _label_1.SeriesLabelViewModel.from, toJsonObject: _label_1.SeriesLabelViewModel.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraReports.UI.XRLabel' };
var autoBindingSettingsEnabled = { propertyName: 'autoBindingSettingsEnabled', modelName: '@AutoBindingSettingsEnabled', displayName: 'Auto Binding Settings Enabled', localizationId: 'DevExpress.XtraCharts.PivotGridDataSourceOptions.AutoBindingSettingsEnabled', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool') }, autoLayoutSettingsEnabled = { propertyName: 'autoLayoutSettingsEnabled', modelName: '@AutoLayoutSettingsEnabled', displayName: 'Auto Layout Settings Enabled', localizationId: 'DevExpress.XtraCharts.PivotGridDataSourceOptions.AutoLayoutSettingsEnabled', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.pivotGridDataSourceOptions = { propertyName: 'pivotGridDataSourceOptions', modelName: 'PivotGridDataSourceOptions', displayName: 'Pivot Grid Data Source Options', localizationId: 'DevExpress.XtraReports.UI.XRChart.PivotGridDataSourceOptions', info: [autoBindingSettingsEnabled, autoLayoutSettingsEnabled], editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
var dataFilters = {
    modelName: 'DataFilters', displayName: 'Data Filters', propertyName: 'dataFilters',
    editor: analytics_widgets_1.editorTemplates.getEditor('commonCollection'), array: true, addHandler: _dataFilter_1.DataFilterModel.createNew, template: '#dxrd-collectionItemWithAccordion',
    localizationId: 'DevExpress.XtraCharts.SeriesBase.DataFilters'
};
var dataFiltersConjunctionMode = {
    modelName: '@DataFiltersConjunctionMode', defaultVal: 'And', displayName: 'Conjunction Mode', propertyName: 'dataFiltersConjunctionMode', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [{ value: 'And', displayValue: 'And', localizationId: 'DevExpress.XtraCharts.ConjunctionTypes.And' }, { value: 'Or', displayValue: 'Or', localizationId: 'DevExpress.XtraCharts.ConjunctionTypes.Or' }],
    localizationId: 'DevExpress.XtraCharts.DataFilterCollection.ConjunctionMode'
};
var colorDataMember = { propertyName: 'colorDataMember', displayName: 'Color Data Member', defaultVal: '', modelName: '@ColorDataMember', editor: ko.bindingHandlers['displayNameExtender'] ? analytics_widgets_1.editorTemplates.getEditor('field') : _editorTemplates_1.editorTemplates.getEditor('fieldChart'), localizationId: 'DevExpress.XtraCharts.SeriesBase.ColorDataMember' };
exports.valuesSerializable = { propertyName: 'valuesSerializable', modelName: '@ValuesSerializable', from: function (val) { return ko.observable(val); }, toJsonObject: _point_1.SeriesPointModel.valueToJsonObject }, exports.argumentSerializable = { propertyName: 'argumentSerializable', modelName: '@ArgumentSerializable', displayName: 'Argument', localizationId: 'DevExpress.XtraCharts.SeriesPoint.Argument', editor: analytics_widgets_1.editorTemplates.getEditor('text') }, exports.colorSerializable = { propertyName: 'colorSerializable', modelName: '@ColorSerializable', displayName: 'Color', localizationId: 'DevExpress.XtraCharts.SeriesPoint.Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') };
exports.seriesPointSerializationsInfo = [exports.argumentSerializable, exports.valuesSerializable, exports.colorSerializable];
exports.points = {
    propertyName: 'points', modelName: 'Points', displayName: 'Points', localizationId: 'DevExpress.XtraCharts.Series.Points',
    editor: _editorTemplates_1.editorTemplates.getEditor('points'), array: true
};
exports.createViewsArray = function (limitation) {
    var array = [];
    array.push({ value: 'SideBySideBarSeriesView', displayValue: 'Bar', localizationId: 'DevExpress.Sparkline.SparklineViewType.Bar' });
    array.push({ value: 'StackedBarSeriesView', displayValue: 'Bar Stacked', localizationId: 'ChartStringId.SvnStackedBar' });
    array.push({ value: 'FullStackedBarSeriesView', displayValue: 'Bar Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedBar' });
    array.push({ value: 'SideBySideStackedBarSeriesView', displayValue: 'Side By Side Bar Stacked', localizationId: 'ChartStringId.SvnSideBySideStackedBar' });
    array.push({ value: 'SideBySideFullStackedBarSeriesView', displayValue: 'Side By Side Bar Stacked 100%', localizationId: 'ChartStringId.SvnSideBySideFullStackedBar' });
    array.push({ value: 'WaterfallSeriesView', displayValue: 'Waterfall', localizationId: 'ChartStringId.SvnWaterfall' });
    if (!limitation) {
        array.push({ value: 'SideBySideBar3DSeriesView', displayValue: 'Bar 3D', localizationId: 'ChartStringId.SvnSideBySideBar3D' });
        array.push({ value: 'StackedBar3DSeriesView', displayValue: 'Bar 3D Stacked', localizationId: 'ChartStringId.SvnStackedBar3D' });
        array.push({ value: 'FullStackedBar3DSeriesView', displayValue: 'Bar 3D Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedBar3D' });
        array.push({ value: 'SideBySideStackedBar3DSeriesView', displayValue: 'Side By Side Bar 3D Stacked ' });
        array.push({ value: 'SideBySideFullStackedBar3DSeriesView', displayValue: 'Side By Side Bar 3D Stacked 100%', localizationId: 'ChartStringId.SvnSideBySideFullStackedBar3D' });
        array.push({ value: 'ManhattanBarSeriesView', displayValue: 'Manhattan Bar', localizationId: 'ChartStringId.SvnManhattanBar' });
    }
    array.push({ value: 'PointSeriesView', displayValue: 'Point', localizationId: 'ASPxReportsStringId.ReportDesigner_FontOptions_Unit_Point' });
    array.push({ value: 'BubbleSeriesView', displayValue: 'Bubble', localizationId: 'ChartStringId.SvnBubble' });
    array.push({ value: 'LineSeriesView', displayValue: 'Line', localizationId: 'DevExpress.XtraReports.UI.XRLine' });
    array.push({ value: 'StackedLineSeriesView', displayValue: 'Line Stacked', localizationId: 'ChartStringId.SvnStackedLine' });
    array.push({ value: 'FullStackedLineSeriesView', displayValue: 'Line Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedLine' });
    array.push({ value: 'StepLineSeriesView', displayValue: 'Step Line', localizationId: 'ChartStringId.SvnStepLine' });
    array.push({ value: 'SplineSeriesView', displayValue: 'Spline', localizationId: 'ChartStringId.SvnSpline' });
    array.push({ value: 'ScatterLineSeriesView', displayValue: 'Scatter Line', localizationId: 'ChartStringId.CmdCreateScatterLineChartMenuCaption' });
    array.push({ value: 'SwiftPlotSeriesView', displayValue: 'Swift Plot', localizationId: 'ChartStringId.SvnSwiftPlot' });
    if (!limitation) {
        array.push({ value: 'Line3DSeriesView', displayValue: 'Line 3D', localizationId: 'ChartStringId.SvnLine3D' });
        array.push({ value: 'StackedLine3DSeriesView', displayValue: 'Line 3D Stacked', localizationId: 'ChartStringId.SvnStackedLine3D' });
        array.push({ value: 'FullStackedLine3DSeriesView', displayValue: 'Line 3D Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedLine3D' });
        array.push({ value: 'StepLine3DSeriesView', displayValue: 'Step Line 3D', localizationId: 'ChartStringId.SvnStepLine3D' });
        array.push({ value: 'Spline3DSeriesView', displayValue: 'Spline 3D', localizationId: 'ChartStringId.SvnSpline3D' });
    }
    array.push({ value: 'PieSeriesView', displayValue: 'Pie', localizationId: 'ChartStringId.CmdCreatePieChartMenuCaption' });
    array.push({ value: 'DoughnutSeriesView', displayValue: 'Doughnut', localizationId: 'ChartStringId.CmdCreateDoughnutChartMenuCaption' });
    array.push({ value: 'NestedDoughnutSeriesView', displayValue: 'Nested Doughnut', localizationId: 'ChartStringId.CmdCreateNestedDoughnutChartMenuCaption' });
    if (!limitation) {
        array.push({ value: 'Pie3DSeriesView', displayValue: 'Pie 3D', localizationId: 'ChartStringId.SvnPie3D' });
        array.push({ value: 'Doughnut3DSeriesView', displayValue: 'Doughnut 3D', localizationId: 'ChartStringId.SvnDoughnut3D' });
    }
    array.push({ value: 'FunnelSeriesView', displayValue: 'Funnel', localizationId: 'ChartStringId.SvnFunnel' });
    if (!limitation) {
        array.push({ value: 'Funnel3DSeriesView', displayValue: 'Funnel 3D', localizationId: 'ChartStringId.SvnFunnel3D' });
    }
    array.push({ value: 'AreaSeriesView', displayValue: 'Area', localizationId: 'DevExpress.XtraPivotGrid.PivotGridOptionsDataField.Area' });
    array.push({ value: 'StackedAreaSeriesView', displayValue: 'Area Stacked', localizationId: 'ChartStringId.SvnStackedArea' });
    array.push({ value: 'FullStackedAreaSeriesView', displayValue: 'Area Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedArea' });
    array.push({ value: 'StepAreaSeriesView', displayValue: 'Step Area', localizationId: 'ChartStringId.SvnStepArea' });
    array.push({ value: 'SplineAreaSeriesView', displayValue: 'Spline Area', localizationId: 'ChartStringId.SvnSplineArea' });
    array.push({ value: 'StackedSplineAreaSeriesView', displayValue: 'Spline Area Stacked', localizationId: 'ChartStringId.SvnSplineStackedArea' });
    array.push({ value: 'FullStackedSplineAreaSeriesView', displayValue: 'Spline Area Stacked 100%', localizationId: 'ChartStringId.SvnSplineFullStackedArea' });
    if (!limitation) {
        array.push({ value: 'Area3DSeriesView', displayValue: 'Area 3D', localizationId: 'ChartStringId.SvnArea3D' });
        array.push({ value: 'StackedArea3DSeriesView', displayValue: 'Area 3D Stacked', localizationId: 'ChartStringId.SvnStackedArea3D' });
        array.push({ value: 'FullStackedArea3DSeriesView', displayValue: 'Area 3D Stacked 100%', localizationId: 'ChartStringId.SvnFullStackedArea3D' });
        array.push({ value: 'StepArea3DSeriesView', displayValue: 'Step 3D Area' });
        array.push({ value: 'SplineArea3DSeriesView', displayValue: 'Spline 3D Area' });
        array.push({ value: 'StackedSplineArea3DSeriesView', displayValue: 'Spline Area 3D Stacked', localizationId: 'ChartStringId.SvnSplineAreaStacked3D' });
        array.push({ value: 'FullStackedSplineArea3DSeriesView', displayValue: 'Spline Area 3D Stacked 100%', localizationId: 'ChartStringId.SvnSplineAreaFullStacked3D' });
    }
    array.push({ value: 'OverlappedRangeBarSeriesView', displayValue: 'Range Bar', localizationId: 'ChartStringId.SvnOverlappedRangeBar' });
    array.push({ value: 'SideBySideRangeBarSeriesView', displayValue: 'Side By Side Range Bar', localizationId: 'ChartStringId.SvnSideBySideRangeBar' });
    array.push({ value: 'RangeAreaSeriesView', displayValue: 'Range Area', localizationId: 'ChartStringId.SvnRangeArea' });
    if (!limitation) {
        array.push({ value: 'RangeArea3DSeriesView', displayValue: 'Range Area 3D', localizationId: 'ChartStringId.SvnRangeArea3D' });
    }
    array.push({ value: 'RadarPointSeriesView', displayValue: 'Radar Point', localizationId: 'ChartStringId.SvnRadarPoint' });
    array.push({ value: 'RadarLineSeriesView', displayValue: 'Radar Line', localizationId: 'ChartStringId.SvnRadarLine' });
    array.push({ value: 'RadarAreaSeriesView', displayValue: 'Radar Area', localizationId: 'ChartStringId.CmdCreateRadarAreaChartMenuCaption' });
    array.push({ value: 'PolarPointSeriesView', displayValue: 'Polar Point', localizationId: 'ChartStringId.SvnPolarPoint' });
    array.push({ value: 'PolarLineSeriesView', displayValue: 'Polar Line', localizationId: 'ChartStringId.CmdCreatePolarLineChartMenuCaption' });
    array.push({ value: 'PolarAreaSeriesView', displayValue: 'Polar Area', localizationId: 'ChartStringId.SvnPolarArea' });
    array.push({ value: 'StockSeriesView', displayValue: 'Stock Series' });
    array.push({ value: 'CandleStickSeriesView', displayValue: 'Candle Stick', localizationId: 'ChartStringId.CmdCreateCandleStickChartMenuCaption' });
    array.push({ value: 'OverlappedGanttSeriesView', displayValue: 'Gantt', localizationId: 'ChartStringId.CmdGanttGroupPlaceHolderMenuCaption' });
    array.push({ value: 'SideBySideGanttSeriesView', displayValue: 'Side By Side Gantt', localizationId: 'ChartStringId.SvnSideBySideGantt' });
    return array;
};
exports.view = {
    propertyName: 'view', modelName: 'View', displayName: 'View', defaultVal: {},
    from: _view_1.SeriesViewViewModel.from, toJsonObject: _view_1.SeriesViewViewModel.toJson,
    localizationId: 'DevExpress.XtraReports.UI.XRSparkline.View'
};
exports.viewBindableSerializationInfo = {
    propertyName: 'viewBindable', displayName: 'View', editor: _editorTemplates_1.editorTemplates.getEditor('views'), valuesArray: exports.createViewsArray(_settings_1.limitation()),
    localizationId: 'DevExpress.XtraReports.UI.XRSparkline.View'
};
exports.qualitativeSummaryOptions = { propertyName: 'qualitativeSummaryOptions', modelName: 'QualitativeSummaryOptions', displayName: 'Qualitative Summary Options', localizationId: 'DevExpress.XtraCharts.SeriesBase.QualitativeSummaryOptions', info: _summaryOptionsMetaData_1.summaryOptionsSerializationInfoArray, from: _summaryOptions_1.QualitativeSummaryOptionsModel.from, toJsonObject: _summaryOptions_1.QualitativeSummaryOptionsModel.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.numericSummaryOptions = { propertyName: 'numericSummaryOptions', modelName: 'NumericSummaryOptions', displayName: 'Numeric Summary Options', localizationId: 'DevExpress.XtraCharts.SeriesBase.NumericSummaryOptions', info: _summaryOptionsMetaData_1.numericSummaryOptionsSerializationInfoArray, from: _summaryOptions_1.NumericSummaryOptionsModel.from, toJsonObject: _summaryOptions_1.NumericSummaryOptionsModel.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.dateTimeSumaryOptions = { propertyName: 'dateTimeSummaryOptions', modelName: 'DateTimeSummaryOptions', displayName: 'Date-Time Summary Options', localizationId: 'DevExpress.XtraCharts.SeriesBase.DateTimeSummaryOptions', info: _summaryOptionsMetaData_1.dateTimeSummaryOptionsSerializationInfoArray, from: _summaryOptions_1.DateTimeSummaryOptionsModel.from, toJsonObject: _summaryOptions_1.DateTimeSummaryOptionsModel.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.seriesTemplateSerializationsInfo = [
    exports.viewBindableSerializationInfo, { propertyName: 'titles', displayName: 'Titles', localizationId: 'DevExpress.XtraReports.UI.XRChart.Titles' }, { propertyName: 'indicators', displayName: 'Indicators', localizationId: 'DevExpress.XtraReports.UI.XRChart.Indicators' }, exports.view, exports.argumentDataMember, exports.valueDataMembersSerializable, colorDataMember, exports.argumentScaleType, exports.valueScaleType, _common_1.filterString, _common_1.filterStringEditable, exports.seriesPointsSorting, exports.seriesPointsSortingKey, _common_1.showInLegend, _axis_1.legendName, exports.legendTextPattern, exports.labelsVisibility, exports.qualitativeSummaryOptions, exports.numericSummaryOptions, exports.dateTimeSumaryOptions, exports.seriesLabel, topNOptions, _common_1.visible
];
exports.seriesTemplate = { propertyName: 'seriesTemplate', modelName: 'SeriesTemplate', displayName: 'Series Template', localizationId: 'DevExpress.XtraReports.UI.XRChart.SeriesTemplate', info: exports.seriesTemplateSerializationsInfo, from: _template_1.SeriesTemplateViewModel.from, toJsonObject: _template_1.SeriesTemplateViewModel.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.seriesSerializationsInfo = [_common_1.name, exports.points].concat(exports.seriesTemplateSerializationsInfo);
exports.seriesSerializable = { propertyName: 'series', modelName: 'SeriesSerializable', displayName: 'Series', array: true, editor: _editorTemplates_1.editorTemplates.getEditor('collection'), localizationId: 'DevExpress.XtraReports.UI.XRChart.Series' };
exports.seriesDataMember = { propertyName: 'seriesDataMember', modelName: '@SeriesDataMember', displayName: 'Series Data Member', editor: ko.bindingHandlers['displayNameExtender'] ? analytics_widgets_1.editorTemplates.getEditor('field') : _editorTemplates_1.editorTemplates.getEditor('fieldChart'), localizationId: 'DevExpress.XtraReports.UI.XRChart.SeriesDataMember' };
exports.dataContainerSerializationsInfo = [exports.seriesDataMember, exports.seriesSerializable, exports.seriesTemplate, _common_1.dataMember, exports.pivotGridDataSourceOptions];
exports.dataContainer = { propertyName: 'dataContainer', modelName: 'DataContainer', displayName: 'Data Container', info: exports.dataContainerSerializationsInfo, from: _dataContainer_1.DataContainerViewModel.from, toJsonObject: _dataContainer_1.DataContainerViewModel.toJson, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditorCustom') };
var textArea = { propertyName: 'text', modelName: '@Text', displayName: 'Text', localizationId: 'DevExpress.XtraReports.UI.XRControl.Text', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('stringArray') };
var emptyChartEnableAntialiasing = { propertyName: 'enableAntialiasing', modelName: '@EnableAntialiasing', displayName: 'Enable Antialiasing', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: _common_1.defaultBooleanValues, localizationId: 'DevExpress.XtraCharts.TitleBase.EnableAntialiasing' };
exports.emptyChartTextSerializationsInfo = [textArea, _common_1.font12, _common_1.textColor, emptyChartEnableAntialiasing, _common_1.tag];
exports.emptyChartText = { propertyName: 'emptyChartText', modelName: 'EmptyChartText', displayName: 'Empty Chart Text', info: exports.emptyChartTextSerializationsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.titleSerializationsInfo = [chartTitleText, _common_1.textColor, dock, _common_1.titleAlignment, _common_1.visibility, _common_1.font18];
exports.titles = { propertyName: 'titles', modelName: 'Titles', displayName: 'Titles', localizationId: 'DevExpress.XtraReports.UI.XRChart.Titles', array: true, editor: _editorTemplates_1.editorTemplates.getEditor('collection') };
var markerMode = {
    propertyName: 'markerMode', modelName: '@MarkerMode', displayName: 'Marker Mode', localizationId: 'DevExpress.XtraCharts.Legend.MarkerMode', defaultVal: 'Marker', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Marker', displayValue: analytics_utils_1.getLocalization('Marker', 'DevExpress.XtraCharts.LegendMarkerMode.Marker') }, { value: 'CheckBox', displayValue: analytics_utils_1.getLocalization('Check Box', 'DevExpress.XtraCharts.LegendMarkerMode.CheckBox') }, { value: 'CheckBoxAndMarker', displayValue: analytics_utils_1.getLocalization('Check Box and Marker', 'DevExpress.XtraCharts.LegendMarkerMode.CheckBoxAndMarker') }, { value: 'MarkerAndCheckBox', displayValue: analytics_utils_1.getLocalization('Marker and Check Box', 'DevExpress.XtraCharts.LegendMarkerMode.MarkerAndCheckBox') }, { value: 'None', displayValue: analytics_utils_1.getLocalization('None', 'DevExpress.XtraCharts.LegendMarkerMode.None') }]
}, markerOffset = { propertyName: 'markerOffset', modelName: '@MarkerOffset', displayName: 'Marker Offset', localizationId: 'DevExpress.XtraCharts.Legend.MarkerOffset', defaultVal: 2, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.legendSerializationsInfo = [_common_1.textColor, _common_1.backColor, direction, alignmentVertical, alignmentHorizontal, _common_1.visibility, markerMode, markerOffset, _series_2.border, _common_1.margin, exports.padding, _common_1.font8];
exports.legend = { propertyName: 'legend', modelName: 'Legend', displayName: 'Legend', localizationId: 'DevExpress.XtraCharts.Legend', info: exports.legendSerializationsInfo, from: _legend_1.LegendViewModel.from, toJsonObject: _legend_1.LegendViewModel.toJson, defaultVal: {}, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.additionalLegendSerializationsInfo = [_common_1.name].concat(exports.legendSerializationsInfo);
exports.legends = { propertyName: 'legends', modelName: 'Legends', displayName: 'Legends', localizationId: 'DevExpress.XtraReports.UI.XRChart.Legends', array: true, editor: _editorTemplates_1.editorTemplates.getEditor('collection') };
exports.appearanceName = {
    propertyName: 'appearanceName', modelName: '@AppearanceNameSerializable', displayName: 'Appearance Name', defaultVal: 'Default', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Nature Colors', displayValue: 'Nature Colors', localizationId: 'ChartStringId.AppNatureColors' }, { value: 'Pastel Kit', displayValue: 'Pastel Kit', localizationId: 'ChartStringId.AppPastelKit' }, { value: 'In A Fog', displayValue: 'In A Fog', localizationId: 'ChartStringId.AppInAFog' }, { value: 'Terracotta Pie', displayValue: 'Terracotta Pie', localizationId: 'ChartStringId.PltTerracottaPie' }, { value: 'Northern Lights', displayValue: 'Northern Lights', localizationId: 'ChartStringId.PltNorthernLights' }, { value: 'Chameleon', displayValue: 'Chameleon', localizationId: 'ChartStringId.AppChameleon' }, { value: 'The Trees', displayValue: 'The Trees', localizationId: 'ChartStringId.PltTheTrees' }, { value: 'Light', displayValue: 'Light', localizationId: 'ChartStringId.AppLight' }, { value: 'Gray', displayValue: 'Gray', localizationId: 'ChartStringId.AppGray' }, { value: 'Dark', displayValue: 'Dark', localizationId: 'ChartStringId.AppDark' }, { value: 'Dark Flat', displayValue: 'Dark Flat', localizationId: 'ChartStringId.AppDarkFlat' }, { value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }],
    localizationId: 'DevExpress.XtraReports.UI.XRChart.AppearanceName'
};
exports.paletteName = {
    propertyName: 'paletteName', modelName: '@PaletteName', displayName: 'Palette Name', defaultVal: 'Default', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [{ value: 'Default', displayValue: 'Default', localizationId: 'DevExpress.XtraReports.UI.WinControlPrintMode.Default' }, { value: 'Nature Colors', displayValue: 'Nature Colors', localizationId: 'ChartStringId.AppNatureColors' }, { value: 'Pastel Kit', displayValue: 'Pastel Kit', localizationId: 'ChartStringId.AppPastelKit' }, { value: 'In A Fog', displayValue: 'In A Fog', localizationId: 'ChartStringId.AppInAFog' }, { value: 'Terracotta Pie', displayValue: 'Terracotta Pie', localizationId: 'ChartStringId.PltTerracottaPie' }, { value: 'Northern Lights', displayValue: 'Northern Lights', localizationId: 'ChartStringId.PltNorthernLights' }, { value: 'Chameleon', displayValue: 'Chameleon', localizationId: 'ChartStringId.AppChameleon' }, { value: 'The Trees', displayValue: 'The Trees', localizationId: 'ChartStringId.PltTheTrees' }, { value: 'Mixed', displayValue: 'Mixed', localizationId: 'ChartStringId.PltMixed' }, { value: 'Office', displayValue: 'Office', localizationId: 'ChartStringId.PltOffice' }, { value: 'Black and White', displayValue: 'Black and White', localizationId: 'ChartStringId.PltBlackAndWhite' }, { value: 'Grayscale', displayValue: 'Grayscale', localizationId: 'ChartStringId.PltGrayscale' }, { value: 'Apex', displayValue: 'Apex', localizationId: 'ChartStringId.PltApex' }, { value: 'Aspect', displayValue: 'Aspect', localizationId: 'ChartStringId.PltAspect' }, { value: 'Civic', displayValue: 'Civic', localizationId: 'ChartStringId.PltCivic' }, { value: 'Concourse', displayValue: 'Concourse', localizationId: 'ChartStringId.PltConcourse' }, { value: 'Equity', displayValue: 'Equity', localizationId: 'ChartStringId.PltEquity' }, { value: 'Flow', displayValue: 'Flow', localizationId: 'ChartStringId.PltFlow' }, { value: 'Foundry', displayValue: 'Foundry', localizationId: 'ChartStringId.PltFoundry' }, { value: 'Median', displayValue: 'Median', localizationId: 'DevExpress.XtraReports.UI.SortingSummaryFunction.Median' }, { value: 'Metro', displayValue: 'Metro', localizationId: 'ChartStringId.PltMetro' }, { value: 'Module', displayValue: 'Module', localizationId: 'DevExpress.XtraReports.UI.XRBarCode.Module' }, { value: 'Opulent', displayValue: 'Opulent', localizationId: 'ChartStringId.PltOpulent' }, { value: 'Oriel', displayValue: 'Oriel', localizationId: 'ChartStringId.PltOriel' }, { value: 'Origin', displayValue: 'Origin', localizationId: 'ChartStringId.PltOrigin' }, { value: 'Paper', displayValue: 'Paper', localizationId: 'ChartStringId.PltPaper' }, { value: 'Solstice', displayValue: 'Solstice', localizationId: 'ChartStringId.PltSolstice' }, { value: 'Technic', displayValue: 'Technic', localizationId: 'ChartStringId.PltTechnic' }, { value: 'Trek', displayValue: 'Trek', localizationId: 'ChartStringId.PltTrek' }, { value: 'Urban', displayValue: 'Urban', localizationId: 'ChartStringId.PltUrban' }, { value: 'Verve', displayValue: 'Verve', localizationId: 'ChartStringId.PltVerve' }, { value: 'Office 2013', displayValue: 'Office 2013', localizationId: 'ChartStringId.PltOffice2013' }, { value: 'Blue Warm', displayValue: 'Blue Warm', localizationId: 'ChartStringId.PltBlueWarm' }, { value: 'Blue', displayValue: 'Blue', localizationId: 'ChartStringId.PltBlue' }, { value: 'Blue II', displayValue: 'Blue II', localizationId: 'ChartStringId.PltBlueII' }, { value: 'Blue Green', displayValue: 'Blue Green', localizationId: 'ChartStringId.PltBlueGreen' }, { value: 'Green', displayValue: 'Green', localizationId: 'ChartStringId.PltGreen' }, { value: 'Green Yellow', displayValue: 'Green Yellow', localizationId: 'ChartStringId.PltGreenYellow' }, { value: 'Yellow', displayValue: 'Yellow', localizationId: 'ChartStringId.PltYellow' }, { value: 'Yellow Orange', displayValue: 'Yellow Orange', localizationId: 'ChartStringId.PltYellowOrange' }, { value: 'Orange', displayValue: 'Orange', localizationId: 'ChartStringId.PltOrange' }, { value: 'Orange Red', displayValue: 'Orange Red', localizationId: 'ChartStringId.PltOrangeRed' }, { value: 'Red Orange', displayValue: 'Red Orange', localizationId: 'ChartStringId.PltRedOrange' }, { value: 'Red', displayValue: 'Red', localizationId: 'ChartStringId.PltRed' }, { value: 'Red Violet', displayValue: 'Red Violet', localizationId: 'ChartStringId.PltRedViolet' }, { value: 'Violet', displayValue: 'Violet', localizationId: 'ChartStringId.PltViolet' }, { value: 'Violet II', displayValue: 'Violet II', localizationId: 'ChartStringId.PltVioletII' }, { value: 'Marquee', displayValue: 'Marquee', localizationId: 'ChartStringId.PltMarquee' }, { value: 'Slipstream', displayValue: 'Slipstream', localizationId: 'ChartStringId.PltSlipstream' }],
    localizationId: 'DevExpress.XtraReports.UI.XRChart.PaletteName'
};
exports.backImage = {
    propertyName: 'backImage', modelName: 'BackImage', displayName: 'Background Image', localizationId: 'DevExpress.XtraCharts.BackgroundImage', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: [
        { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', localizationId: 'DevExpress.XtraCharts.ChartElement.Tag', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
        { propertyName: 'stretch', modelName: '@Stretch', displayName: 'Stretch', localizationId: 'DevExpress.XtraCharts.BackgroundImage.Stretch', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: 'false', from: analytics_utils_1.parseBool },
        { propertyName: 'image', modelName: '@Image', displayName: 'Image', localizationId: 'DevExpress.XtraCharts.ChartImage.Image', editor: analytics_widgets_1.editorTemplates.getEditor('image') }
    ]
};
exports.chartSerializationsInfo = [exports.appearanceName, exports.backImage, exports.paletteName, sideBySideBarDistanceFixed, sideBySideEqualBarWidth, sideBySideBarDistance, exports.dataContainer, _diagram_1.diagram, exports.titles, exports.legend, exports.legends, exports.emptyChartText];
exports.chart = { propertyName: 'chart', modelName: 'Chart', displayName: 'Chart', from: _chart_1.ChartViewModel.from, toJsonObject: _chart_1.ChartViewModel.toJson, localizationId: 'DevExpress.XtraReports.UI.XRChart' };
exports.chartDataMember = { propertyName: 'dataMember', displayName: 'Data Member', defaultVal: '', editor: _editorTemplates_1.editorTemplates.getEditor('dataMemberChart'), localizationId: 'DevExpress.XtraReports.UI.XRSparkline.DataMember' };
exports.chartSeriesDataMember = { propertyName: 'seriesDataMember', displayName: 'Series Data Member', defaultVal: '', editor: _editorTemplates_1.editorTemplates.getEditor('fieldChart'), localizationId: 'DevExpress.XtraReports.UI.XRChart.SeriesDataMember' };
exports.fakeChartSerializationInfo = [
    _editorTemplates_1.chartDataSource, exports.chartDataMember, exports.chartSeriesDataMember, exports.paletteName, exports.seriesTemplate, exports.seriesSerializable, _diagram_1.diagram, exports.titles, exports.legend, exports.legends, exports.emptyChartText, exports.backImage
];
exports.chartControlSerializationsInfo = [exports.chart];
