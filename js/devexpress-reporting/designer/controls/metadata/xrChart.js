﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrChart.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _chart_1 = require("../../../chart/internal/meta/_chart");
var controlParameter_1 = require("../properties/controlParameter");
var style_1 = require("./properties/style");
var metadata_1 = require("./properties/metadata");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _editorTemplates_1 = require("../../../chart/internal/_editorTemplates");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.chart = { propertyName: 'chart', modelName: 'Chart', from: _chart_1.chart.from, toJsonObject: _chart_1.chart.toJsonObject };
exports.controlParametersInfo = {
    propertyName: 'controlParameters', modelName: 'Parameters', displayName: 'Parameters', localizationId: 'DevExpress.XtraReports.UI.XRChart.Parameters',
    array: true, editor: analytics_widgets_1.editorTemplates.getEditor('commonCollection'), addHandler: controlParameter_1.ControlParameter.createNew, template: '#dxrd-commonCollectionItem'
};
var chartRtl = analytics_internal_1.extend(true, {}, metadata_1.rtl);
chartRtl.defaultVal = undefined;
exports.xrChartSerializationInfo = [_chart_1.appearanceName, _chart_1.paletteName, exports.chart, style_1.stylePriority, _editorTemplates_1.chartDataSource, metadata_1.imageType, scriptMetadata_1.chartScripts,
    exports.controlParametersInfo, chartRtl,
    { propertyName: 'dataMember', displayName: 'Data Member', localizationId: 'DevExpress.XtraReports.UI.XRChart.DataMember', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('dataMember') }
].concat(metadataGroups_1.baseControlProperties, metadataGroups_1.sizeLocation, metadataGroups_1.bordersProperties, metadataGroups_1.navigationGroup);
