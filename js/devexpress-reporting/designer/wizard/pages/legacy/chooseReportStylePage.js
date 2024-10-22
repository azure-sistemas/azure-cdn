﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseReportStylePage.js)
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
var reportStylePageUtils_1 = require("../../internal/reportStylePageUtils");
var pageId_1 = require("../../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var LegacyChooseReportStylePage = (function (_super) {
    __extends(LegacyChooseReportStylePage, _super);
    function LegacyChooseReportStylePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reportStyleItems = [
            new reportStylePageUtils_1.ReportStyleItem('Bold', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Bold', reportStylePageUtils_1.ReportStyle.Bold),
            new reportStylePageUtils_1.ReportStyleItem('Casual', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Casual', reportStylePageUtils_1.ReportStyle.Casual),
            new reportStylePageUtils_1.ReportStyleItem('Corporate', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Corporate', reportStylePageUtils_1.ReportStyle.Corporate),
            new reportStylePageUtils_1.ReportStyleItem('Compact', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Compact', reportStylePageUtils_1.ReportStyle.Compact),
            new reportStylePageUtils_1.ReportStyleItem('Formal', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Formal', reportStylePageUtils_1.ReportStyle.Formal)
        ];
        _this.selectedReportStyle = ko.observable(_this.reportStyleItems[0]);
        return _this;
    }
    LegacyChooseReportStylePage.prototype.canFinish = function () {
        return true;
    };
    LegacyChooseReportStylePage.prototype.initialize = function (state) {
        this.selectedReportStyle(analytics_internal_1.getFirstItemByPropertyValue(this.reportStyleItems, 'reportStyle', state.style || reportStylePageUtils_1.ReportStyle.Bold));
        return $.Deferred().resolve().promise();
    };
    LegacyChooseReportStylePage.prototype.commit = function () {
        return $.Deferred().resolve({
            style: this.selectedReportStyle().reportStyle
        }).promise();
    };
    return LegacyChooseReportStylePage;
}(analytics_wizard_1.WizardPageBase));
exports.LegacyChooseReportStylePage = LegacyChooseReportStylePage;
function _registerLegacyChooseReportStylePage(factory) {
    factory.registerMetadata(pageId_1.LegacyReportWizardPageId.ChooseReportStylePage, {
        setState: function (data, state) {
            state.style = data.style;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.style = defaultState.style;
        },
        create: function () {
            return new LegacyChooseReportStylePage();
        },
        template: 'dxrd-page-reportStyle',
        description: analytics_utils_1.getLocalization('The report style specifies the appearance of your report.', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle')
    });
}
exports._registerLegacyChooseReportStylePage = _registerLegacyChooseReportStylePage;
