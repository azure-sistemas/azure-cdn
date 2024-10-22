﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\reportWizard.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var _masterDetailRequestModel_1 = require("./internal/_masterDetailRequestModel");
var _utils_1 = require("./internal/_utils");
var pageId_1 = require("./pageId");
var addGroupingLevelPage_1 = require("./pages/addGroupingLevelPage");
var chooseAvailableDataSourcePage_1 = require("./pages/chooseAvailableDataSourcePage");
var chooseReportTypePage_1 = require("./pages/chooseReportTypePage");
var chooseSummaryOptionsPage_1 = require("./pages/chooseSummaryOptionsPage");
var colorSchemePage_1 = require("./pages/colorSchemePage");
var configureReportPageSettingsPage_1 = require("./pages/configureReportPageSettingsPage");
var customizeLabelPage_1 = require("./pages/customizeLabelPage");
var chooseJsonSchemaPage_1 = require("./pages/dataSourceWizard/chooseJsonSchemaPage");
var configureMasterDetailRelationshipsPage_1 = require("./pages/dataSourceWizard/configureMasterDetailRelationshipsPage");
var multiQueryConfigurePage_1 = require("./pages/dataSourceWizard/multiQueryConfigurePage");
var multiQueryConfigureParametersPage_1 = require("./pages/dataSourceWizard/multiQueryConfigureParametersPage");
var selectDataMembersPage_1 = require("./pages/selectDataMembersPage");
var selectLabelTypePage_1 = require("./pages/selectLabelTypePage");
var setReportTitlePage_1 = require("./pages/setReportTitlePage");
var reportWizardState_1 = require("./reportWizardState");
var $ = require("jquery");
var reportWizardStateCreating_1 = require("./reportWizardStateCreating");
var ReportWizard = (function (_super) {
    __extends(ReportWizard, _super);
    function ReportWizard(pageFactory, _reportWizardOptions) {
        var _this = _super.call(this, pageFactory, _reportWizardOptions.callbacks.finishCallback) || this;
        _this._reportWizardOptions = _reportWizardOptions;
        _this._requestModelType = _masterDetailRequestModel_1.MasterDetailRequestModel;
        _this.title = analytics_utils_1.getLocalization('Report Wizard', 'ASPxReportsStringId.ReportDesigner_Wizard_Header');
        _this.height(_utils_1._masterDetailWizardHeight);
        _this.width(_utils_1._masterDetailWizardWidth);
        _this._extendCssClass = 'dxrd-report-wizard dxrd-master-detail-report-wizard';
        return _this;
    }
    ReportWizard.prototype._callBeforeFinishHandler = function (state, wizardModel) { };
    ReportWizard.prototype._callAfterFinishHandler = function (state, result) {
        this.events.call('afterFinish', { state: state, wizardResult: result });
    };
    ReportWizard.prototype.initialize = function (state) {
        var _this = this;
        if (state === void 0) { state = reportWizardStateCreating_1.createReportWizardState(); }
        if (this._reportWizardOptions.dataSources().length === 1 && !this._reportWizardOptions.canCreateDataSource) {
            state.dataSource = chooseAvailableDataSourcePage_1._convertToStateDataSource(this._reportWizardOptions.dataSources()[0]);
        }
        if (this._reportWizardOptions.sqlDataSourceAvailable || !analytics_internal_1.isEmptyObject(state.sqlDataSourceWizard)) {
            state.dataSourceType = analytics_wizard_1.DataSourceType.Sql;
        }
        else if (this._reportWizardOptions.jsonDataSourceAvailable || state.jsonDataSourceWizard.jsonSource) {
            state.dataSourceType = analytics_wizard_1.DataSourceType.Json;
        }
        else {
            state.dataSourceType = analytics_wizard_1.DataSourceType.NoData;
        }
        _super.prototype.initialize.call(this, state, function (pageFactory, stateManager) { return new ReportWizardPageIterator(pageFactory, stateManager, _this._reportWizardOptions); });
    };
    ReportWizard.prototype.start = function (finishCallback) {
        if (finishCallback)
            this['_finishCallback'] = finishCallback;
        _super.prototype.start.call(this);
    };
    return ReportWizard;
}(analytics_wizard_1.PopupWizard));
exports.ReportWizard = ReportWizard;
var ReportWizardPageIterator = (function (_super) {
    __extends(ReportWizardPageIterator, _super);
    function ReportWizardPageIterator(pagesFactory, stateManager, _reportWizardOptions) {
        var _this = _super.call(this, pagesFactory, stateManager, _reportWizardOptions) || this;
        _this._reportWizardOptions = _reportWizardOptions;
        return _this;
    }
    ReportWizardPageIterator.prototype.getNextPageId = function (pageId) {
        if (!pageId)
            return pageId_1.ReportWizardPageId.SelectReportTypePage;
        if (pageId === pageId_1.ReportWizardPageId.SelectReportTypePage && this._getCurrentState().reportType === reportWizardState_1.ReportType.Label) {
            return pageId_1.ReportWizardPageId.SelectLabelTypePage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.SelectLabelTypePage) {
            return pageId_1.ReportWizardPageId.CustomizeLabelPage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.SelectReportTypePage && this._getCurrentState().dataSource && !this._reportWizardOptions.canCreateDataSource) {
            return pageId_1.ReportWizardPageId.SelectDataMembersPage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.SelectReportTypePage && this._reportWizardOptions.dataSources().length === 0) {
            return _super.prototype.getNextPageId.call(this);
        }
        else if (pageId === pageId_1.ReportWizardPageId.SelectReportTypePage) {
            return pageId_1.ReportWizardPageId.ChooseAvailableDataSourcePage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.ChooseAvailableDataSourcePage && !this._getCurrentState().dataSource) {
            return _super.prototype.getNextPageId.call(this);
        }
        else if (_super.prototype.getNextPageId.call(this, pageId)) {
            return _super.prototype.getNextPageId.call(this, pageId);
        }
        else if (pageId === pageId_1.ReportWizardPageId.ChooseAvailableDataSourcePage && this._getCurrentState().dataSource) {
            return pageId_1.ReportWizardPageId.SelectDataMembersPage;
        }
        else if ((pageId === analytics_wizard_1.DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage ||
            pageId === analytics_wizard_1.SqlDataSourceWizardPageId.MultiQueryConfigurePage ||
            pageId === analytics_wizard_1.SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage ||
            pageId === analytics_wizard_1.JsonDataSourceWizardPageId.ChooseJsonSchemaPage)) {
            return pageId_1.ReportWizardPageId.SelectDataMembersPage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.SelectDataMembersPage && !$.isEmptyObject(this.stateManager.getCurrentState().masterDetailInfoCollection) && this.stateManager.getCurrentState().masterDetailInfoCollection.some(function (item) { return item.checked !== false; })) {
            return pageId_1.ReportWizardPageId.AddGroupingLevelPage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.AddGroupingLevelPage && !$.isEmptyObject(this._getCurrentState().masterDetailSummaryOptionsColumns)) {
            return pageId_1.ReportWizardPageId.ChooseSummaryOptionsPage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.AddGroupingLevelPage || pageId === pageId_1.ReportWizardPageId.ChooseSummaryOptionsPage) {
            return pageId_1.ReportWizardPageId.ConfigureReportPageSettingsPage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.ConfigureReportPageSettingsPage) {
            return pageId_1.ReportWizardPageId.ChooseReportColorSchemePage;
        }
        else if (pageId === pageId_1.ReportWizardPageId.ChooseReportColorSchemePage) {
            return pageId_1.ReportWizardPageId.SetReportTitlePage;
        }
    };
    return ReportWizardPageIterator;
}(analytics_wizard_1.MultiQueryDataSourceWizardPageIterator));
exports.ReportWizardPageIterator = ReportWizardPageIterator;
function _registerCommonReportWizardPages(factory, reportWizardOptions) {
    selectLabelTypePage_1._registerSelectLabelTypePage(factory);
    customizeLabelPage_1._registerCustomizeLabelPage(factory);
    chooseAvailableDataSourcePage_1._registerChooseAvailableDataSourcePage(factory, reportWizardOptions);
    setReportTitlePage_1._registerSetReportTitlePage(factory);
    analytics_wizard_1._registerMultiQueryDataSourcePages(factory, reportWizardOptions);
    chooseJsonSchemaPage_1._registerChooseJsonSchemaPage(factory, reportWizardOptions.callbacks);
    configureMasterDetailRelationshipsPage_1._registerConfigureMasterDetailRelationshipsPage(factory, reportWizardOptions.callbacks);
    multiQueryConfigurePage_1._registerMultiQueryConfigurePage(factory, reportWizardOptions);
    multiQueryConfigureParametersPage_1._registerMultiQueryConfigureParametersPage(factory, reportWizardOptions.callbacks);
}
exports._registerCommonReportWizardPages = _registerCommonReportWizardPages;
function _registerReportWizardPages(factory, reportWizardOptions) {
    _registerCommonReportWizardPages(factory, reportWizardOptions);
    chooseReportTypePage_1._registerSelectReportTypePage(factory, {
        showVertical: false,
        canCreateDatabound: function () {
            return reportWizardOptions.dataSources().length > 0 ||
                reportWizardOptions.connectionStrings.sql().length > 0 ||
                reportWizardOptions.connectionStrings.json().length > 0 ||
                (reportWizardOptions.allowCreateNewJsonConnection && reportWizardOptions.wizardSettings.enableJsonDataSource);
        }
    });
    selectDataMembersPage_1._registerSelectDataMembersPage(factory, reportWizardOptions);
    addGroupingLevelPage_1._registerAddGroupingLevelPage(factory);
    chooseSummaryOptionsPage_1._registerChooseSummaryOptionsPage(factory);
    configureReportPageSettingsPage_1._registerConfigureReportPageSettingsPage(factory);
    colorSchemePage_1._registerChooseReportColorSchemePage(factory);
}
exports._registerReportWizardPages = _registerReportWizardPages;
function _createReportWizard(reportWizardOptions) {
    var factory = new analytics_wizard_1.PageFactory();
    _registerReportWizardPages(factory, reportWizardOptions);
    return new ReportWizard(factory, reportWizardOptions);
}
exports._createReportWizard = _createReportWizard;
