﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\openReportDialog.js)
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
var reportDialogBase_1 = require("./reportDialogBase");
var reportStorageWeb_1 = require("../../services/reportStorageWeb");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var OpenReportDialogModelBase = (function () {
    function OpenReportDialogModelBase(popup, urls) {
        var _this = this;
        this.urls = urls;
        this.searchValue = ko.observable('');
        this.searchPlaceholder = function () { return analytics_internal_1.searchPlaceholder(); };
        this.reportUrl = ko.observable('');
        this.noDataText = analytics_internal_1.noDataText();
        var self = this;
        this.onDblClick = function (url) { return popup.open(url); };
        this.popupButtons = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: analytics_utils_1.getLocalization('Open', 'ASPxReportsStringId.SidePanel_Open'), disabled: popup.disabled, onClick: function () {
                        popup.open(self.reportUrl());
                    }
                }, disabled: ko.pureComputed(function () { return !_this.reportUrl(); })
            },
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: analytics_utils_1.getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), disabled: popup.disabled, onClick: function () {
                        popup.cancel();
                    }
                }
            }
        ];
    }
    OpenReportDialogModelBase.prototype.onShow = function (tab) {
        var self = this;
        this.searchValue('');
        reportStorageWeb_1.ReportStorageWeb.getUrls().done(function (result) { self.urls(result); });
    };
    OpenReportDialogModelBase.prototype.getUrl = function () {
        return this.reportUrl();
    };
    OpenReportDialogModelBase.prototype.setUrl = function (url) {
        this.reportUrl(url);
    };
    return OpenReportDialogModelBase;
}());
exports.OpenReportDialogModelBase = OpenReportDialogModelBase;
var OpenReportDialog = (function (_super) {
    __extends(OpenReportDialog, _super);
    function OpenReportDialog(subreports, navigateByReports, callbacks) {
        var _this = _super.call(this) || this;
        _this.title = 'Open Report';
        _this.onOpening = function (e) { callbacks.reportOpening && callbacks.reportOpening(e); };
        _this.onOpened = function (e) { callbacks.reportOpened && callbacks.reportOpened(e); };
        _this.navigateByReports = navigateByReports;
        _this.customize('dxrd-openreport-dialog-content', new OpenReportDialogModelBase(_this, subreports));
        _this.title = analytics_utils_1.getLocalization('Open Report', 'ReportStringId.RibbonXRDesign_OpenFile_STipTitle');
        return _this;
    }
    OpenReportDialog.prototype.open = function (url) {
        var _this = this;
        this.disabled(true);
        this.navigateByReports.addTab(null, ko.observable(url)).done(function (x) {
            _this.disabled(false);
            _this.visible(false);
        }).fail(function () { return _this.disabled(false); });
    };
    return OpenReportDialog;
}(reportDialogBase_1.ReportDialogBase));
exports.OpenReportDialog = OpenReportDialog;
