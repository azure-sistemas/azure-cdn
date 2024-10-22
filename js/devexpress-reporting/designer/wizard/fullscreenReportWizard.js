﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\fullscreenReportWizard.js)
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
var chooseAvailableDataSourcePage_1 = require("./pages/chooseAvailableDataSourcePage");
var _masterDetailRequestModel_1 = require("./internal/_masterDetailRequestModel");
var pageId_1 = require("./pageId");
var chooseReportTypePage_1 = require("./pages/chooseReportTypePage");
var selectDataSourcePage_1 = require("./pages/fullscreen/selectDataSourcePage");
var specifySqlDataSourceSettingsPage_1 = require("./pages/fullscreen/specifySqlDataSourceSettingsPage");
var specifyJsonDataSourceSettingsPage_1 = require("./pages/fullscreen/specifyJsonDataSourceSettingsPage");
var specifyObjectDataSourceSettingsPage_1 = require("./pages/fullscreen/specifyObjectDataSourceSettingsPage");
var defineReportLayoutPage_1 = require("./pages/fullscreen/defineReportLayoutPage");
var specifyLabelSettingsPage_1 = require("./pages/fullscreen/specifyLabelSettingsPage");
var specifyPageSettingsPage_1 = require("./pages/fullscreen/specifyPageSettingsPage");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var ko = require("knockout");
var reportWizardStateCreating_1 = require("./reportWizardStateCreating");
var defineCrossTabPage_1 = require("./pages/fullscreen/defineCrossTabPage");
var FullscreenReportWizard = (function (_super) {
    __extends(FullscreenReportWizard, _super);
    function FullscreenReportWizard(pageFactory, _reportWizardOptions) {
        var _this = _super.call(this, pageFactory, _reportWizardOptions.callbacks.finishCallback) || this;
        _this._reportWizardOptions = _reportWizardOptions;
        _this._requestModelType = _masterDetailRequestModel_1.MasterDetailRequestModel;
        _this._availableDataSources = ko.observable([]);
        _this._extendCssClass = 'dxrd-master-detail-report-wizard ' + _this._extendCssClass;
        return _this;
    }
    FullscreenReportWizard.prototype._callBeforeFinishHandler = function (state, wizardModel) { };
    FullscreenReportWizard.prototype._callAfterFinishHandler = function (state, result) {
        this.events.call('afterFinish', { state: state, wizardResult: result });
    };
    FullscreenReportWizard.prototype._description = function () {
        return analytics_utils_1.getLocalization('Report Wizard', 'ASPxReportsStringId.ReportDesigner_Wizard_Header');
    };
    FullscreenReportWizard.prototype.initialize = function (state) {
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
        else if (this._reportWizardOptions.objectDataSourceAvailable || !analytics_internal_1.isEmptyObject(state.objectDataSourceWizard)) {
            state.dataSourceType = analytics_wizard_1.DataSourceType.Object;
        }
        else {
            state.dataSourceType = analytics_wizard_1.DataSourceType.NoData;
        }
        _super.prototype.initialize.call(this, state, function (factory, stateManager) { return new FullscreenReportWizardPageIterator(factory, stateManager, function (page) { return _this._onResetPage(page); }, _this._reportWizardOptions); });
    };
    return FullscreenReportWizard;
}(analytics_wizard_1.FullscreenWizard));
exports.FullscreenReportWizard = FullscreenReportWizard;
var FullscreenReportWizardPageIterator = (function (_super) {
    __extends(FullscreenReportWizardPageIterator, _super);
    function FullscreenReportWizardPageIterator(pagesFactory, stateManager, _onResetPage, _reportWizardOptions) {
        var _this = _super.call(this, pagesFactory, stateManager, _onResetPage) || this;
        _this._reportWizardOptions = _reportWizardOptions;
        return _this;
    }
    FullscreenReportWizardPageIterator.prototype.getNextPageId = function (pageId) {
        var _this = this;
        var getDefineLayoutPage = function () {
            return _this._getCurrentState().reportType === reportWizardState_1.ReportType.CrossTab ? pageId_1.FullscreenReportWizardPageId.DefineCrossTabPage : pageId_1.FullscreenReportWizardPageId.DefineReportLayoutPage;
        };
        if (!pageId)
            return pageId_1.FullscreenReportWizardPageId.SelectReportTypePage;
        if (pageId === pageId_1.FullscreenReportWizardPageId.SelectReportTypePage && this._getCurrentState().reportType === reportWizardState_1.ReportType.Label) {
            return pageId_1.FullscreenReportWizardPageId.SpecifyLabelSettingsPage;
        }
        else if (pageId === pageId_1.FullscreenReportWizardPageId.SelectReportTypePage && this._getCurrentState().dataSource && !this._reportWizardOptions.canCreateDataSource) {
            return getDefineLayoutPage();
        }
        else if (pageId === pageId_1.FullscreenReportWizardPageId.SelectReportTypePage) {
            return pageId_1.FullscreenReportWizardPageId.SelectDataSourcePage;
        }
        else if (pageId === pageId_1.FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSource) {
            return getDefineLayoutPage();
        }
        else if (pageId === pageId_1.FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === analytics_wizard_1.DataSourceType.Json) {
            return analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage;
        }
        else if (pageId === pageId_1.FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === analytics_wizard_1.DataSourceType.Sql) {
            return analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage;
        }
        else if (pageId === pageId_1.FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === analytics_wizard_1.DataSourceType.Object) {
            return analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifyObjectDataSourceSettingsPage;
        }
        else if (pageId === pageId_1.FullscreenReportWizardPageId.SelectDataSourcePage && this._getCurrentState().dataSourceType === analytics_wizard_1.DataSourceType.NoData) {
            return pageId_1.FullscreenReportWizardPageId.SpecifyPageSettingsPage;
        }
        else if (pageId === analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage) {
            return getDefineLayoutPage();
        }
        else if (pageId === analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage) {
            return getDefineLayoutPage();
        }
        else if (pageId === analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifyObjectDataSourceSettingsPage) {
            return getDefineLayoutPage();
        }
        else if (pageId === pageId_1.FullscreenReportWizardPageId.DefineReportLayoutPage || pageId === pageId_1.FullscreenReportWizardPageId.DefineCrossTabPage) {
            return pageId_1.FullscreenReportWizardPageId.SpecifyPageSettingsPage;
        }
    };
    return FullscreenReportWizardPageIterator;
}(analytics_wizard_1.PageIterator));
exports.FullscreenReportWizardPageIterator = FullscreenReportWizardPageIterator;
function _registerFullscreenReportWizardPages(factory, reportWizardOptions) {
    chooseReportTypePage_1._registerSelectReportTypePage(factory, {
        canCreateDatabound: function () {
            return reportWizardOptions.dataSources().length > 0 ||
                reportWizardOptions.connectionStrings.sql().length > 0 ||
                reportWizardOptions.connectionStrings.json().length > 0 ||
                reportWizardOptions.wizardSettings.enableObjectDataSource ||
                (reportWizardOptions.allowCreateNewJsonConnection && reportWizardOptions.wizardSettings.enableJsonDataSource);
        },
        showVertical: true
    });
    selectDataSourcePage_1._registerSelectDataSourcePage(factory, reportWizardOptions);
    specifySqlDataSourceSettingsPage_1._registerSpecifySqlDataSourceSettingsPage(factory, reportWizardOptions);
    specifyJsonDataSourceSettingsPage_1._registerSpecifyJsonDataSourceSettingsPage(factory, reportWizardOptions);
    specifyObjectDataSourceSettingsPage_1._registerSpecifyObjectDataSourceSettingsPage(factory, reportWizardOptions);
    defineReportLayoutPage_1._registerDefineReportLayoutPage(factory, reportWizardOptions);
    defineCrossTabPage_1._registerDefineCrossTabPage(factory, reportWizardOptions);
    specifyLabelSettingsPage_1._registerSpecifyLabelSettingsPage(factory, reportWizardOptions);
    specifyPageSettingsPage_1._registerSpecifyPageSettingsPage(factory, reportWizardOptions);
}
exports._registerFullscreenReportWizardPages = _registerFullscreenReportWizardPages;
function _createFullscreenReportWizard(reportWizardOptions) {
    var factory = new analytics_wizard_1.FullscreenWizardPageFactory();
    _registerFullscreenReportWizardPages(factory, reportWizardOptions);
    return new FullscreenReportWizard(factory, reportWizardOptions);
}
exports._createFullscreenReportWizard = _createFullscreenReportWizard;
