﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseReportLayoutPage.js)
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
var layoutPageUtils_1 = require("../../internal/layoutPageUtils");
var pageId_1 = require("../../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var LegacyChooseReportLayoutPage = (function (_super) {
    __extends(LegacyChooseReportLayoutPage, _super);
    function LegacyChooseReportLayoutPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isGroupedReport = ko.observable(false);
        _this._reportLayoutTypes = [
            new layoutPageUtils_1.LayoutTypeItem('Columnar', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Columnar', layoutPageUtils_1.ReportLayout.columnar, 18),
            new layoutPageUtils_1.LayoutTypeItem('Tabular', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Tabular', layoutPageUtils_1.ReportLayout.tabular, 18),
            new layoutPageUtils_1.LayoutTypeItem('Justified', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Justified', layoutPageUtils_1.ReportLayout.justified, 18)
        ];
        _this._groupedReportLayoutsTypes = [
            new layoutPageUtils_1.LayoutTypeItem('Stepped', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Stepped', layoutPageUtils_1.ReportLayout.stepped, 1),
            new layoutPageUtils_1.LayoutTypeItem('Outline 1', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Outline1', layoutPageUtils_1.ReportLayout.outline1, 1),
            new layoutPageUtils_1.LayoutTypeItem('Outline 2', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Outline2', layoutPageUtils_1.ReportLayout.outline2, 1),
            new layoutPageUtils_1.LayoutTypeItem('Align Left 1', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_AlignLeft1', layoutPageUtils_1.ReportLayout.alignLeft1, 1),
            new layoutPageUtils_1.LayoutTypeItem('Align Left 2', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_AlignLeft2', layoutPageUtils_1.ReportLayout.alignLeft2, 1)
        ];
        _this.toggleFitFieldsToPage = function () {
            _this.fitFieldsToPage(!_this.fitFieldsToPage());
        };
        _this.selectedLayoutType = ko.observable(null);
        _this.fitFieldsToPage = ko.observable(true);
        _this.pageOrientationItems = [
            new layoutPageUtils_1.PageOrientationItem('Portrait', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Portrait', layoutPageUtils_1.PageOrientation.Portrait),
            new layoutPageUtils_1.PageOrientationItem('Landscape', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Landscape', layoutPageUtils_1.PageOrientation.Landscape)
        ];
        _this.selectedPageOrientation = ko.observable(_this.pageOrientationItems[0]);
        _this.layoutTypeItems = ko.pureComputed(function () {
            var items = _this._isGroupedReport() ? _this._groupedReportLayoutsTypes : _this._reportLayoutTypes;
            _this.selectedLayoutType(items[0]);
            return items;
        });
        _this.layoutTypeItemClick = function (item) {
            _this.selectedLayoutType(item);
        };
        _this.isSelected = function (item) {
            return _this.selectedLayoutType() === item;
        };
        return _this;
    }
    LegacyChooseReportLayoutPage.prototype.canFinish = function () {
        return true;
    };
    LegacyChooseReportLayoutPage.prototype.initialize = function (state) {
        this._isGroupedReport(state.groups.length > 0);
        var selectedLayoutType = analytics_internal_1.getFirstItemByPropertyValue(this.layoutTypeItems(), 'layoutType', state.layout);
        if (!selectedLayoutType) {
            selectedLayoutType = analytics_internal_1.getFirstItemByPropertyValue(this.layoutTypeItems(), 'layoutType', this._isGroupedReport() ? layoutPageUtils_1.ReportLayout.stepped : layoutPageUtils_1.ReportLayout.columnar);
        }
        this.selectedLayoutType(selectedLayoutType);
        this.fitFieldsToPage(state.fitFieldsToPage === undefined ? true : state.fitFieldsToPage);
        this.selectedPageOrientation((state.portrait === undefined || state.portrait) ? this.pageOrientationItems[0] : this.pageOrientationItems[1]);
        return $.Deferred().resolve().promise();
    };
    LegacyChooseReportLayoutPage.prototype.commit = function () {
        return $.Deferred().resolve({
            layout: this.selectedLayoutType().layoutType,
            fitFieldsToPage: this.fitFieldsToPage(),
            portrait: this.selectedPageOrientation().orientation === layoutPageUtils_1.PageOrientation.Portrait
        }).promise();
    };
    return LegacyChooseReportLayoutPage;
}(analytics_wizard_1.WizardPageBase));
exports.LegacyChooseReportLayoutPage = LegacyChooseReportLayoutPage;
function _registerLegacyChooseReportLayoutPage(factory) {
    factory.registerMetadata(pageId_1.LegacyReportWizardPageId.ChooseReportLayoutPage, {
        setState: function (data, state) {
            state.fitFieldsToPage = data.fitFieldsToPage;
            state.layout = data.layout;
            state.portrait = data.portrait;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.fitFieldsToPage = defaultState.fitFieldsToPage;
            state.layout = defaultState.layout;
            state.portrait = defaultState.portrait;
        },
        create: function () {
            return new LegacyChooseReportLayoutPage();
        },
        template: 'dxrd-page-reportLayoutType',
        description: analytics_utils_1.getLocalization('The report layout specifies the manner in which selected data fields are arranged on individual pages.', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout')
    });
}
exports._registerLegacyChooseReportLayoutPage = _registerLegacyChooseReportLayoutPage;
