﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\_reportWizardCreating.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reportWizard_1 = require("./reportWizard");
var fullscreenReportWizard_1 = require("./fullscreenReportWizard");
var legacyReportWizard_1 = require("./legacyReportWizard");
function _createReportWizard(reportWizardOptions) {
    if (reportWizardOptions.wizardSettings.useFullscreenWizard && reportWizardOptions.wizardSettings.useMasterDetailWizard)
        return fullscreenReportWizard_1._createFullscreenReportWizard(reportWizardOptions);
    else if (reportWizardOptions.wizardSettings.useMasterDetailWizard)
        return reportWizard_1._createReportWizard(reportWizardOptions);
    else
        return legacyReportWizard_1._createLegacyReportWizard(reportWizardOptions);
}
exports._createReportWizard = _createReportWizard;
