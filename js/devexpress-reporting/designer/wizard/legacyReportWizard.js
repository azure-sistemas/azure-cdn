﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\legacyReportWizard.js)
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
var reportWizardState_1 = require("./reportWizardState");
var _legacyReportRequestModel_1 = require("./internal/_legacyReportRequestModel");
var pageId_1 = require("./pageId");
var reportWizard_1 = require("./reportWizard");
var chooseReportTypePage_1 = require("./pages/chooseReportTypePage");
var selectDataMemberPage_1 = require("./pages/legacy/selectDataMemberPage");
var selectColumnsPage_1 = require("./pages/legacy/selectColumnsPage");
var addGroupingLevelPage_1 = require("./pages/legacy/addGroupingLevelPage");
var chooseSummaryOptionsPage_1 = require("./pages/legacy/chooseSummaryOptionsPage");
var chooseReportLayoutPage_1 = require("./pages/legacy/chooseReportLayoutPage");
var chooseReportStylePage_1 = require("./pages/legacy/chooseReportStylePage");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var reportWizardStateCreating_1 = require("./reportWizardStateCreating");
var LegacyReportWizard = (function (_super) {
    __extends(LegacyReportWizard, _super);
    function LegacyReportWizard(pageFactory, _reportWizardOptions) {
        var _this = _super.call(this, pageFactory, _reportWizardOptions.callbacks.finishCallback) || this;
        _this._reportWizardOptions = _reportWizardOptions;
        _this._requestModelType = _legacyReportRequestModel_1.LegacyReportRequestModel;
        _this.title = analytics_utils_1.getLocalization('Report Wizard', 'ASPxReportsStringId.ReportDesigner_Wizard_Header');
        return _this;
    }
    LegacyReportWizard.prototype._callBeforeFinishHandler = function (state, wizardModel) { };
    LegacyReportWizard.prototype._callAfterFinishHandler = function (state, result) {
        this.events.call('afterFinish', { state: state, wizardResult: result });
    };
    LegacyReportWizard.prototype.initialize = function (state) {
        var _this = this;
        if (state === void 0) { state = reportWizardStateCreating_1.createReportWizardState(); }
        _super.prototype.initialize.call(this, state, function (factory, stateManager) { return new LegacyReportWizardPageIterator(factory, stateManager, _this._reportWizardOptions); });
    };
    LegacyReportWizard.prototype.start = function (finishCallback) {
        if (finishCallback)
            this['_finishCallback'] = finishCallback;
        _super.prototype.start.call(this);
    };
    return LegacyReportWizard;
}(analytics_wizard_1.PopupWizard));
exports.LegacyReportWizard = LegacyReportWizard;
var LegacyReportWizardPageIterator = (function (_super) {
    __extends(LegacyReportWizardPageIterator, _super);
    function LegacyReportWizardPageIterator(pageFactory, stateManager, reportWizardOptions) {
        return _super.call(this, pageFactory, stateManager, reportWizardOptions) || this;
    }
    LegacyReportWizardPageIterator.prototype.getNextPageId = function (pageId) {
        if (!pageId)
            return pageId_1.ReportWizardPageId.SelectReportTypePage;
        if (pageId === pageId_1.ReportWizardPageId.SelectReportTypePage && this._getCurrentState().reportType === reportWizardState_1.ReportType.Label) {
            return pageId_1.ReportWizardPageId.SelectLabelTypePage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.SelectLabelTypePage) {
            return pageId_1.ReportWizardPageId.CustomizeLabelPage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.SelectReportTypePage && (this._getCurrentState().reportType === reportWizardState_1.ReportType.Databound)) {
            return pageId_1.ReportWizardPageId.ChooseAvailableDataSourcePage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.ChooseAvailableDataSourcePage && !this._getCurrentState().dataSource) {
            return analytics_wizard_1.SqlDataSourceWizardPageId.ChooseConnectionPage;
        }
        else if (_super.prototype.getNextPageId.call(this, pageId)) {
            return _super.prototype.getNextPageId.call(this, pageId);
        }
        else if (pageId === pageId_1.ReportWizardPageId.ChooseAvailableDataSourcePage && this._getCurrentState().dataSource) {
            return pageId_1.LegacyReportWizardPageId.ChooseDataMemberPage;
        }
        else if (pageId === analytics_wizard_1.DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage ||
            pageId === analytics_wizard_1.SqlDataSourceWizardPageId.MultiQueryConfigurePage ||
            pageId === analytics_wizard_1.SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage) {
            return pageId_1.LegacyReportWizardPageId.ChooseDataMemberPage;
        }
        else if (pageId === pageId_1.LegacyReportWizardPageId.ChooseDataMemberPage) {
            return pageId_1.LegacyReportWizardPageId.SelectColumnsPage;
        }
        else if (pageId === pageId_1.LegacyReportWizardPageId.SelectColumnsPage) {
            return pageId_1.LegacyReportWizardPageId.AddGroupingLevelPage;
        }
        else if (pageId === pageId_1.LegacyReportWizardPageId.AddGroupingLevelPage && this._getCurrentState().summaryOptionsColumns.length > 0) {
            return pageId_1.LegacyReportWizardPageId.ChooseSummaryOptionsPage;
        }
        else if (pageId === pageId_1.LegacyReportWizardPageId.ChooseSummaryOptionsPage || (pageId === pageId_1.LegacyReportWizardPageId.AddGroupingLevelPage && this._getCurrentState().summaryOptionsColumns.length == 0)) {
            return pageId_1.LegacyReportWizardPageId.ChooseReportLayoutPage;
        }
        else if (pageId === pageId_1.LegacyReportWizardPageId.ChooseReportLayoutPage) {
            return pageId_1.LegacyReportWizardPageId.ChooseReportStylePage;
        }
        else if (pageId === pageId_1.LegacyReportWizardPageId.ChooseReportStylePage) {
            return pageId_1.ReportWizardPageId.SetReportTitlePage;
        }
    };
    return LegacyReportWizardPageIterator;
}(analytics_wizard_1.MultiQueryDataSourceWizardPageIterator));
exports.LegacyReportWizardPageIterator = LegacyReportWizardPageIterator;
function _createLegacyReportWizard(reportWizardOptions) {
    var factory = new analytics_wizard_1.PageFactory();
    reportWizard_1._registerCommonReportWizardPages(factory, reportWizardOptions);
    chooseReportTypePage_1._registerSelectReportTypePage(factory, {
        showVertical: false,
        canCreateDatabound: function () {
            return reportWizardOptions.dataSources().length > 0 ||
                reportWizardOptions.connectionStrings.sql().length > 0;
        }
    });
    selectDataMemberPage_1._registerLegacyChooseDataMemberPage(factory, reportWizardOptions);
    selectColumnsPage_1._registerLegacySelectColumnsPage(factory, reportWizardOptions.callbacks.fieldListsCallback);
    addGroupingLevelPage_1._registerLegacyAddGroupingLevelPage(factory);
    chooseSummaryOptionsPage_1._registerLegacyChooseSummaryOptionsPage(factory);
    chooseReportLayoutPage_1._registerLegacyChooseReportLayoutPage(factory);
    chooseReportStylePage_1._registerLegacyChooseReportStylePage(factory);
    return new LegacyReportWizard(factory, reportWizardOptions);
}
exports._createLegacyReportWizard = _createLegacyReportWizard;
