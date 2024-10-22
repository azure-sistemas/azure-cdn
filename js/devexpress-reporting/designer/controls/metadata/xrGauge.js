﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrGauge.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var anchoring_1 = require("./properties/anchoring");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var metadata_1 = require("./properties/metadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var xrGauge_1 = require("../xrGauge");
var _metaUtils_1 = require("../utils/_metaUtils");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var editorTemplates_1 = require("../../widgets/editorTemplates");
exports.actualValue = { propertyName: 'actualValue', defaultVal: null, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Actual Value', localizationId: 'DevExpress.XtraReports.UI.XRGauge.ActualValue', modelName: '@ActualValue' };
exports.maximum = { propertyName: 'maximum', defaultVal: null, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Maximum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum', modelName: '@Maximum' };
exports.minimum = { propertyName: 'minimum', modelName: '@Minimum', defaultVal: null, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Minimum', localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum' };
exports.tickmarkCount = { propertyName: 'tickmarkCount', modelName: '@TickmarkCount', defaultVal: 11, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Tickmark Count', localizationId: 'DevExpress.XtraReports.UI.XRGauge.TickmarkCount' };
exports.targetValue = { propertyName: 'targetValue', modelName: '@TargetValue', defaultVal: null, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), displayName: 'Target Value', localizationId: 'DevExpress.XtraReports.UI.XRGauge.TargetValue' };
exports.viewStyle = { propertyName: 'viewStyle', modelName: '@ViewStyle', displayName: 'View Style', localizationId: 'DevExpress.XtraReports.UI.XRGauge.ViewStyle', editor: editorTemplates_1.designerEditorTemplates.getEditor('viewStyle') };
exports.viewTheme = {
    propertyName: 'viewTheme', modelName: '@ViewTheme',
    defaultVal: 'FlatLight', displayName: 'View Theme', localizationId: 'DevExpress.XtraReports.UI.XRGauge.ViewTheme', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'FlatLight', displayValue: 'FlatLight', localizationId: 'GaugesPresetsStringId.ThemeFlatLight' },
        { value: 'FlatDark', displayValue: 'FlatDark', localizationId: 'GaugesPresetsStringId.ThemeFlatDark' }
    ]
};
exports.viewType = {
    propertyName: 'viewType', modelName: '@ViewType',
    defaultVal: 'Circular', displayName: 'View Type', localizationId: 'DevExpress.XtraReports.UI.XRGauge.ViewType', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'Circular', displayValue: 'Circular', localizationId: 'ASPxReportsStringId.ReportDesigner_GaugeViewType_Circular' },
        { value: 'Linear', displayValue: 'Linear', localizationId: 'ASPxReportsStringId.ReportDesigner_GaugeViewType_Linear' }
    ]
};
exports.xrGaugeSerializationInfo = [
    exports.viewStyle, exports.viewTheme, exports.viewType, exports.actualValue, exports.tickmarkCount, exports.maximum, exports.minimum, exports.targetValue, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, scriptMetadata_1.controlScripts, metadata_1.imageType,
    dataBinding_1.dataBindings(['ActualValue', 'Bookmark', 'Maximum', 'Minimum', 'NavigateUrl', 'Tag', 'TargetValue'])
].concat(xrGauge_1.XRGaugeViewModel.bindings
    .map(function (name) {
    return _metaUtils_1.createPopularBindingInfos({ propertyName: name, localizationId: 'DevExpress.XtraReports.UI.XRGauge.' + name });
})
    .reduce(function (a, b) { return a.concat(b); }))
    .concat(metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties, metadataGroups_1.navigationGroup);
exports.popularPropertiesGauge = ['viewType', 'viewStyle', 'viewTheme', 'actualValue', 'popularDataBindingActualValue', 'targetValue', 'popularDataBindingTargetValue',
    'minimum', 'popularDataBindingMinimum', 'maximum', 'popularDataBindingMaximum'];
