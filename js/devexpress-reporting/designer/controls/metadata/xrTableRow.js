﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTableRow.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrTableCell_1 = require("./xrTableCell");
var metadata_1 = require("./properties/metadata");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var metadataGroups_1 = require("./properties/metadataGroups");
exports.tableRowSerializationsInfo = [
    xrTableCell_1.weight, metadata_1.textAlignment, metadata_1.keepTogether, scriptMetadata_1.controlScripts,
    { propertyName: 'height', displayName: 'Height', localizationId: 'DevExpress.XtraReports.UI.XRControl.Height' },
    metadata_1.cells,
].concat(metadataGroups_1.commonControlProperties, metadataGroups_1.fontGroup).filter(function (x) { return x != metadata_1.accessibleDescription; });
