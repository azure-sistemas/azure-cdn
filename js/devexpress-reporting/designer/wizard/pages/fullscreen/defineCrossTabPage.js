﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\defineCrossTabPage.js)
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
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var fields_1 = require("../../../controls/metadata/crosstab/fields");
var pageId_1 = require("../../pageId");
var defineReportLayoutPage_1 = require("./defineReportLayoutPage");
var configureCrossTabPage_1 = require("./configureCrossTabPage");
var DefineCrossTabPage = (function (_super) {
    __extends(DefineCrossTabPage, _super);
    function DefineCrossTabPage(_reportWizardOptions) {
        var _this = _super.call(this) || this;
        _this._reportWizardOptions = _reportWizardOptions;
        _this._className = 'dxrd-wizard-section-crosstab';
        return _this;
    }
    DefineCrossTabPage.prototype._showPageDescription = function () {
        return false;
    };
    DefineCrossTabPage.prototype.canNext = function () {
        return true;
    };
    DefineCrossTabPage.prototype.registerSections = function () {
        _registerSelectSingleDataMemberPage(this._factory, this._reportWizardOptions);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.SelectSingleDataMemberPage, analytics_wizard_1.WizardSectionPosition.TopLeft);
        configureCrossTabPage_1._registerConfigureCrossTabPage(this._factory, pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabColumnsPage, 'Columns', 'ReportStringId.CrossTab_ColumnAreaName', fields_1.sortOrderdefaultValAscending);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabColumnsPage, analytics_wizard_1.WizardSectionPosition.TopRight);
        configureCrossTabPage_1._registerConfigureCrossTabPage(this._factory, pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabRowsPage, 'Rows', 'ReportStringId.CrossTab_RowAreaName', fields_1.sortOrderdefaultValAscending);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabRowsPage, analytics_wizard_1.WizardSectionPosition.BottomLeft);
        configureCrossTabPage_1._registerConfigureCrossTabPage(this._factory, pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabDataPage, 'Data', 'ReportStringId.CrossTab_DataAreaName', fields_1.crossTabSummaryType);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabDataPage, analytics_wizard_1.WizardSectionPosition.BottomRight);
    };
    DefineCrossTabPage.prototype.getNextSectionId = function (sectionId) {
        if (!sectionId)
            return pageId_1.FullscreenReportWizardSectionId.SelectSingleDataMemberPage;
        else if (sectionId === pageId_1.FullscreenReportWizardSectionId.SelectSingleDataMemberPage) {
            return pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabColumnsPage;
        }
        else if (sectionId === pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabColumnsPage) {
            return pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabRowsPage;
        }
        else if (sectionId === pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabRowsPage) {
            return pageId_1.FullscreenReportWizardSectionId.ConfigureCrossTabDataPage;
        }
    };
    DefineCrossTabPage.prototype.commit = function () {
        var result = {};
        this._sections.forEach(function (section) {
            if (section && section.page().page instanceof configureCrossTabPage_1.ConfigureCrossTabPage) {
                var page = section.page().page;
                result[page.stateName] = page.fieldInfos().filter(function (x) { return x.field(); }).map(function (x) {
                    var info = {
                        name: x.field().name, displayName: x.field().displayName
                    };
                    info[page.itemInfo.propertyName] = x.functionValue().value;
                    return info;
                });
            }
        });
        var defferer = $.Deferred();
        _super.prototype.commit.call(this).done(function (sectionsResult) {
            defferer.resolve(analytics_internal_1.extend(sectionsResult, result));
        });
        return defferer.promise();
    };
    return DefineCrossTabPage;
}(analytics_wizard_1.FullscreenWizardPage));
exports.DefineCrossTabPage = DefineCrossTabPage;
function _registerSelectSingleDataMemberPage(factory, reportWizardOptions) {
    factory.registerMetadata(pageId_1.FullscreenReportWizardSectionId.SelectSingleDataMemberPage, {
        create: function () {
            return new configureCrossTabPage_1.SelectCrossTabDataMember(reportWizardOptions.callbacks.fieldListsCallback, reportWizardOptions.hideDataMemberSubItems);
        },
        template: 'dxrd-page-crosstab-dataMembers',
        getState: function (state) { return state; },
        setState: function (data, state) {
            state.crossTabFields = data.crossTabFields;
            state.dataMemberPath = data.dataMemberPath;
            state.dataMemberInfo = data.dataMemberInfo;
        },
        resetState: function (state, defaultState) {
            state.crossTabFields = defaultState.crossTabFields;
            state.dataMemberPath = defaultState.dataMemberPath;
            state.dataMemberInfo = defaultState.dataMemberInfo;
        }
    });
}
exports._registerSelectSingleDataMemberPage = _registerSelectSingleDataMemberPage;
function _registerDefineCrossTabPage(factory, reportWizardOptions) {
    defineReportLayoutPage_1._registerDefineReportLayoutPage(factory, reportWizardOptions);
    var meta = factory.getMetadata(pageId_1.FullscreenReportWizardPageId.DefineReportLayoutPage);
    var newMeta = analytics_internal_1.extend({}, meta, {
        create: function () {
            return new DefineCrossTabPage(reportWizardOptions);
        },
        setState: function (data, state) {
            state.crossTabFields = data.crossTabFields;
            state.dataMemberPath = data.dataMemberPath;
            state.dataMemberInfo = data.dataMemberInfo;
            state.crossTabColumnsFieldInfo = data.crossTabColumnsFieldInfo;
            state.crossTabRowsFieldInfo = data.crossTabRowsFieldInfo;
            state.crossTabDataFieldInfo = data.crossTabDataFieldInfo;
        },
        resetState: function (state, defaultState) {
            state.crossTabFields = defaultState.crossTabFields;
            state.dataMemberPath = defaultState.dataMemberPath;
            state.dataMemberInfo = defaultState.dataMemberInfo;
            state.crossTabColumnsFieldInfo = defaultState.crossTabColumnsFieldInfo;
            state.crossTabRowsFieldInfo = defaultState.crossTabRowsFieldInfo;
            state.crossTabDataFieldInfo = defaultState.crossTabDataFieldInfo;
        }
    });
    factory.registerMetadata(pageId_1.FullscreenReportWizardPageId.DefineCrossTabPage, newMeta);
}
exports._registerDefineCrossTabPage = _registerDefineCrossTabPage;
