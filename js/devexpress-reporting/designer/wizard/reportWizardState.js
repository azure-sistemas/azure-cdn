﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\reportWizardState.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrReport_1 = require("../controls/metadata/xrReport");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var $ = require("jquery");
var ReportType;
(function (ReportType) {
    ReportType[ReportType["Empty"] = 3] = "Empty";
    ReportType[ReportType["Databound"] = 0] = "Databound";
    ReportType[ReportType["Vertical"] = 1] = "Vertical";
    ReportType[ReportType["Label"] = 2] = "Label";
    ReportType[ReportType["CrossTab"] = 6] = "CrossTab";
})(ReportType = exports.ReportType || (exports.ReportType = {}));
var PivotSummaryType;
(function (PivotSummaryType) {
    PivotSummaryType[PivotSummaryType["Count"] = 0] = "Count";
    PivotSummaryType[PivotSummaryType["Sum"] = 1] = "Sum";
    PivotSummaryType[PivotSummaryType["Min"] = 2] = "Min";
    PivotSummaryType[PivotSummaryType["Max"] = 3] = "Max";
    PivotSummaryType[PivotSummaryType["Average"] = 4] = "Average";
    PivotSummaryType[PivotSummaryType["StdDev"] = 5] = "StdDev";
    PivotSummaryType[PivotSummaryType["StdDevp"] = 6] = "StdDevp";
    PivotSummaryType[PivotSummaryType["Var"] = 7] = "Var";
    PivotSummaryType[PivotSummaryType["Varp"] = 8] = "Varp";
    PivotSummaryType[PivotSummaryType["Custom"] = 9] = "Custom";
    PivotSummaryType[PivotSummaryType["CountDistinct"] = 10] = "CountDistinct";
    PivotSummaryType[PivotSummaryType["Median"] = 11] = "Median";
    PivotSummaryType[PivotSummaryType["Mode"] = 12] = "Mode";
})(PivotSummaryType = exports.PivotSummaryType || (exports.PivotSummaryType = {}));
var GraphicsUnit;
(function (GraphicsUnit) {
    GraphicsUnit[GraphicsUnit["World"] = 0] = "World";
    GraphicsUnit[GraphicsUnit["Display"] = 1] = "Display";
    GraphicsUnit[GraphicsUnit["Pixel"] = 2] = "Pixel";
    GraphicsUnit[GraphicsUnit["Point"] = 3] = "Point";
    GraphicsUnit[GraphicsUnit["Inch"] = 4] = "Inch";
    GraphicsUnit[GraphicsUnit["Document"] = 5] = "Document";
    GraphicsUnit[GraphicsUnit["Millimeter"] = 6] = "Millimeter";
})(GraphicsUnit = exports.GraphicsUnit || (exports.GraphicsUnit = {}));
exports.defaultPageSetupState = {
    paperKind: xrReport_1.paperKind.defaultVal,
    landscape: false,
    marginTop: 1,
    marginRight: 1,
    marginBottom: 1,
    marginLeft: 1,
    width: analytics_internal_1.papperKindMapper[xrReport_1.paperKind.defaultVal].width / 100,
    height: analytics_internal_1.papperKindMapper[xrReport_1.paperKind.defaultVal].height / 100,
    unit: GraphicsUnit.Inch
};
exports.defaultReportWizardState = {
    masterDetailInfoCollection: [],
    pageSetup: $.extend(true, {}, exports.defaultPageSetupState),
    colorScheme: {},
    ignoreNullValuesForSummary: false
};
