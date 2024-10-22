﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\xrPageBandMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scriptMetadata_1 = require("../../controls/metadata/properties/scriptMetadata");
var xrBandMetaData_1 = require("./xrBandMetaData");
var bandsMetadata_1 = require("./bandsMetadata");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.printOn = {
    propertyName: 'printOn',
    modelName: '@PrintOn', displayName: 'Print On', localizationId: 'DevExpress.XtraReports.UI.PageBand.PrintOn', defaultVal: 'AllPages',
    editor: analytics_widgets_1.editorTemplates.getEditor('combobox'),
    valuesArray: [
        { value: 'AllPages', displayValue: 'All Pages', localizationId: 'DevExpress.XtraReports.UI.PrintOnPages.AllPages' },
        { value: 'NotWithReportHeader', displayValue: 'Not with Report Header', localizationId: 'DevExpress.XtraReports.UI.PrintOnPages.NotWithReportHeader' },
        { value: 'NotWithReportFooter', displayValue: 'Not with Report Footer', localizationId: 'DevExpress.XtraReports.UI.PrintOnPages.NotWithReportFooter' },
        { value: 'NotWithReportHeaderAndReportFooter', displayValue: 'Not with Report Header and Report Footer', localizationId: 'DevExpress.XtraReports.UI.PrintOnPages.NotWithReportHeaderAndReportFooter' }
    ]
};
exports.pageBandSerializationInfoPageHeader = [exports.printOn, scriptMetadata_1.commonBandScripts].concat(xrBandMetaData_1.bandSerializationInfo);
exports.pageBandSerializationInfo = [exports.printOn, scriptMetadata_1.commonBandScripts].concat(xrBandMetaData_1.bandSerializationInfo);
exports.popularPropertiesPageHeader = ['printOn', bandsMetadata_1.printAcrossBands.propertyName];
exports.popularPropertiesPageFooter = ['printOn'];
