﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrDetailBandMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_1 = require("../../controls/metadata/properties/style");
var metadata_1 = require("../../controls/metadata/properties/metadata");
var bandsMetadata_1 = require("./bandsMetadata");
var scriptMetadata_1 = require("../../controls/metadata/properties/scriptMetadata");
var xrBandMetaData_1 = require("./xrBandMetaData");
var groupfieldMetaData_1 = require("./groupfieldMetaData");
var multiColumnMetaData_1 = require("./multiColumnMetaData");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var hierarchyPrintOptionsSerializationsInfo = [
    {
        propertyName: 'childListFieldName',
        modelName: '@ChildListFieldName',
        defaultVal: '',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.ChildListFieldName',
        displayName: 'Child List Field Name',
        editor: analytics_widgets_1.editorTemplates.getEditor('field')
    }, {
        propertyName: 'keyFieldName',
        modelName: '@KeyFieldName',
        defaultVal: '',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.KeyFieldName',
        displayName: 'Key Field Name',
        editor: analytics_widgets_1.editorTemplates.getEditor('field')
    }, {
        propertyName: 'parentFieldName',
        modelName: '@ParentFieldName',
        defaultVal: '',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.ParentFieldName',
        displayName: 'Parent Field Name',
        editor: analytics_widgets_1.editorTemplates.getEditor('field')
    }, {
        propertyName: 'indent',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.Indent',
        modelName: '@Indent',
        defaultVal: 20,
        displayName: 'Indent',
        editor: analytics_widgets_1.editorTemplates.getEditor('numeric')
    }, {
        propertyName: 'keepTogetherWithFirstChild',
        modelName: '@KeepTogetherWithFirstChild',
        defaultVal: true,
        displayName: 'Keep Together With First Child',
        localizationId: 'DevExpress.XtraReports.UI.HierarchyPrintOptions.KeepTogetherWithFirstChild',
        editor: analytics_widgets_1.editorTemplates.getEditor('bool'),
        from: analytics_utils_1.parseBool
    }
];
exports.hierarchyPrintOptions = {
    modelName: 'HierarchyPrintOptions',
    propertyName: 'hierarchyPrintOptions',
    info: hierarchyPrintOptionsSerializationsInfo,
    localizationId: 'DevExpress.XtraReports.UI.DetailBand.HierarchyPrintOptions',
    displayName: 'Hierarchy Print Options',
    editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor')
};
exports.fillEmptySpace = { propertyName: 'fillEmptySpace', modelName: '@FillEmptySpace', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Fill Empty Space', localizationId: 'DevExpress.XtraReports.UI.DetailBand.FillEmptySpace', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.generalBandSerializationInfo = [
    style_1.evenStyleName, style_1.oddStyleName,
    metadata_1.keepTogetherDefaultValueFalse,
    bandsMetadata_1.pageBreak, scriptMetadata_1.commonBandScripts
].concat(xrBandMetaData_1.bandSerializationInfo);
exports.subBandSerializationInfo = [
    bandsMetadata_1.level
].concat(exports.generalBandSerializationInfo);
exports.generalBandPopularProperties = ['pageBreak', 'keepTogether', bandsMetadata_1.printAcrossBands.propertyName];
exports.detailBandSerializationInfo = exports.generalBandSerializationInfo.concat(bandsMetadata_1.drillDownDetailReportExpanded, exports.hierarchyPrintOptions, bandsMetadata_1.drillDownControl, bandsMetadata_1.keepTogetherWithDetailReports, exports.fillEmptySpace, groupfieldMetaData_1.sortFields, multiColumnMetaData_1.multiColumn);
exports.popularPropertiesDetail = exports.generalBandPopularProperties.concat('sortFields', 'keepTogetherWithDetailReports', exports.fillEmptySpace.propertyName, 'multiColumn');
