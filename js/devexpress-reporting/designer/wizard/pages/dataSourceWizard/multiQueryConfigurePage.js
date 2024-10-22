﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\multiQueryConfigurePage.js)
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
var _dataSourceWizardHelper_1 = require("./_dataSourceWizardHelper");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var MultiQueryConfigurePage = (function (_super) {
    __extends(MultiQueryConfigurePage, _super);
    function MultiQueryConfigurePage(reportWizardOptions) {
        var _this = _super.call(this, reportWizardOptions) || this;
        _this._dataSourceWizardHelper = new _dataSourceWizardHelper_1.DataSourceWizardHelper(_this, reportWizardOptions.callbacks.createSqlDataSourceInfo);
        return _this;
    }
    MultiQueryConfigurePage.prototype._getQueriesCount = function () {
        return this['_dataSource']().queries().length;
    };
    MultiQueryConfigurePage.prototype._canEditQueryParameters = function () {
        var _this = this;
        return this['_dataSource']().queries().some(function (query) { return analytics_wizard_1._canEditQueryParameters(query, _this['_customQueries']()); });
    };
    MultiQueryConfigurePage.prototype.initialize = function (state) {
        return _super.prototype.initialize.call(this, state.sqlDataSourceWizard);
    };
    MultiQueryConfigurePage.prototype.commit = function () {
        var _this = this;
        return this._dataSourceWizardHelper.commit(function () { return _super.prototype.commit.call(_this); }, function (state) { return analytics_wizard_1._restoreSqlDataSourceFromState(state).sqlDataSource; });
    };
    return MultiQueryConfigurePage;
}(analytics_wizard_1.MultiQueryConfigurePage));
exports.MultiQueryConfigurePage = MultiQueryConfigurePage;
function _registerMultiQueryConfigurePage(factory, reportWizardOptions) {
    _dataSourceWizardHelper_1.overrideSqlDataSourceWizardPage(factory, analytics_wizard_1.SqlDataSourceWizardPageId.MultiQueryConfigurePage, {
        create: function () {
            return new MultiQueryConfigurePage(reportWizardOptions);
        },
        resetState: function (state) {
            delete state.sqlDataSourceWizard.customQueries;
            delete state.sqlDataSourceWizard.sqlDataSourceJSON;
        }
    });
}
exports._registerMultiQueryConfigurePage = _registerMultiQueryConfigurePage;
