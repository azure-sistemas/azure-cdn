﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_designerErrorProvider.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var settings_1 = require("../../utils/settings");
var DesignerErrorProvider = (function (_super) {
    __extends(DesignerErrorProvider, _super);
    function DesignerErrorProvider(_report) {
        var _this = _super.call(this) || this;
        _this._report = _report;
        _this.errors = ko.observableArray([]);
        return _this;
    }
    DesignerErrorProvider.prototype.collectErrors = function () {
        var _this = this;
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getDesignErrors', JSON.stringify({
            'XtraReportsLayoutSerializer': this._report.serialize()
        })).done(function (result) {
            _this.errors(result);
        });
    };
    return DesignerErrorProvider;
}(analytics_utils_1.Disposable));
exports.DesignerErrorProvider = DesignerErrorProvider;
