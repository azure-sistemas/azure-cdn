﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyJsonDataSourceSettingsPage.js)
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
var chooseJsonSchemaPage_1 = require("../dataSourceWizard/chooseJsonSchemaPage");
var _utils_1 = require("../../internal/_utils");
var pageId_1 = require("../../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var SpecifyJsonDataSourceSettingsPage = (function (_super) {
    __extends(SpecifyJsonDataSourceSettingsPage, _super);
    function SpecifyJsonDataSourceSettingsPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecifyJsonDataSourceSettingsPage.prototype.registerSections = function () {
        _super.prototype.registerSections.call(this);
        chooseJsonSchemaPage_1._registerChooseJsonSchemaPage(this._factory, this['_dataSourceWizardOptions'].callbacks);
        var meta = this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.ChooseJsonSchemaPage);
        meta['disabledText'] = analytics_utils_1.getLocalization('To select data fields, choose or create a data connection.', 'AnalyticsCoreStringId.JsonDSWizard_ChooseJsonSchemaPage_Placeholder');
    };
    return SpecifyJsonDataSourceSettingsPage;
}(analytics_wizard_1.SpecifyJsonDataSourceSettingsPage));
exports.SpecifyJsonDataSourceSettingsPage = SpecifyJsonDataSourceSettingsPage;
function _registerSpecifyJsonDataSourceSettingsPage(factory, wizardOptions) {
    analytics_wizard_1._registerSpecifyJsonDataSourceSettingsPage(factory, wizardOptions);
    _utils_1.overrideFullscreenDataSourceWizardPageMetadata(factory, pageId_1.FullscreenReportWizardPageId.SpecifyJsonDataSourceSettingsPage, function () { return new SpecifyJsonDataSourceSettingsPage(wizardOptions); });
}
exports._registerSpecifyJsonDataSourceSettingsPage = _registerSpecifyJsonDataSourceSettingsPage;
