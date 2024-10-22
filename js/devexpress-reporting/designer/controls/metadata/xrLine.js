﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrLine.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./properties/metadata");
var anchoring_1 = require("./properties/anchoring");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var dataBinding_1 = require("../../dataObjects/metadata/dataBinding");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.lineDirection = {
    propertyName: 'lineDirection',
    modelName: '@LineDirection',
    defaultVal: 'Horizontal',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    displayName: 'Line Direction', localizationId: 'DevExpress.XtraReports.UI.XRLine.LineDirection',
    valuesArray: [
        { value: 'Horizontal', displayValue: 'Horizontal', localizationId: 'DevExpress.XtraReports.UI.LineDirection.Horizontal' },
        { value: 'Vertical', displayValue: 'Vertical', localizationId: 'DevExpress.XtraReports.UI.LineDirection.Vertical' },
        { value: 'Slant', displayValue: 'Slant', localizationId: 'DevExpress.XtraReports.UI.LineDirection.Slant' },
        { value: 'BackSlant', displayValue: 'BackSlant', localizationId: 'DevExpress.XtraReports.UI.LineDirection.BackSlant' }
    ]
};
exports.lineSerializationsInfo = [
    metadata_1.foreColor, metadata_1.keepTogether, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal,
    metadata_1.lineWidth, exports.lineDirection, metadata_1.lineStyle, scriptMetadata_1.controlScripts,
    dataBinding_1.dataBindings(['Tag'])
].concat(metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties);
exports.popularPropertiesLine = ['lineDirection', 'lineStyle', 'lineWidth', 'anchorVertical', 'anchorHorizontal'];
