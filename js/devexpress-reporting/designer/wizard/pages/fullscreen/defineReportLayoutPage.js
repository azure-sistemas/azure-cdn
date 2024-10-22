﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\defineReportLayoutPage.js)
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
var selectDataMembersPage_1 = require("../selectDataMembersPage");
var pageId_1 = require("../../pageId");
var addGroupingLevelSection_1 = require("../addGroupingLevelSection");
var chooseSummaryOptionsSection_1 = require("../chooseSummaryOptionsSection");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
var $ = require("jquery");
var DefineReportLayoutPage = (function (_super) {
    __extends(DefineReportLayoutPage, _super);
    function DefineReportLayoutPage(_reportWizardOptions) {
        var _this = _super.call(this) || this;
        _this._reportWizardOptions = _reportWizardOptions;
        return _this;
    }
    DefineReportLayoutPage.prototype.registerSections = function () {
        selectDataMembersPage_1._registerSelectDataMembersPage(this._factory, this._reportWizardOptions, pageId_1.FullscreenReportWizardSectionId.SelectDataMembersPage_Members);
        addGroupingLevelSection_1._registerAddGroupFieldsPage(this._factory);
        chooseSummaryOptionsSection_1._registerAddSummaryFieldsPage(this._factory);
        var meta = this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.SelectDataMembersPage_Members);
        meta['disabledText'] = analytics_utils_1.getLocalization('Loading...', 'AnalyticsCoreStringId.Loading');
        meta.description = analytics_utils_1.getLocalization('Select queries for the report and its detail reports.', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SelectQueries');
        var meta = this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.AddGroupFieldsPage);
        meta.description = analytics_utils_1.getLocalization('Add group fields.', 'ASPxReportsStringId.ReportDesigner_Wizard_AddGroupFields');
        var meta = this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.AddSummaryFieldsPage);
        meta.description = analytics_utils_1.getLocalization('Add summary fields.', 'ASPxReportsStringId.ReportDesigner_Wizard_AddSummaryFields');
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.SelectDataMembersPage_Members, analytics_wizard_1.WizardSectionPosition.Top);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.AddGroupFieldsPage, this._reportWizardOptions.rtl ? analytics_wizard_1.WizardSectionPosition.BottomRight : analytics_wizard_1.WizardSectionPosition.BottomLeft);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.AddSummaryFieldsPage, this._reportWizardOptions.rtl ? analytics_wizard_1.WizardSectionPosition.BottomLeft : analytics_wizard_1.WizardSectionPosition.BottomRight);
    };
    DefineReportLayoutPage.prototype._beforeStart = function () {
        this._sections[0].metadata.template = 'dxrd-page-masterdetail-select-dataMembers';
        var cachedItem = new analytics_wizard_internal_1.WizardPageSection(pageId_1.FullscreenReportWizardSectionId.SelectDataMembersPage_Fields, $.extend(true, {}, this._sections[0].metadata, {
            template: 'dxrd-page-masterdetail-select-fieldMembers',
            description: analytics_utils_1.getLocalization('Select data fields to display in the report.', 'ASPxReportsStringId.ReportDesigner_MasterDetailWizard_SelectDataFields'),
            disabledText: analytics_utils_1.getLocalization('Loading...', 'AnalyticsCoreStringId.Loading')
        }));
        cachedItem.page = this._sections[0].page;
        this._sections.splice(1, 0, cachedItem);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.SelectDataMembersPage_Members, this._reportWizardOptions.rtl ? analytics_wizard_1.WizardSectionPosition.TopRight : analytics_wizard_1.WizardSectionPosition.TopLeft);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.SelectDataMembersPage_Fields, this._reportWizardOptions.rtl ? analytics_wizard_1.WizardSectionPosition.TopLeft : analytics_wizard_1.WizardSectionPosition.TopRight);
    };
    DefineReportLayoutPage.prototype.getNextSectionId = function (sectionId) {
        if (!sectionId)
            return pageId_1.FullscreenReportWizardSectionId.SelectDataMembersPage_Members;
        else if (sectionId === pageId_1.FullscreenReportWizardSectionId.SelectDataMembersPage_Members && !$.isEmptyObject(this._stateManager.getCurrentState().masterDetailInfoCollection) && this._stateManager.getCurrentState().masterDetailInfoCollection.some(function (item) { return item.checked !== false; })) {
            return pageId_1.FullscreenReportWizardSectionId.AddGroupFieldsPage;
        }
        else if (sectionId === pageId_1.FullscreenReportWizardSectionId.AddGroupFieldsPage && !$.isEmptyObject(this._stateManager.getCurrentState().masterDetailSummaryOptionsColumns)) {
            return pageId_1.FullscreenReportWizardSectionId.AddSummaryFieldsPage;
        }
    };
    return DefineReportLayoutPage;
}(analytics_wizard_1.FullscreenWizardPage));
exports.DefineReportLayoutPage = DefineReportLayoutPage;
function _registerDefineReportLayoutPage(factory, reportWizardOptions) {
    factory.registerMetadata(pageId_1.FullscreenReportWizardPageId.DefineReportLayoutPage, {
        create: function () {
            return new DefineReportLayoutPage(reportWizardOptions);
        },
        getState: function (state) { return state; },
        setState: function (data, state) {
            state.masterDetailInfoCollection = data.masterDetailInfoCollection;
            state.masterDetailGroups = data.masterDetailGroups;
            state.masterDetailSummaryOptionsColumns = data.masterDetailSummaryOptionsColumns;
            state.masterDetailSummariesInfo = data.masterDetailSummariesInfo;
            state.ignoreNullValuesForSummary = data.ignoreNullValuesForSummary;
        },
        resetState: function (state, defaultState) {
            state.masterDetailInfoCollection = defaultState.masterDetailInfoCollection;
            state.masterDetailGroups = defaultState.masterDetailGroups;
            state.masterDetailSummaryOptionsColumns = defaultState.masterDetailSummaryOptionsColumns;
            state.masterDetailSummariesInfo = defaultState.masterDetailSummariesInfo;
            state.ignoreNullValuesForSummary = defaultState.ignoreNullValuesForSummary;
        },
        navigationPanelText: analytics_utils_1.getLocalization('Define Report Layout', 'ASPxReportsStringId.ReportDesigner_Wizard_DefineReportLayout'),
        template: 'dx-wizard-fullscreen-page'
    });
}
exports._registerDefineReportLayoutPage = _registerDefineReportLayoutPage;
