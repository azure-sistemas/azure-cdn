﻿/**
* DevExpress HTML/JS Reporting (designer\tools\navigation\navigateByReports.js)
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
var reportDesignerContext_1 = require("../generator/reportDesignerContext");
var navigateTab_1 = require("./navigateTab");
var _settings_1 = require("../../internal/_settings");
var reportStorageWeb_1 = require("../../services/reportStorageWeb");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var NavigateByReports = (function (_super) {
    __extends(NavigateByReports, _super);
    function NavigateByReports(options) {
        var _this = _super.call(this) || this;
        _this._isReportLoading = ko.observable(false);
        _this.save = function (tab) { return void 0; };
        _this.height = ko.observable(0);
        _this.tabs = ko.observableArray([]);
        _this._selectedIndex = ko.observable(-1);
        _this.selectedIndex = ko.computed({
            read: function () { return _this._selectedIndex(); },
            write: function (value) { if (value != -1)
                _this._selectedIndex(value); }
        });
        _this.allowMDI = options.allowMDI != undefined ? options.allowMDI : true;
        _this.knownEnums = options.knownEnums;
        _this._callbacks = options.callbacks || {};
        _this._selection = options.selection;
        _this._initializeOptions = options.initOptions;
        var currentTab = null;
        _this._disposables.push(_this.selectedIndex);
        _this._disposables.push(_this.currentTab = ko.pureComputed(function () {
            if (_this.selectedIndex() !== -1) {
                var oldValue = currentTab;
                currentTab = _this.tabs.peek()[_this.selectedIndex()];
                if (currentTab !== oldValue)
                    _this._isReportLoading(true);
                return currentTab;
            }
            else {
                return null;
            }
        }));
        if (options.report)
            _this.addTab(options.report, options.reportUrl || ko.observable(null));
        _this._disposables.push(_this.currentTab.subscribe(function (newVal) {
            setTimeout(function () {
                _this._isReportLoading(false);
                _this.height.notifySubscribers();
                _this.checkHeight();
                _this._callbacks.tabChanged && _this._callbacks.tabChanged(newVal);
            }, 1);
        }));
        return _this;
    }
    NavigateByReports.prototype._removeTab = function (tab) {
        var _this = this;
        var removingDeferred = $.Deferred();
        if (!this._callbacks.reportTabClosing || !this._callbacks.reportTabClosing(tab, removingDeferred)) {
            removingDeferred.resolve();
        }
        removingDeferred.done(function () {
            var currentIndex = _this._selectedIndex(), closingIndex = _this.tabs().indexOf(tab), newIndex = (currentIndex < closingIndex || currentIndex === closingIndex && currentIndex < _this.tabs().length - 1)
                ? currentIndex
                : currentIndex - 1;
            _this.tabs.remove(tab);
            _this._selectedIndex(newIndex);
            if (newIndex === currentIndex)
                _this.selectedIndex.notifySubscribers();
            _this._callbacks.reportTabClosed && _this._callbacks.reportTabClosed(tab);
            tab.dispose();
        });
        return removingDeferred.promise();
    };
    NavigateByReports.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._selectedIndex(-1);
        this.disposeObservableArray(this.tabs);
        this.resetObservableArray(this.tabs);
    };
    NavigateByReports.prototype._closeTab = function (deletedTab) {
        var closingDeferred = $.Deferred();
        deletedTab.close = closingDeferred;
        if (deletedTab.isDirty()) {
            this.save(deletedTab);
        }
        else {
            closingDeferred.resolve();
        }
        return closingDeferred.promise();
    };
    NavigateByReports.prototype._closeAll = function (deferred) {
        var _this = this;
        if (this.tabs().length === 0) {
            deferred.resolve();
            return;
        }
        var tab = this.tabs()[this.tabs().length - 1];
        this._closeTab(tab).done(function () {
            _this._removeTab(tab)
                .done(function () { return _this._closeAll(deferred); })
                .fail(function () { return deferred.reject(); });
        });
    };
    NavigateByReports.prototype._getTabByControl = function (report, reportUrl) {
        return this.tabs().filter(function (tab) { return reportUrl ? tab.context().url() === reportUrl : tab.context().report === report; })[0];
    };
    NavigateByReports.prototype._addTab = function (report, url) {
        var _this = this;
        var newTab = new navigateTab_1.NavigateTab({
            report: report,
            url: url,
            isReportLoading: this._isReportLoading,
            callbacks: {
                afterInititalize: function (tab) {
                    tab._disposables.push(tab.displayName.subscribe(function () { return _this.checkHeight(); }));
                    tab.icon = !_this.allowMDI && _this.tabs().length === 0 ? undefined : 'dx-icon-close';
                    if (!tab.displayName()) {
                        tab.context().report.name(analytics_internal_1.getUniqueName(_this.tabs().map(function (t) { return t.displayName(); }), 'Report'));
                        tab.undoEngine.clearHistory();
                    }
                    tab._disposables.push(tab.context.subscribe(function (newVal) { return _this.height.notifySubscribers(); }));
                },
                createContext: function (report, url) {
                    return new reportDesignerContext_1.ReportDesignerContext({
                        report: report,
                        selection: _this._selection,
                        designerCallbacks: _this._callbacks,
                        knownEnums: _this.knownEnums,
                        initializeOptions: _this._initializeOptions,
                        url: url
                    });
                }
            }
        });
        this.tabs.push(newTab);
        this.switch(newTab);
        newTab.undoEngine.clearHistory();
    };
    NavigateByReports.prototype.changeContext = function (report, reportUrl) {
        if (!this.currentTab())
            this.addTab(report, reportUrl);
        else {
            this.currentTab().changeContext(report, ko.unwrap(reportUrl || this.currentTab().url));
        }
    };
    NavigateByReports.prototype.init = function (isLoading) {
        this._isReportLoading = isLoading;
    };
    NavigateByReports.prototype.removeTab = function (tab, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (force)
            return this._removeTab(tab);
        this._closeTab(tab).done(function () {
            _this._removeTab(tab);
        });
    };
    NavigateByReports.prototype.closeAll = function () {
        var deferred = $.Deferred();
        this._closeAll(deferred);
        return deferred.promise();
    };
    NavigateByReports.prototype.switch = function (tab) {
        this._selectedIndex(this.tabs().indexOf(tab));
    };
    NavigateByReports.prototype._createNewTab = function (report, url) {
        if (url === void 0) { url = ko.observable(''); }
        this._addTab(report, url);
        var onOpened = this._callbacks.reportOpened;
        onOpened && setTimeout(function () {
            onOpened && onOpened({ report: report, url: ko.unwrap(url) });
        }, 10);
    };
    NavigateByReports.prototype.goToSubreport = function (subreportSurface) {
        if (_settings_1.reportStorageWebIsRegister()) {
            var subreportControl = subreportSurface.getControlModel();
            var currentReport = null;
            if (!subreportControl.reportSourceUrl())
                currentReport = subreportControl.cloneReportSource();
            this.addTab(currentReport, subreportControl.reportSourceUrl);
        }
    };
    NavigateByReports.prototype.addTab = function (report, url, onCancel) {
        var _this = this;
        if (url === void 0) { url = ko.observable(''); }
        if (onCancel === void 0) { onCancel = function () { return void 0; }; }
        var $deferred = $.Deferred();
        var tab = this._getTabByControl(report, url());
        if (!tab) {
            if ((function (args) { return void (_this._callbacks.reportOpening && _this._callbacks.reportOpening(args)) || args; })({ url: url(), cancel: false }).cancel) {
                onCancel();
                return $deferred.reject().promise();
            }
            if (url() && !report) {
                reportStorageWeb_1.ReportStorageWeb.getReportByUrl(url()).done(function (result) {
                    $deferred.resolve();
                    _this._createNewTab(result, url);
                }).fail(function () { return $deferred.reject(); });
            }
            else {
                $deferred.resolve();
                this._createNewTab(report, url);
            }
        }
        else {
            $deferred.resolve();
            this.switch(tab);
        }
        return $deferred.promise();
    };
    NavigateByReports.prototype.checkHeight = function () {
        var currentHeight = $('.dxrd-navigation-panel-wrapper').outerHeight();
        if (this.height() !== currentHeight) {
            this.height(currentHeight);
        }
    };
    return NavigateByReports;
}(analytics_utils_1.Disposable));
exports.NavigateByReports = NavigateByReports;
