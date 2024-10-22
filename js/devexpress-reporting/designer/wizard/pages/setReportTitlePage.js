﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\setReportTitlePage.js)
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
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var SetReportTitlePage = (function (_super) {
    __extends(SetReportTitlePage, _super);
    function SetReportTitlePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reportTitle = ko.observable('');
        return _this;
    }
    SetReportTitlePage.prototype.initialize = function (data) {
        this.reportTitle(data.reportTitle ? data.reportTitle : '');
        return $.Deferred().resolve().promise();
    };
    SetReportTitlePage.prototype.canNext = function () {
        return false;
    };
    SetReportTitlePage.prototype.canFinish = function () {
        return true;
    };
    SetReportTitlePage.prototype.commit = function () {
        return $.Deferred().resolve({
            reportTitle: this.reportTitle()
        }).promise();
    };
    return SetReportTitlePage;
}(analytics_wizard_1.WizardPageBase));
exports.SetReportTitlePage = SetReportTitlePage;
function _registerSetReportTitlePage(factory) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.SetReportTitlePage, {
        create: function () { return new SetReportTitlePage(); },
        getState: function (state) { return state; },
        setState: function (data, state) { return state.reportTitle = data.reportTitle; },
        resetState: function (state, defaultState) { return state.reportTitle = defaultState.reportTitle; },
        template: 'dxrd-page-reportTitle',
        description: analytics_utils_1.getLocalization('We have all the information needed to process the report.', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportComplete_Description')
    });
}
exports._registerSetReportTitlePage = _registerSetReportTitlePage;
