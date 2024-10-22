﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\_selectLabelTypePage.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _reportWizardService_1 = require("../../services/_reportWizardService");
var $ = require("jquery");
exports.labelReportWizardPromise = null;
function initializeLabelReportWizardPromise() {
    if (!exports.labelReportWizardPromise) {
        var $def = $.Deferred();
        _reportWizardService_1.ReportWizardService.getLabelReportWizardData().done(function (data) { return $def.resolve(JSON.parse(data)); });
        exports.labelReportWizardPromise = $def.promise();
    }
}
exports.initializeLabelReportWizardPromise = initializeLabelReportWizardPromise;
