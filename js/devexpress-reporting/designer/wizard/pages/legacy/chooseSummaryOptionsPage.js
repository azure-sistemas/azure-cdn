﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\legacy\chooseSummaryOptionsPage.js)
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
var _summaryOptionsPageUtils_1 = require("../../internal/_summaryOptionsPageUtils");
var pageId_1 = require("../../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var LegacyChooseSummaryOptionsPage = (function (_super) {
    __extends(LegacyChooseSummaryOptionsPage, _super);
    function LegacyChooseSummaryOptionsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._columns = [];
        _this.summaryOptions = ko.observableArray([]);
        _this.ignoreNullValues = ko.observable(false);
        _this.toggleIgnoreNullValues = function () {
            _this.ignoreNullValues(!_this.ignoreNullValues());
        };
        return _this;
    }
    LegacyChooseSummaryOptionsPage.prototype.canFinish = function () {
        return true;
    };
    LegacyChooseSummaryOptionsPage.prototype.initialize = function (state) {
        var _this = this;
        this.ignoreNullValues(state.ignoreNullValuesForSummary);
        var changes = ko.utils.compareArrays(state.summaryOptionsColumns || [], this._columns);
        var isColumnsChanged = changes.some(function (change, index, array) { return change.status != 'retained'; });
        if (isColumnsChanged) {
            this._columns = state.summaryOptionsColumns || [];
            this.summaryOptions.removeAll();
            this._columns.forEach(function (column) {
                _this.summaryOptions.push(new _summaryOptionsPageUtils_1.SummaryOptionsWrapper(column.name, column.displayName));
            });
        }
        this.summaryOptions.notifySubscribers();
        return $.Deferred().resolve().promise();
    };
    LegacyChooseSummaryOptionsPage.prototype.commit = function () {
        return $.Deferred().resolve({
            ignoreNullValuesForSummary: this.ignoreNullValues(),
            summaryOptions: this.summaryOptions().map(function (value) { return value.getOptions(); })
        }).promise();
    };
    return LegacyChooseSummaryOptionsPage;
}(analytics_wizard_1.WizardPageBase));
exports.LegacyChooseSummaryOptionsPage = LegacyChooseSummaryOptionsPage;
function _registerLegacyChooseSummaryOptionsPage(factory) {
    factory.registerMetadata(pageId_1.LegacyReportWizardPageId.ChooseSummaryOptionsPage, {
        setState: function (data, state) {
            state.summaryOptions = data.summaryOptions;
            state.ignoreNullValuesForSummary = data.ignoreNullValuesForSummary;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.summaryOptions = defaultState.summaryOptions;
            state.ignoreNullValuesForSummary = defaultState.ignoreNullValuesForSummary;
        },
        create: function () {
            return new LegacyChooseSummaryOptionsPage();
        },
        template: 'dxrd-page-summaryOptions',
        description: analytics_utils_1.getLocalization('What summary function would you like to calculate?', 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions')
    });
}
exports._registerLegacyChooseSummaryOptionsPage = _registerLegacyChooseSummaryOptionsPage;
