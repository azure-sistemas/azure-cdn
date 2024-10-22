﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrControl.js)
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
exports.panelSerializationsInfo = [
    metadata_1.canGrow, metadata_1.canShrink, metadata_1.keepTogether, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, scriptMetadata_1.controlScripts,
    dataBinding_1.dataBindings(['Bookmark', 'NavigateUrl', 'Tag']),
    { propertyName: 'controls', modelName: 'Controls', array: true },
    metadata_1.rtl
].concat(metadataGroups_1.sizeLocation, metadataGroups_1.commonControlProperties, metadataGroups_1.navigationGroup).filter(function (x) { return x != metadata_1.accessibleDescription; });
