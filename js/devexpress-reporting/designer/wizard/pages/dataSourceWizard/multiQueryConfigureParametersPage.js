﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\multiQueryConfigureParametersPage.js)
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
var _qBRequestWrapper_1 = require("../../../tools/generator/_qBRequestWrapper");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var MultiQueryConfigureParametersPage = (function (_super) {
    __extends(MultiQueryConfigureParametersPage, _super);
    function MultiQueryConfigureParametersPage(createSqlDataSourceInfo, parametersConverters, requestWrapper) {
        var _this = _super.call(this, parametersConverters, requestWrapper) || this;
        _this.createSqlDataSourceInfo = createSqlDataSourceInfo;
        _this._dataSourceWizardHelper = new _dataSourceWizardHelper_1.DataSourceWizardHelper(_this, createSqlDataSourceInfo);
        return _this;
    }
    MultiQueryConfigureParametersPage.prototype.initialize = function (state) {
        return _super.prototype.initialize.call(this, state.sqlDataSourceWizard);
    };
    MultiQueryConfigureParametersPage.prototype.commit = function () {
        var _this = this;
        return this._dataSourceWizardHelper.commit(function () { return _super.prototype.commit.call(_this); }, function (state) { return analytics_wizard_1._restoreSqlDataSourceFromState(state).sqlDataSource; });
    };
    return MultiQueryConfigureParametersPage;
}(analytics_wizard_1.MultiQueryConfigureParametersPage));
exports.MultiQueryConfigureParametersPage = MultiQueryConfigureParametersPage;
function _registerMultiQueryConfigureParametersPage(factory, callbacks) {
    _dataSourceWizardHelper_1.overrideSqlDataSourceWizardPage(factory, analytics_wizard_1.SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage, {
        create: function () {
            return new MultiQueryConfigureParametersPage(callbacks.createSqlDataSourceInfo, undefined, _qBRequestWrapper_1.QBRequestWrapper);
        }
    });
}
exports._registerMultiQueryConfigureParametersPage = _registerMultiQueryConfigureParametersPage;
