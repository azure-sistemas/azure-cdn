﻿/**
* DevExpress HTML/JS Reporting (designer\utils\inititalizer.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var ReportWizardSettings = (function (_super) {
    __extends(ReportWizardSettings, _super);
    function ReportWizardSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReportWizardSettings.prototype.createDefault = function (wizardSettings) {
        var newSettings = analytics_internal_1.extend({}, _super.prototype.createDefault.call(this, wizardSettings), { useFullscreenWizard: true, useMasterDetailWizard: true });
        if (!wizardSettings)
            return newSettings;
        if (wizardSettings.useFullscreenWizard !== undefined)
            newSettings.useFullscreenWizard = wizardSettings.useFullscreenWizard;
        if (wizardSettings.useMasterDetailWizard !== undefined)
            newSettings.useMasterDetailWizard = wizardSettings.useMasterDetailWizard;
        return newSettings;
    };
    return ReportWizardSettings;
}(analytics_wizard_1.DataSourceWizardSettings));
exports.ReportWizardSettings = ReportWizardSettings;
