﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\configureReportPageSettingsAndColorSchemeSection.js)
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
var configureReportPageSettingsPage_1 = require("./configureReportPageSettingsPage");
var colorSchemePage_1 = require("./colorSchemePage");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var $ = require("jquery");
var ConfigurePageSettingsPage = (function (_super) {
    __extends(ConfigurePageSettingsPage, _super);
    function ConfigurePageSettingsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._configureReportPageSettingsPage = new configureReportPageSettingsPage_1.ConfigureReportPageSettingsPage();
        _this._colorSchemePage = new colorSchemePage_1.ChooseReportColorSchemePage();
        _this._colorSchemePageVisible = true;
        return _this;
    }
    ConfigurePageSettingsPage.prototype.dispose = function () {
        this._configureReportPageSettingsPage.dispose();
        this._colorSchemePage.dispose();
    };
    ConfigurePageSettingsPage.prototype.addColorScheme = function (name, color, position) {
        this._colorSchemePage.addColorScheme(name, color, position);
    };
    ConfigurePageSettingsPage.prototype.removeColorScheme = function () {
        var names = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            names[_i] = arguments[_i];
        }
        var _a;
        (_a = this._colorSchemePage).removeColorScheme.apply(_a, names);
    };
    ConfigurePageSettingsPage.prototype.removeAllColorSchemes = function () {
        this._colorSchemePage.removeAllColorSchemes();
    };
    ConfigurePageSettingsPage.prototype.setCustomColor = function (color) {
        this._colorSchemePage.setCustomColor(color);
    };
    ConfigurePageSettingsPage.prototype.onChange = function (callback) {
        this._colorSchemePage.onChange(callback);
        this._configureReportPageSettingsPage.onChange(callback);
    };
    ConfigurePageSettingsPage.prototype.canNext = function () {
        return this._colorSchemePage.canNext() && this._configureReportPageSettingsPage.canNext();
    };
    ConfigurePageSettingsPage.prototype.canFinish = function () {
        return this._colorSchemePage.canFinish() && this._configureReportPageSettingsPage.canFinish();
    };
    ConfigurePageSettingsPage.prototype.initialize = function (state) {
        this._colorSchemePageVisible = this._colorSchemePage._lookupData.scheme.length > 0 && !!(state.dataSource || state.newDataSource);
        return $.when.apply($, [
            this._configureReportPageSettingsPage.initialize(state.pageSetup),
            this._colorSchemePage.initialize(state.colorScheme)
        ]);
    };
    ConfigurePageSettingsPage.prototype.commit = function () {
        var _this = this;
        var deferred = $.Deferred();
        this._colorSchemePage.commit().done(function (colorResult) {
            _this._configureReportPageSettingsPage.commit().done(function (configureReportPageSettingsPageResult) {
                deferred.resolve({
                    pageSetup: configureReportPageSettingsPageResult,
                    colorScheme: colorResult
                });
            });
        });
        return deferred.promise();
    };
    return ConfigurePageSettingsPage;
}(analytics_wizard_1.WizardPageBase));
exports.ConfigurePageSettingsPage = ConfigurePageSettingsPage;
function _registerConfigureReportPageSettingsSection(factory) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.ConfigureReportPageSettingsPage, {
        create: function () { return new ConfigurePageSettingsPage(); },
        getState: function (state) { return state; },
        setState: function (data, state) {
            configureReportPageSettingsPage_1._applyPageSetting(data.pageSetup, state.pageSetup);
            colorSchemePage_1._applyColorSchemeState(data.colorScheme, state.colorScheme);
        },
        resetState: function (state, defaultState) {
            configureReportPageSettingsPage_1._applyPageSetting(defaultState.pageSetup, state.pageSetup);
            colorSchemePage_1._applyColorSchemeState(defaultState.colorScheme, state.colorScheme);
        },
        template: 'dxrd-page-pageSetupAndColorScheme',
        description: analytics_utils_1.getLocalization('Specify page settings and a report color scheme.', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyPageSettingsColorScheme')
    });
}
exports._registerConfigureReportPageSettingsSection = _registerConfigureReportPageSettingsSection;
