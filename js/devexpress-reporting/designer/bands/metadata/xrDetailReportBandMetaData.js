﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrDetailReportBandMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bandsMetadata_1 = require("./bandsMetadata");
var scriptMetadata_1 = require("../../controls/metadata/properties/scriptMetadata");
var xrBandMetaData_1 = require("./xrBandMetaData");
var metadataGroups_1 = require("../../controls/metadata/properties/metadataGroups");
exports.detailReportBandSerializationInfo = [
    bandsMetadata_1.level, bandsMetadata_1.height, bandsMetadata_1.pageBreak, scriptMetadata_1.detailReportBandScripts,
    bandsMetadata_1.drillDownDetailReportExpanded,
    bandsMetadata_1.drillDownControl,
].concat(xrBandMetaData_1.commonBandSerializationInfo, metadataGroups_1.datasourcePrintOptionsGroup).filter(function (x) { return x.propertyName !== 'bands'; }).concat([{
        propertyName: 'bands',
        modelName: 'Bands',
        array: true
    }]);
exports.popularPropertiesDetailReport = ['dataSource', 'dataMember', 'dataAdapter', 'filterString'];
