﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_diagram.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _diagram_1 = require("../../components/_diagram");
var _common_1 = require("./_common");
var _axis_1 = require("./_axis");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _editorTemplates_1 = require("../_editorTemplates");
var ko = require("knockout");
exports.diagram = { propertyName: 'diagram', modelName: 'Diagram', displayName: 'Diagram', from: function (val) { return ko.observable(val); }, toJsonObject: _diagram_1.DiagramViewModel.toJson, localizationId: 'DevExpress.XtraReports.UI.XRChart.Diagram' };
var dimension = { propertyName: 'dimension', modelName: '@Dimension', displayName: 'Dimension', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.SimpleDiagram3D.Dimension' }, equalPieSize = { propertyName: 'equalPieSize', modelName: '@EqualPieSize', displayName: 'EqualPieSize', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool }, typeNameNotShowDiagram = { propertyName: 'typeNameSerializable', modelName: '@TypeNameSerializable' };
exports.secondaryAxesX = { propertyName: 'secondaryAxesX', modelName: 'SecondaryAxesX', displayName: 'Secondary Axes X', array: true, editor: _editorTemplates_1.editorTemplates.getEditor('collection'), localizationId: 'DevExpress.XtraCharts.XYDiagram.SecondaryAxesX' };
exports.secondaryAxesY = { propertyName: 'secondaryAxesY', modelName: 'SecondaryAxesY', displayName: 'Secondary Axes Y', array: true, editor: _editorTemplates_1.editorTemplates.getEditor('collection'), localizationId: 'DevExpress.XtraCharts.XYDiagram.SecondaryAxesY' };
exports.panes = { propertyName: 'panes', modelName: 'Panes', displayName: 'Additional Panes', array: true, editor: _editorTemplates_1.editorTemplates.getEditor('collection'), localizationId: 'ChartDesignerStringIDs.TreeAdditionalPanelCollection' };
var drawingStyle = {
    propertyName: 'drawingStyle', modelName: '@DrawingStyle', displayName: 'Drawing Style', localizationId: 'DevExpress.XtraCharts.RadarDiagram.DrawingStyle', defaultVal: 'Circle',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Circle', displayValue: 'Circle', localizationId: 'DevExpress.XtraCharts.RadarDiagramDrawingStyle.Circle' },
        { value: 'Polygon', displayValue: 'Polygon', localizationId: 'DevExpress.XtraCharts.RadarDiagramDrawingStyle.Polygon' }
    ]
}, startAngleInDegrees = {
    propertyName: 'startAngleInDegrees', modelName: '@StartAngleInDegrees', displayName: 'Start Angle in Degrees', localizationId: 'DevExpress.XtraCharts.RadarDiagram.StartAngleInDegrees', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 0
}, rotationDirection = {
    propertyName: 'rotationDirection', modelName: '@RotationDirection', displayName: 'Rotation Direction', localizationId: 'DevExpress.XtraCharts.RadarDiagram.RotationDirection', defaultVal: 'Counterclockwise',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: [
        { value: 'Counterclockwise', displayValue: 'Counterclockwise', localizationId: 'DevExpress.XtraCharts.RadarDiagramRotationDirection.Counterclockwise' },
        { value: 'Clockwise', displayValue: 'Clockwise', localizationId: 'DevExpress.XtraCharts.RadarDiagramRotationDirection.Clockwise' }
    ]
};
exports.diagramSerializationsInfo = [typeNameNotShowDiagram];
var radarSerializationsInfo = [drawingStyle, startAngleInDegrees, rotationDirection, _axis_1.radarAxisX, _axis_1.radarAxisY, _common_1.margin, _common_1.backColor].concat(exports.diagramSerializationsInfo), polarSerializationsInfo = [_axis_1.radarAxisX, _axis_1.radarAxisY, _common_1.margin, _common_1.backColor].concat(exports.diagramSerializationsInfo), simple3DSerializationsInfo = [dimension, _common_1.margin, equalPieSize].concat(exports.diagramSerializationsInfo), funnel3DSerializationsInfo = [].concat(simple3DSerializationsInfo), simpleSerializationsInfo = [dimension, _common_1.margin, equalPieSize].concat(exports.diagramSerializationsInfo), XY2DSerializationsInfo = [_common_1.defaultPane, exports.panes, _axis_1.axisX, _axis_1.axisY, exports.secondaryAxesX, exports.secondaryAxesY, _common_1.margin, _common_1.enableAxisXScrolling, _common_1.enableAxisXZooming, _common_1.enableAxisYScrolling, _common_1.enableAxisYZooming, typeNameNotShowDiagram], XYSerializationsInfo = [_common_1.rotated].concat(XY2DSerializationsInfo), XY3DSerializationsInfo = [_axis_1.axisX3D, _axis_1.axisY3D, _common_1.backColor, typeNameNotShowDiagram], GanttDiagramSerializationsInfo = [].concat(XY2DSerializationsInfo);
var XYObject = { info: XYSerializationsInfo, type: 'XYDiagram' }, XY2DObject = { info: XY2DSerializationsInfo, type: 'SwiftPlotDiagram' }, XY3DObject = { info: XY3DSerializationsInfo, type: 'XYDiagram3D' }, radarObject = { info: radarSerializationsInfo, type: 'RadarDiagram' }, polarObject = { info: polarSerializationsInfo, type: 'PolarDiagram' }, simpleObject = { info: simpleSerializationsInfo, type: 'SimpleDiagram' }, simple3DObject = { info: simple3DSerializationsInfo, type: 'SimpleDiagram3D' }, funnel3DObject = { info: funnel3DSerializationsInfo, type: 'FunnelDiagram' }, gantObject = { info: GanttDiagramSerializationsInfo, type: 'GanttDiagram' };
exports.diagramMapper = {
    'SideBySideBarSeriesView': XYObject,
    'StackedBarSeriesView': XYObject,
    'FullStackedBarSeriesView': XYObject,
    'SideBySideStackedBarSeriesView': XYObject,
    'SideBySideFullStackedBarSeriesView': XYObject,
    'WaterfallSeriesView': XYObject,
    'SideBySideBar3DSeriesView': XY3DObject,
    'StackedBar3DSeriesView': XY3DObject,
    'FullStackedBar3DSeriesView': XY3DObject,
    'SideBySideStackedBar3DSeriesView': XY3DObject,
    'SideBySideFullStackedBar3DSeriesView': XY3DObject,
    'ManhattanBarSeriesView': XY3DObject,
    'PointSeriesView': XYObject,
    'BubbleSeriesView': XYObject,
    'LineSeriesView': XYObject,
    'StackedLineSeriesView': XYObject,
    'FullStackedLineSeriesView': XYObject,
    'StepLineSeriesView': XYObject,
    'SplineSeriesView': XYObject,
    'ScatterLineSeriesView': XYObject,
    'SwiftPlotSeriesView': XY2DObject,
    'Line3DSeriesView': XY3DObject,
    'StackedLine3DSeriesView': XY3DObject,
    'FullStackedLine3DSeriesView': XY3DObject,
    'StepLine3DSeriesView': XY3DObject,
    'Spline3DSeriesView': XY3DObject,
    'PieSeriesView': simpleObject,
    'DoughnutSeriesView': simpleObject,
    'NestedDoughnutSeriesView': simpleObject,
    'Pie3DSeriesView': simple3DObject,
    'Doughnut3DSeriesView': simple3DObject,
    'FunnelSeriesView': simpleObject,
    'Funnel3DSeriesView': funnel3DObject,
    'AreaSeriesView': XYObject,
    'StackedAreaSeriesView': XYObject,
    'FullStackedAreaSeriesView': XYObject,
    'StepAreaSeriesView': XYObject,
    'SplineAreaSeriesView': XYObject,
    'StackedSplineAreaSeriesView': XYObject,
    'FullStackedSplineAreaSeriesView': XYObject,
    'Area3DSeriesView': XY3DObject,
    'StackedArea3DSeriesView': XY3DObject,
    'FullStackedArea3DSeriesView': XY3DObject,
    'StepArea3DSeriesView': XY3DObject,
    'SplineArea3DSeriesView': XY3DObject,
    'StackedSplineArea3DSeriesView': XY3DObject,
    'FullStackedSplineArea3DSeriesView': XY3DObject,
    'OverlappedRangeBarSeriesView': XYObject,
    'SideBySideRangeBarSeriesView': XYObject,
    'RangeAreaSeriesView': XYObject,
    'RangeArea3DSeriesView': XY3DObject,
    'RadarPointSeriesView': radarObject,
    'RadarLineSeriesView': radarObject,
    'RadarAreaSeriesView': radarObject,
    'PolarPointSeriesView': polarObject,
    'PolarLineSeriesView': polarObject,
    'PolarAreaSeriesView': polarObject,
    'StockSeriesView': XYObject,
    'CandleStickSeriesView': XYObject,
    'OverlappedGanttSeriesView': gantObject,
    'SideBySideGanttSeriesView': gantObject
};
