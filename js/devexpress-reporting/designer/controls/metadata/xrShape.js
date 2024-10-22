﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrShape.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var metadata_1 = require("./properties/metadata");
var anchoring_1 = require("./properties/anchoring");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var editorTemplates_1 = require("../../widgets/editorTemplates");
var shapes = {
    'Rectangle': 'Rectangle',
    'Ellipse': 'Ellipse',
    'Top Arrow': 'Top Arrow',
    'Right Arrow': 'Right Arrow',
    'Bottom Arrow': 'Bottom Arrow',
    'Left Arrow': 'Left Arrow',
    'Triangle': 'Triangle',
    'Square': 'Square',
    'Pentagon': 'Pentagon',
    'Hexagon': 'Hexagon',
    'Octagon': 'Octagon',
    '3-Point Star': '3-Point Star',
    '4-Point Star': '4-Point Star',
    '5-Point Star': '5-Point Star',
    '6-Point Star': '6-Point Star',
    '8-Point Star': '8-Point Star',
    'Vertical Line': 'Vertical Line',
    'Horizontal Line': 'Horizontal Line',
    'Slant Line': 'Slant Line',
    'Backslant Line': 'Backslant Line',
    'Cross': 'Cross',
    'Bracket': 'Bracket',
    'Brace': 'Brace'
};
exports.shapeType = { propertyName: 'shapeType', modelName: '@ShapeName', defaultVal: 'Ellipse' };
exports.stretch = { propertyName: 'stretch', modelName: '@Stretch', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), displayName: 'Stretch', localizationId: 'DevExpress.XtraReports.UI.XRShape.Stretch' };
exports.fillColor = { propertyName: 'fillColor', modelName: '@FillColor', defaultVal: 'transparent', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, displayName: 'Fill Color', localizationId: 'DevExpress.XtraReports.UI.XRShape.FillColor' };
exports.Shape = { propertyName: 'Shape', modelName: 'Shape' };
exports.shapeFake = { propertyName: 'shapeFake', editor: editorTemplates_1.designerEditorTemplates.getEditor('contentByType'), displayName: 'Shape', values: shapes, localizationId: 'DevExpress.XtraReports.UI.XRShape.Shape' };
exports.shapeElementSerializationsInfo = [exports.shapeType];
var fillet = { propertyName: 'fillet', modelName: '@Fillet', defaultVal: 0, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Fillet', localizationId: 'DevExpress.XtraPrinting.Shape.FilletShapeBase.Fillet' };
var shapeRectangleSerializationsInfo = [exports.shapeType, fillet];
var shapeStarSerializationsInfo = [
    exports.shapeType,
    { propertyName: 'concavity', modelName: '@Concavity', defaultVal: 50, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Concavity', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeStar.Concavity' },
    { propertyName: 'starPointCount', modelName: '@StarPointCount', defaultVal: 3, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Count of Star Points', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeStar.StarPointCount' },
    fillet
];
var shapeBraceSerializationsInfo = [
    exports.shapeType,
    { propertyName: 'fillet', modelName: '@Fillet', defaultVal: 50, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Fillet', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeBrace.Fillet' },
    { propertyName: 'tailLength', modelName: '@TailLength', defaultVal: 20, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: "Tail\'s Length", localizationId: 'DevExpress.XtraPrinting.Shape.ShapeBrace.TailLength' },
    { propertyName: 'tipLength', modelName: '@TipLength', defaultVal: 20, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: "Tip\'s Length", localizationId: 'DevExpress.XtraPrinting.Shape.ShapeBracket.TipLength' }
];
var shapeBracketSerializationsInfo = [
    exports.shapeType,
    { propertyName: 'tipLength', modelName: '@TipLength', defaultVal: 20, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: "Tip\'s Length", localizationId: 'DevExpress.XtraPrinting.Shape.ShapeBracket.TipLength' }
];
var shapePolygonSerializationsInfo = [
    exports.shapeType, fillet,
    { propertyName: 'numberOfSides', modelName: '@NumberOfSides', defaultVal: 3, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Number of Sides', localizationId: 'DevExpress.XtraPrinting.Shape.ShapePolygon.NumberOfSides' },
];
var shapeArrowSerializationsInfo = [
    exports.shapeType,
    { propertyName: 'arrowHeight', modelName: '@ArrowHeight', defaultVal: 50, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Arrow Height', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeArrow.ArrowHeight' },
    { propertyName: 'arrowWidth', modelName: '@ArrowWidth', defaultVal: 50, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Arrow Width', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeArrow.ArrowWidth' },
    fillet
];
var shapeCrossSerializationsInfo = [
    exports.shapeType, fillet,
    { propertyName: 'horizontalLineWidth', modelName: '@HorizontalLineWidth', defaultVal: 50, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Horizontal Line Width', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeCross.HorizontalLineWidth' },
    { propertyName: 'verticalLineWidth', modelName: '@VerticalLineWidth', defaultVal: 50, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Vertical Line Width', localizationId: 'DevExpress.XtraPrinting.Shape.ShapeCross.VerticalLineWidth' }
];
exports.shapesMap = {
    'Rectangle': shapeRectangleSerializationsInfo,
    'Arrow': shapeArrowSerializationsInfo,
    'Ellipse': exports.shapeElementSerializationsInfo,
    'Polygon': shapePolygonSerializationsInfo,
    'Star': shapeStarSerializationsInfo,
    'Line': exports.shapeElementSerializationsInfo,
    'Bracket': shapeBracketSerializationsInfo,
    'Cross': shapeCrossSerializationsInfo,
    'Brace': shapeBraceSerializationsInfo
};
exports.shapeSerializationsInfo = [
    metadata_1.lineWidth, metadata_1.lineStyle, metadata_1.foreColor, exports.Shape, exports.fillColor, exports.stretch, metadata_1.angle, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, scriptMetadata_1.controlScripts, exports.shapeFake,
    dataBinding_1.dataBindings(['Bookmark', 'NavigateUrl', 'Tag']),
].concat(metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties, metadataGroups_1.navigationGroup);
exports.popularPropertiesShape = ['stretch', 'fillColor', 'lineWidth', 'angle', 'bookmark', 'bookmarkParent', 'shapeFake'];
