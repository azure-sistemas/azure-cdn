﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrSparkline.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./properties/metadata");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var anchoring_1 = require("./properties/anchoring");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var spartlineTypes_1 = require("../spartlineTypes");
var editorTemplates_1 = require("../../widgets/editorTemplates");
exports.valueMember = { propertyName: 'valueMember', modelName: '@ValueMember', displayName: 'Value Member', localizationId: 'DevExpress.XtraReports.UI.XRSparkline.ValueMember', editor: analytics_widgets_1.editorTemplates.getEditor('field') };
var highlightMinPoint = { modelName: '@HighlightMinPoint', defaultVal: false, from: analytics_utils_1.parseBool, propertyName: 'highlightMinPoint', displayName: 'Highlight Min Point', localizationId: 'DevExpress.Sparkline.SparklineViewBase.HighlightMinPoint', editor: analytics_widgets_1.editorTemplates.getEditor('bool') }, highlightMaxPoint = { modelName: '@HighlightMaxPoint', defaultVal: false, from: analytics_utils_1.parseBool, propertyName: 'highlightMaxPoint', displayName: 'Highlight Max Point', localizationId: 'DevExpress.Sparkline.SparklineViewBase.HighlightMaxPoint', editor: analytics_widgets_1.editorTemplates.getEditor('bool') }, highlightStartPoint = { modelName: '@HighlightStartPoint', defaultVal: false, from: analytics_utils_1.parseBool, propertyName: 'highlightStartPoint', displayName: 'Highlight Start Point', localizationId: 'DevExpress.Sparkline.SparklineViewBase.HighlightStartPoint', editor: analytics_widgets_1.editorTemplates.getEditor('bool') }, highlightEndPoint = { modelName: '@HighlightEndPoint', defaultVal: false, from: analytics_utils_1.parseBool, propertyName: 'highlightEndPoint', displayName: 'Highlight End Point', localizationId: 'DevExpress.Sparkline.SparklineViewBase.HighlightEndPoint', editor: analytics_widgets_1.editorTemplates.getEditor('bool') }, highlightNegativePoints = { modelName: '@HighlightNegativePoints', defaultVal: false, from: analytics_utils_1.parseBool, propertyName: 'highlightNegativePoints', displayName: 'Highlight Negative Points', localizationId: 'DevExpress.Sparkline.LineSparklineView.HighlightNegativePoints', editor: analytics_widgets_1.editorTemplates.getEditor('bool') }, color = { modelName: '@Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, propertyName: 'color', displayName: 'Color', localizationId: 'DevExpress.Sparkline.SparklineViewBase.Color', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') }, maxPointColor = { modelName: '@MaxPointColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, propertyName: 'maxPointColor', displayName: 'Max Point Color', localizationId: 'DevExpress.Sparkline.SparklineViewBase.MaxPointColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') }, minPointColor = { modelName: '@MinPointColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, propertyName: 'minPointColor', displayName: 'Min Point Color', localizationId: 'DevExpress.Sparkline.SparklineViewBase.MinPointColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') }, startPointColor = { modelName: '@StartPointColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, propertyName: 'startPointColor', displayName: 'Start Point Color', localizationId: 'DevExpress.Sparkline.SparklineViewBase.StartPointColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') }, negativePointColor = { modelName: '@NegativePointColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, propertyName: 'negativePointColor', displayName: 'Negative Point Color', localizationId: 'DevExpress.Sparkline.SparklineViewBase.NegativePointColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') }, endPointColor = { modelName: '@EndPointColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, propertyName: 'endPointColor', displayName: 'End Point Color', localizationId: 'DevExpress.Sparkline.SparklineViewBase.EndPointColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') }, sparklineViewType = {
    modelName: '@Type', propertyName: 'type'
}, enableAntialiasing = { modelName: '@EnableAntialiasing', propertyName: 'enableAntialiasing', displayName: 'Enable Antialiasing', localizationId: 'DevExpress.Sparkline.LineSparklineView.EnableAntialiasing', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, defaultVal: true }, maxPointMarkerSize = { modelName: '@MaxPointMarkerSize', defaultVal: 5, propertyName: 'maxPointMarkerSize', displayName: 'Max Point Marker Size', localizationId: 'DevExpress.Sparkline.LineSparklineView.MaxPointMarkerSize', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }, minPointMarkerSize = { modelName: '@MinPointMarkerSize', defaultVal: 5, propertyName: 'minPointMarkerSize', displayName: 'Min Point Marker Size', localizationId: 'DevExpress.Sparkline.LineSparklineView.MinPointMarkerSize', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }, startPointMarkerSize = { modelName: '@StartPointMarkerSize', defaultVal: 5, propertyName: 'startPointMarkerSize', displayName: 'Start Point Marker Size', localizationId: 'DevExpress.Sparkline.LineSparklineView.StartPointMarkerSize', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }, negativePointMarkerSize = { modelName: '@NegativePointMarkerSize', defaultVal: 5, propertyName: 'negativePointMarkerSize', displayName: 'Negative Point Marker Size', localizationId: 'DevExpress.Sparkline.LineSparklineView.NegativePointMarkerSize', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }, endPointMarkerSize = { modelName: '@EndPointMarkerSize', defaultVal: 5, propertyName: 'endPointMarkerSize', displayName: 'End Point Marker Size', localizationId: 'DevExpress.Sparkline.LineSparklineView.EndPointMarkerSize', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }, markerSize = { modelName: '@MarkerSize', propertyName: 'markerSize', defaultVal: 5, displayName: 'Marker Size', localizationId: 'DevExpress.Sparkline.LineSparklineView.MarkerSize', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }, showMarkers = { modelName: '@ShowMarkers', propertyName: 'showMarkers', displayName: 'Show Markers', localizationId: 'DevExpress.Sparkline.LineSparklineView.ShowMarkers', from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false }, markerColor = { modelName: '@MarkerColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, propertyName: 'markerColor', displayName: 'Marker Color', localizationId: 'DevExpress.Sparkline.LineSparklineView.MarkerColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') };
var barDistance = { modelName: '@BarDistance', propertyName: 'barDistance', defaultVal: 2, displayName: 'Bar Distance', localizationId: 'DevExpress.Sparkline.BarSparklineViewBase.BarDistance', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
var areaOpacity = { modelName: '@AreaOpacity', propertyName: 'areaOpacity', defaultVal: 135, displayName: 'Area Opacity', localizationId: 'DevExpress.Sparkline.AreaSparklineView.AreaOpacity', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
var commonSparklineViewProperties = [highlightStartPoint, highlightEndPoint, highlightMaxPoint, highlightMinPoint, color, maxPointColor, minPointColor, startPointColor, endPointColor, negativePointColor, sparklineViewType];
var viewLineSerializationsInfo = [].concat(commonSparklineViewProperties, [highlightNegativePoints, enableAntialiasing, negativePointMarkerSize, endPointMarkerSize, startPointMarkerSize, minPointMarkerSize, maxPointMarkerSize, markerSize, showMarkers, metadata_1.lineWidth, markerColor]);
var viewWinLoseSerializationsInfo = [].concat(commonSparklineViewProperties, [barDistance]);
var viewBarSerializationsInfo = [].concat(commonSparklineViewProperties, [barDistance, highlightNegativePoints]);
var viewAreaSerializationsInfo = [].concat(commonSparklineViewProperties, [enableAntialiasing, areaOpacity, negativePointMarkerSize, metadata_1.lineWidth, highlightNegativePoints, showMarkers, markerSize, maxPointMarkerSize, markerColor, minPointMarkerSize, endPointMarkerSize, startPointMarkerSize]);
exports.sparklineViewMap = {
    'Line': viewLineSerializationsInfo,
    'Bar': viewBarSerializationsInfo,
    'WinLoss': viewWinLoseSerializationsInfo,
    'Area': viewAreaSerializationsInfo
};
var limit1 = { propertyName: 'limit1', modelName: '@Limit1', displayName: 'Limit 1', localizationId: 'DevExpress.Sparkline.SparklineRange.Limit1', defaultVal: 0, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }, limit2 = { propertyName: 'limit2', modelName: '@Limit2', displayName: 'Limit 2', localizationId: 'DevExpress.Sparkline.SparklineRange.Limit2', defaultVal: 1, editor: analytics_widgets_1.editorTemplates.getEditor('numeric') }, isAuto = { propertyName: 'isAuto', modelName: '@IsAuto', displayName: 'Is Auto', localizationId: 'DevExpress.Sparkline.SparklineRange.IsAuto', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.valueRange = { propertyName: 'valueRange', modelName: 'ValueRange', displayName: 'Value Range', localizationId: 'DevExpress.XtraReports.UI.XRSparkline.ValueRange', info: [limit1, limit2, isAuto], editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
var sparklineView = { propertyName: 'view', modelName: 'View' };
exports.sparklineFake = { propertyName: 'sparklineFake', editor: editorTemplates_1.designerEditorTemplates.getEditor('contentByType'), valuesArray: spartlineTypes_1.spartlineTypes, displayName: 'View', localizationId: 'DevExpress.XtraReports.UI.XRSparkline.View' };
exports.sparklineSerializationsInfo = [
    exports.sparklineFake, sparklineView, exports.valueMember, exports.valueRange, metadata_1.imageType, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, dataBinding_1.dataBindings(['Bookmark', 'NavigateUrl', 'Tag']),
    metadata_1.dataAdapter, metadata_1.dataMember, metadata_1.dataSource, scriptMetadata_1.controlScripts
].concat(metadataGroups_1.commonControlProperties, metadataGroups_1.sizeLocation, metadataGroups_1.navigationGroup);
exports.popularPropertiesSparkline = ['dataSource', 'dataMember', 'dataAdapter', 'valueMemberEditable', 'sparklineFake'];