﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyPageSettingsPage.js)
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
var configureReportPageSettingsAndColorSchemeSection_1 = require("../configureReportPageSettingsAndColorSchemeSection");
var pageId_1 = require("../../pageId");
var reportWizardState_1 = require("../../reportWizardState");
var configureReportPageSettingsPage_1 = require("../configureReportPageSettingsPage");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var SpecifyPageSettingsPage = (function (_super) {
    __extends(SpecifyPageSettingsPage, _super);
    function SpecifyPageSettingsPage(_reportWizardOptions) {
        var _this = _super.call(this) || this;
        _this._reportWizardOptions = _reportWizardOptions;
        return _this;
    }
    SpecifyPageSettingsPage.prototype.canNext = function () {
        return false;
    };
    SpecifyPageSettingsPage.prototype.canFinish = function () {
        return true;
    };
    SpecifyPageSettingsPage.prototype.registerSections = function () {
        configureReportPageSettingsAndColorSchemeSection_1._registerConfigureReportPageSettingsSection(this._factory);
        _registerSpecifyReportTitlePage(this._factory);
        var meta = this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.ConfigurePageSettingsPage);
        meta['recreate'] = false;
        meta.description = analytics_utils_1.getLocalization('Specify page settings and a report color scheme.', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyPageSettingsColorScheme');
        meta = this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.SpecifyReportTitlePage);
        meta['recreate'] = false;
        meta.description = analytics_utils_1.getLocalization('Specify the report title.', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyReportTitle');
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.ConfigurePageSettingsPage, this._reportWizardOptions.rtl ? analytics_wizard_1.WizardSectionPosition.Right : analytics_wizard_1.WizardSectionPosition.Left);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.SpecifyReportTitlePage, this._reportWizardOptions.rtl ? analytics_wizard_1.WizardSectionPosition.Left : analytics_wizard_1.WizardSectionPosition.Right);
    };
    SpecifyPageSettingsPage.prototype.getNextSectionId = function (sectionId) {
        if (!sectionId)
            return pageId_1.FullscreenReportWizardSectionId.ConfigurePageSettingsPage;
        else if (sectionId === pageId_1.FullscreenReportWizardSectionId.ConfigurePageSettingsPage)
            return pageId_1.FullscreenReportWizardSectionId.SpecifyReportTitlePage;
    };
    return SpecifyPageSettingsPage;
}(analytics_wizard_1.FullscreenWizardPage));
exports.SpecifyPageSettingsPage = SpecifyPageSettingsPage;
function _registerSpecifyPageSettingsPage(factory, reportWizardOptions) {
    factory.registerMetadata(pageId_1.FullscreenReportWizardPageId.SpecifyPageSettingsPage, {
        getState: function (state) {
            return state;
        },
        setState: function (data, state) {
            state.colorScheme.baseColor = data.colorScheme.baseColor;
            state.colorScheme.name = data.colorScheme.name;
            state.reportTitle = data.reportTitle;
            configureReportPageSettingsPage_1._applyPageSetting(data.pageSetup, state.pageSetup);
        },
        resetState: function (state, defaultState) {
            state.colorScheme.baseColor = defaultState.colorScheme.baseColor;
            state.colorScheme.name = defaultState.colorScheme.name;
            state.reportTitle = defaultState.reportTitle;
            configureReportPageSettingsPage_1._applyPageSetting(defaultState.pageSetup, state.pageSetup);
        },
        create: function () {
            return new SpecifyPageSettingsPage(reportWizardOptions);
        },
        template: 'dx-wizard-fullscreen-page',
        description: analytics_utils_1.getLocalization('Manage page and color settings.', 'TODO'),
        navigationPanelText: analytics_utils_1.getLocalization('Specify Page Settings', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyPageSettings')
    });
}
exports._registerSpecifyPageSettingsPage = _registerSpecifyPageSettingsPage;
var SpecifyReportTitlePage = (function (_super) {
    __extends(SpecifyReportTitlePage, _super);
    function SpecifyReportTitlePage() {
        var _this = _super.call(this) || this;
        _this._foreColor = ko.observable('white');
        _this._masterDetailInfo = ko.observableArray();
        _this.reportTitle = ko.observable('');
        _this._color = ko.observable('rgba( 75, 75, 75, 1)');
        _this._disposables.push(_this.reportTitle.subscribe(function () { return _this._onChange(); }));
        _this._disposables.push(_this._previewPageHelper = new configureReportPageSettingsPage_1.PreviewPageHelper());
        _this._previewPageHelper.updatePageSettings(reportWizardState_1.defaultPageSetupState);
        return _this;
    }
    SpecifyReportTitlePage.prototype._getBrightness = function (r, g, b) {
        r = r / 255.0;
        g = g / 255.0;
        b = b / 255.0;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        return (max + min) / 2;
    };
    SpecifyReportTitlePage.prototype._fillTables = function (info) {
        var _this = this;
        info.forEach(function (item) {
            var fields = item.fields.filter(function (x) { return x.checked; });
            if (fields.length > 0) {
                _this._masterDetailInfo.push({
                    fields: fields.slice(0, 4)
                });
            }
            if (item.relations.length > 0) {
                _this._fillTables(item.relations);
            }
        });
    };
    SpecifyReportTitlePage.prototype.initialize = function (state) {
        var deferred = $.Deferred();
        this._masterDetailInfo([]);
        if (state.colorScheme['baseColor']) {
            this._color(state.colorScheme['_color']);
            var color = state.colorScheme['baseColor'].split(',').map(function (x) { return parseInt(x); });
            this._foreColor(this._getBrightness(color[1], color[2], color[3]) > 0.6 ? 'black' : 'white');
        }
        this.reportTitle(state.reportTitle ? state.reportTitle : '');
        this._fillTables(state.masterDetailInfoCollection);
        this._reportTitleVisible = !!(state.dataSource || state.newDataSource);
        this._previewPageHelper.updatePageSettings(state.pageSetup);
        _super.prototype.initialize.call(this, state.pageSetup).done(function () {
            deferred.resolve();
        });
        return deferred.promise();
    };
    SpecifyReportTitlePage.prototype.commit = function () {
        var deferred = $.Deferred();
        deferred.resolve({
            reportTitle: this.reportTitle()
        });
        return deferred.promise();
    };
    SpecifyReportTitlePage.prototype._reportTitlePlaceholder = function () {
        return analytics_utils_1.getLocalization('Type title here...', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportTitle_Placeholder');
    };
    return SpecifyReportTitlePage;
}(analytics_wizard_1.WizardPageBase));
exports.SpecifyReportTitlePage = SpecifyReportTitlePage;
function _registerSpecifyReportTitlePage(factory) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.SetReportTitlePage, {
        create: function () { return new SpecifyReportTitlePage(); },
        getState: function (state) { return state; },
        setState: function (data, state) {
            state.reportTitle = data.reportTitle;
        },
        resetState: function (state, defaultState) {
            state.reportTitle = defaultState.reportTitle;
        },
        template: 'dxrd-page-pageSetup-preview',
        description: analytics_utils_1.getLocalization('Manage page and color settings.', 'TODO')
    });
}
exports._registerSpecifyReportTitlePage = _registerSpecifyReportTitlePage;
