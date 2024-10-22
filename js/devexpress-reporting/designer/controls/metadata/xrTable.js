﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTable.js)
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
exports.processHiddenCellMode = {
    propertyName: 'processHiddenCellMode',
    modelName: '@ProcessHiddenCellMode',
    displayName: 'Process Hidden Cell Mode',
    valuesArray: [
        { value: 'LeaveEmptySpace', displayValue: 'Leave Empty Space' },
        { value: 'ResizeCellsEqually', displayValue: 'Resize Cells Equally' },
        { value: 'ResizeCellsProportionally', displayValue: 'Resize Cells Proportionally' },
        { value: 'StretchPreviousCell', displayValue: 'Stretch Previous Cell' },
        { value: 'StretchNextCell', displayValue: 'Stretch Next Cell' },
        { value: 'DecreaseTableWidth', displayValue: 'Decrease Table Width' }
    ],
    defaultVal: 'LeaveEmptySpace',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    localizationId: 'DevExpress.XtraReports.UI.XRTable.ProcessHiddenCellMode'
};
exports.tableSerializationsInfo = [
    metadata_1.expressionableFont, metadata_1.foreColor, metadata_1.keepTogetherDefaultValueFalse, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, scriptMetadata_1.commonScripts,
    { propertyName: 'rows', modelName: 'Rows', array: true },
    dataBinding_1.dataBindings(['Bookmark', 'Tag']),
    metadata_1.rtl,
    metadata_1.textAlignment,
    exports.processHiddenCellMode,
].concat(metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties, metadataGroups_1.bookmarkGroup).filter(function (x) { return x != metadata_1.accessibleDescription; });
exports.popularPropertiesTable = ['bookmark', 'bookmarkParent'];
