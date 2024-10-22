﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrCrossband.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var metadata_1 = require("./properties/metadata");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var $ = require("jquery");
var editorTemplates_1 = require("../../widgets/editorTemplates");
exports.crossBandLineWidth = { propertyName: 'width', modelName: '@WidthF', defaultVal: 1, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.Width', from: analytics_utils_1.floatFromModel };
exports.startPoint = { propertyName: 'startPoint', modelName: '@StartPointFloat', from: analytics_elements_1.Point.fromString, displayName: 'Start Point', localizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.StartPoint', localizable: true, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.endPoint = { propertyName: 'endPoint', modelName: '@EndPointFloat', from: analytics_elements_1.Point.fromString, displayName: 'End Point', localizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.EndPoint', localizable: true, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.startBand = { propertyName: 'startBand', modelName: '@StartBand', link: true, displayName: 'Start Band', localizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.StartBand', editor: editorTemplates_1.designerEditorTemplates.getEditor('bands') };
exports.endBand = { propertyName: 'endBand', modelName: '@EndBand', link: true, displayName: 'End Band', localizationId: 'DevExpress.XtraReports.UI.XRCrossBandControl.EndBand', editor: editorTemplates_1.designerEditorTemplates.getEditor('bands') };
exports.borderDashStyleCrossband = {
    propertyName: 'borderDashStyleCrossband', modelName: '@BorderDashStyle',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), displayName: 'Border Dash Style', localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderDashStyle', valuesArray: metadata_1.borderDashStyleValues
};
exports.width = { propertyName: 'width', modelName: '@WidthF', defaultVal: 0, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Width', localizationId: 'DevExpress.XtraReports.UI.XRControl.Width', from: analytics_utils_1.floatFromModel, localizable: true };
exports.crossBandBoxControlSerializationsInfo = [
    exports.startPoint, exports.startBand, exports.endPoint, exports.endBand, exports.width,
    metadata_1.borderColor, exports.borderDashStyleCrossband, metadata_1.canPublish,
    $.extend({}, metadata_1.borders, { defaultVal: 'All' }),
    $.extend({}, metadata_1.borderWidth, { defaultVal: 2 }),
    { propertyName: 'locationF', modelName: '@LocationFloat', from: analytics_elements_1.Point.fromString },
].concat(metadataGroups_1.baseControlProperties);
exports.crossBandLineControlSerializationsInfo = [
    exports.startPoint, exports.startBand, exports.endPoint, exports.endBand, exports.width,
    metadata_1.foreColor, metadata_1.lineStyle, exports.crossBandLineWidth, metadata_1.canPublish,
    { propertyName: 'locationF', modelName: '@LocationFloat', from: analytics_elements_1.Point.fromString, }
].concat(metadataGroups_1.baseControlProperties);
exports.popularPropertiesCrossLine = ['lineStyle'];
