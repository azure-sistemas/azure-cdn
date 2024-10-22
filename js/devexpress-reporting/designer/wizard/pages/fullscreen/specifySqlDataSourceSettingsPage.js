﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifySqlDataSourceSettingsPage.js)
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
var pageId_1 = require("../../pageId");
var _utils_1 = require("../../internal/_utils");
var chooseAvailableDataSourcePage_1 = require("../chooseAvailableDataSourcePage");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var $ = require("jquery");
var objectItemCreation_1 = require("../../../dataObjects/objectItemCreation");
var SpecifySqlDataSourceSettingsPage = (function (_super) {
    __extends(SpecifySqlDataSourceSettingsPage, _super);
    function SpecifySqlDataSourceSettingsPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpecifySqlDataSourceSettingsPage.prototype.registerSections = function () {
        _super.prototype.registerSections.call(this);
        [
            this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.ConfigureMasterDetailRelationshipsPage),
            this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.ConfigureQueryParametersPage)
        ].forEach(function (meta) {
            meta.canFinish = function () { return false; };
            meta.canNext = function (page) { return page.canNext() || page.canFinish(); };
        });
    };
    SpecifySqlDataSourceSettingsPage.prototype.commit = function () {
        var _this = this;
        var deferred = $.Deferred();
        _super.prototype.commit.call(this).done(function (commitResult) {
            var dataSourcePromise = _this['_dataSourceWizardOptions'].callbacks.createSqlDataSourceInfo(analytics_wizard_1._restoreSqlDataSourceFromState(commitResult.sqlDataSourceWizard, undefined, commitResult.dataSourceId).sqlDataSource);
            dataSourcePromise.done(function (result) {
                result.data = objectItemCreation_1.createNewObjectItem(result.data);
                deferred.resolve({
                    sqlDataSourceWizard: commitResult,
                    newDataSource: chooseAvailableDataSourcePage_1._convertToStateDataSource(result)
                });
            }).fail(deferred.reject);
        });
        return deferred.promise();
    };
    return SpecifySqlDataSourceSettingsPage;
}(analytics_wizard_1.SpecifySqlDataSourceSettingsPage));
exports.SpecifySqlDataSourceSettingsPage = SpecifySqlDataSourceSettingsPage;
function _registerSpecifySqlDataSourceSettingsPage(factory, wizardOptions) {
    analytics_wizard_1._registerSpecifySqlDataSourceSettingsPage(factory, wizardOptions);
    _utils_1.overrideFullscreenDataSourceWizardPageMetadata(factory, analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage, function () { return new SpecifySqlDataSourceSettingsPage(wizardOptions); });
}
exports._registerSpecifySqlDataSourceSettingsPage = _registerSpecifySqlDataSourceSettingsPage;
