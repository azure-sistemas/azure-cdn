﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportPreviewService.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../utils/settings");
var xrReport_1 = require("../controls/metadata/xrReport");
var _previewRequestWrapper_1 = require("../../viewer/internal/_previewRequestWrapper");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ReportPreviewService = (function () {
    function ReportPreviewService() {
    }
    ReportPreviewService.initializePreview = function (report) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'initializePreview', encodeURIComponent(JSON.stringify({
            layout: JSON.stringify({ 'XtraReportsLayoutSerializer': report.serialize() }),
            culture: report.isLocalized() && report.language() !== xrReport_1.language.defaultVal ? report.language() : ''
        })), _previewRequestWrapper_1.PreviewRequestWrapper.getProcessErrorCallback());
    };
    return ReportPreviewService;
}());
exports.ReportPreviewService = ReportPreviewService;
