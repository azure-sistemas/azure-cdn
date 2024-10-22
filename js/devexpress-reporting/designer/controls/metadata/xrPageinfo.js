﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrPageinfo.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var anchoring_1 = require("./properties/anchoring");
var metadata_1 = require("./properties/metadata");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var xrPageinfo_1 = require("../xrPageinfo");
var editorTemplates_1 = require("../../widgets/editorTemplates");
exports.pageInfo = {
    propertyName: 'pageInfo',
    modelName: '@PageInfo', defaultVal: 'NumberOfTotal', displayName: 'Page Information', localizationId: 'DevExpress.XtraReports.UI.XRPageInfo.PageInfo',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: xrPageinfo_1.pageInfoValuesMap
};
exports.startPageNumber = {
    propertyName: 'startPageNumber',
    modelName: '@StartPageNumber', displayName: 'Start Page Number', localizationId: 'DevExpress.XtraReports.UI.XRPageInfo.StartPageNumber', defaultVal: 1, from: analytics_utils_1.floatFromModel, editor: analytics_widgets_1.editorTemplates.getEditor('numeric')
};
exports.runningBand = {
    propertyName: 'runningBand', modelName: '@RunningBand', link: true, displayName: 'Running Band', localizationId: 'DevExpress.XtraReports.UI.XRPageInfo.RunningBand', editor: editorTemplates_1.designerEditorTemplates.getEditor('runningBand')
};
exports.pageInfoSerializationsInfo = [
    anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, metadata_1.textAlignment, metadata_1.wordWrap, metadata_1.textFormatString, exports.pageInfo, exports.startPageNumber, exports.runningBand, scriptMetadata_1.textControlScripts, metadata_1.rtl,
    dataBinding_1.dataBindings(['Bookmark', 'NavigateUrl', 'Tag']),
].concat(metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties, metadataGroups_1.fontGroup, metadataGroups_1.navigationGroup).filter(function (x) { return x != metadata_1.accessibleDescription; });
exports.popularPropertiesPageInfo = ['pageInfo', 'startPageNumber', 'textFormatString', 'runningBand', 'anchorVertical'];
