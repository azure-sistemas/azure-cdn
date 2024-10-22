﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\dataSourceWizard\chooseJsonSchemaPage.js)
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
var ChooseJsonSchemaPage = (function (_super) {
    __extends(ChooseJsonSchemaPage, _super);
    function ChooseJsonSchemaPage(createJsonDataSourceInfo) {
        var _this = _super.call(this) || this;
        _this._dataSourceWizardHelper = new _dataSourceWizardHelper_1.DataSourceWizardHelper(_this, createJsonDataSourceInfo);
        return _this;
    }
    ChooseJsonSchemaPage.prototype.initialize = function (state) {
        this._dataSourceId = state.dataSourceId;
        return _super.prototype.initialize.call(this, state.jsonDataSourceWizard);
    };
    ChooseJsonSchemaPage.prototype.commit = function () {
        var _this = this;
        return this._dataSourceWizardHelper.commit(function () { return _super.prototype.commit.call(_this); }, function (state) { return analytics_wizard_1._restoreJsonDataSourceFromState(state, undefined, _this._dataSourceId); });
    };
    return ChooseJsonSchemaPage;
}(analytics_wizard_1.ChooseJsonSchemaPage));
exports.ChooseJsonSchemaPage = ChooseJsonSchemaPage;
function _registerChooseJsonSchemaPage(factory, callbacks) {
    _dataSourceWizardHelper_1.overrideJsonDataSourceWizardPage(factory, analytics_wizard_1.JsonDataSourceWizardPageId.ChooseJsonSchemaPage, {
        create: function () {
            return new ChooseJsonSchemaPage(callbacks.createJsonDataSourceInfo);
        },
        resetState: function (state) {
            delete state.jsonDataSourceWizard.dataSourceName;
            delete state.jsonDataSourceWizard.jsonScheme;
            delete state.jsonDataSourceWizard.rootElement;
        }
    });
}
exports._registerChooseJsonSchemaPage = _registerChooseJsonSchemaPage;
