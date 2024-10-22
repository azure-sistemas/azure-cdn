﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\reportWizardStateCreating.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _reportWizardStateHelper_1 = require("./internal/_reportWizardStateHelper");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var reportWizardState_1 = require("./reportWizardState");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
function createReportWizardState(reportViewModel) {
    var state = analytics_internal_1.extend(true, {}, reportWizardState_1.defaultReportWizardState, analytics_wizard_1._createDefaultDataSourceWizardState());
    if (reportViewModel) {
        _reportWizardStateHelper_1.ReportWizardStateHelper.applyDataBindings(state, reportViewModel);
        _reportWizardStateHelper_1.ReportWizardStateHelper.applyPageSetup(state, reportViewModel);
    }
    return state;
}
exports.createReportWizardState = createReportWizardState;
