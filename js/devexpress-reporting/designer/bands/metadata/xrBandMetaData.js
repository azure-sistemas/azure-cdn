﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrBandMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../../controls/metadata/properties/metadata");
var metadataGroups_1 = require("../../controls/metadata/properties/metadataGroups");
var style_1 = require("../../controls/metadata/properties/style");
var bandsMetadata_1 = require("./bandsMetadata");
var scriptMetadata_1 = require("../../controls/metadata/properties/scriptMetadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
exports.expanded = { propertyName: 'expanded', modelName: '@Expanded', from: analytics_utils_1.parseBool, defaultVal: true };
exports.commonBandSerializationInfo = [
    metadata_1.textAlignment, exports.expanded,
    { propertyName: 'controls', modelName: 'Controls', array: true },
    { propertyName: 'bands', modelName: 'SubBands', array: true },
].concat(metadataGroups_1.commonBandProperties, metadataGroups_1.fontGroup);
exports.bandSerializationInfo = [
    style_1.styleName, style_1.stylesObj, style_1.stylePriority, bandsMetadata_1.height, bandsMetadata_1.printAcrossBands
].concat(exports.commonBandSerializationInfo);
exports.reportHeaderBandSerializationInfo = [metadata_1.keepTogetherDefaultValueFalse, bandsMetadata_1.pageBreak, scriptMetadata_1.commonBandScripts].concat(exports.bandSerializationInfo);
exports.reportFooterBandSerializationInfo = [bandsMetadata_1.printAtBottom].concat(exports.reportHeaderBandSerializationInfo);
exports.popularPropertiesReportHeader = [bandsMetadata_1.pageBreak.propertyName, 'keepTogether'];
exports.popularPropertiesReportFooter = [bandsMetadata_1.pageBreak.propertyName, 'keepTogether', 'printAtBottom'];
