﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\utils.js)
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
var inititalizer_1 = require("../../utils/inititalizer");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var _ReportWizardOptions = (function (_super) {
    __extends(_ReportWizardOptions, _super);
    function _ReportWizardOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wizardSettings = new inititalizer_1.ReportWizardSettings().createDefault();
        _this.hideDataMemberSubItems = false;
        return _this;
    }
    return _ReportWizardOptions;
}(analytics_wizard_1._DataSourceWizardOptionsBase));
exports._ReportWizardOptions = _ReportWizardOptions;
