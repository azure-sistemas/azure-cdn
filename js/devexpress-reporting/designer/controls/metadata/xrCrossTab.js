﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrCrossTab.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./../../controls/metadata/properties/metadata");
var printOptions_1 = require("./crosstab/printOptions");
var layoutOptions_1 = require("./crosstab/layoutOptions");
var metadataGroups_1 = require("./properties/metadataGroups");
var fields_1 = require("./crosstab/fields");
var defenitions_1 = require("./crosstab/defenitions");
var style_1 = require("./properties/style");
var xrChart_1 = require("./xrChart");
var cells = { propertyName: 'cells', modelName: 'Cells', array: true };
var originalPivotGridLayout = { propertyName: 'originalPivotGridLayout', modelName: '@OriginalPivotGridLayout', defaultVal: '' };
exports.crossTabSerializationInfo = [fields_1.rowFields, fields_1.columnFields, fields_1.dataFields, defenitions_1.rowDefinitions,
    defenitions_1.columnDefinitions, metadata_1.dataSource, metadata_1.dataMember, layoutOptions_1.crossTabLayoutOptions, printOptions_1.crossTabPrintOptions,
    originalPivotGridLayout, xrChart_1.controlParametersInfo, metadata_1.filterString, metadata_1.filterStringEditable].concat(metadataGroups_1.baseControlProperties, metadataGroups_1.sizeLocation, metadataGroups_1.bookmarkGroup, cells, style_1.crossTabStyles);
