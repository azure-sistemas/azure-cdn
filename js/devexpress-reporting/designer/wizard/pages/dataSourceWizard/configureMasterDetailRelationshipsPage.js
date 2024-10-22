﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\configureMasterDetailRelationshipsPage.js)
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
var ConfigureMasterDetailRelationshipsPage = (function (_super) {
    __extends(ConfigureMasterDetailRelationshipsPage, _super);
    function ConfigureMasterDetailRelationshipsPage(createSqlDataSourceInfo, sqlDataSourceResultSchema) {
        var _this = _super.call(this, sqlDataSourceResultSchema) || this;
        _this._dataSourceWizardHelper = new _dataSourceWizardHelper_1.DataSourceWizardHelper(_this, createSqlDataSourceInfo);
        return _this;
    }
    ConfigureMasterDetailRelationshipsPage.prototype.initialize = function (state) {
        return _super.prototype.initialize.call(this, state.sqlDataSourceWizard);
    };
    ConfigureMasterDetailRelationshipsPage.prototype.commit = function () {
        var _this = this;
        return this._dataSourceWizardHelper.commit(function () { return _super.prototype.commit.call(_this); }, function (state) { return analytics_wizard_1._restoreSqlDataSourceFromState(state).sqlDataSource; });
    };
    return ConfigureMasterDetailRelationshipsPage;
}(analytics_wizard_1.ConfigureMasterDetailRelationshipsPage));
exports.ConfigureMasterDetailRelationshipsPage = ConfigureMasterDetailRelationshipsPage;
function _registerConfigureMasterDetailRelationshipsPage(factory, callbacks) {
    _dataSourceWizardHelper_1.overrideSqlDataSourceWizardPage(factory, analytics_wizard_1.DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage, {
        create: function () {
            return new ConfigureMasterDetailRelationshipsPage(callbacks.createSqlDataSourceInfo, callbacks.sqlDataSourceResultSchema);
        }
    });
}
exports._registerConfigureMasterDetailRelationshipsPage = _registerConfigureMasterDetailRelationshipsPage;
