﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tocUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var xrReport_1 = require("../xrReport");
function isHeaderOrFooterBandType(band) {
    return ((band.controlType === 'ReportHeaderBand' || band.controlType === 'ReportFooterBand')
        && (band.parentModel() instanceof xrReport_1.ReportViewModel)) || (band.controlType === 'SubBand' && isHeaderOrFooterBandType(band.parentModel()));
}
exports.isHeaderOrFooterBandType = isHeaderOrFooterBandType;
function getExistTableOfContents(band) {
    var toc = analytics_internal_1.findFirstItemMatchesCondition(band.controls(), function (item) { return item.controlType === 'XRTableOfContents'; });
    return toc;
}
exports.getExistTableOfContents = getExistTableOfContents;
