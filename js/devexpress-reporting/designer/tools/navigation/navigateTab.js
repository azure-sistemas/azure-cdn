﻿/**
* DevExpress HTML/JS Reporting (designer\tools\navigation\navigateTab.js)
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
var reportStorageWeb_1 = require("../../services/reportStorageWeb");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var NavigateTab = (function (_super) {
    __extends(NavigateTab, _super);
    function NavigateTab(options) {
        var _this = _super.call(this) || this;
        _this._isReportLoading = options.isReportLoading;
        _this._callbacks = options.callbacks;
        _this.context = ko.observable(_this._callbacks.createContext(options.report, options.url));
        _this._disposables.push(_this.displayName = ko.computed(function () { return _this._generateDisplayName(_this.context().report); }));
        _this.undoEngine = new analytics_utils_1.UndoEngine(_this.context, ['surface', 'reportSource'], 'getInfo', ['objectStorage']);
        _this.isDirty = _this.undoEngine.isDirty;
        _this.isModified = _this.undoEngine.isDirty;
        _this._disposables.push(_this.report = _this._createReport());
        _this._disposables.push(_this.url = _this._createReportUrl());
        _this._callbacks.afterInititalize(_this);
        return _this;
    }
    NavigateTab.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.undoEngine['_callDisposeFunction'](this.context());
        this.context().dispose();
    };
    NavigateTab.prototype._generateDisplayName = function (model) {
        var name = model && (model.displayNameObject() || model.name());
        return name;
    };
    NavigateTab.prototype._createReport = function () {
        var _this = this;
        return ko.computed({
            read: function () { return _this.context().report; },
            write: function (newVal) { return _this.changeContext(newVal, _this.context().url()); }
        });
    };
    NavigateTab.prototype._createReportUrl = function () {
        var _this = this;
        return ko.computed({
            read: function () { return _this.context().url(); },
            write: function (newVal) { return _this.context().url(newVal); }
        });
    };
    NavigateTab.prototype.changeContext = function (report, reportUrl) {
        this.context(this._callbacks.createContext(report, reportUrl));
        this._isReportLoading(false);
    };
    NavigateTab.prototype.resetIsModified = function () {
        this.undoEngine.isDirty(false);
        this.undoEngine.clearHistory();
    };
    NavigateTab.prototype.refresh = function (resetState) {
        var _this = this;
        this._isReportLoading(true);
        reportStorageWeb_1.ReportStorageWeb.getReportByUrl((this.context().url())).done(function (result) {
            _this.report(result);
            if (resetState) {
                _this.resetIsModified();
            }
        });
    };
    return NavigateTab;
}(analytics_utils_1.Disposable));
exports.NavigateTab = NavigateTab;
