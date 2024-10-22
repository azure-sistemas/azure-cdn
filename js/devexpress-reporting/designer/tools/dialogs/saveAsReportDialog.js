﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\saveAsReportDialog.js)
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
var _settings_1 = require("../../internal/_settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var SaveAsReportDialogModelBase = (function () {
    function SaveAsReportDialogModelBase(popup, urls) {
        this.noDataText = analytics_internal_1.noDataText();
        this.reportNamePlaceholder = function () { return analytics_utils_1.getLocalization('Enter a report name to save...', 'ASPxReportsStringId.ReportDesigner_SaveAs_NamePlaceholder'); };
        this.urls = urls;
        this.reportUrl = ko.observable('');
        this.reportName = ko.observable('');
        this.onDblClick = function (url) { return popup.save(url); };
        var self = this;
        this.popupButtons = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: analytics_utils_1.getLocalization('Save', 'AnalyticsCoreStringId.MenuButtons_Save'), disabled: ko.computed(function () { return !self.reportName() || popup.disabled(); }), onClick: function () {
                        popup.save(self.reportName());
                    }
                }
            },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { disabled: popup.disabled, text: analytics_utils_1.getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), onClick: function () { popup.cancel(); } } }
        ];
    }
    SaveAsReportDialogModelBase.prototype.onShow = function (tab) {
        var _this = this;
        var self = this;
        reportStorageWeb_1.ReportStorageWeb.getUrls().done(function (result) { self.urls(result); });
        var displayName = (this.urls() || []).filter(function (item) { return item.Key === _this.reportUrl(); })[0];
        this.reportName(displayName && displayName['Value'] || tab.displayName());
    };
    SaveAsReportDialogModelBase.prototype.getUrl = function () {
        return this.reportUrl();
    };
    SaveAsReportDialogModelBase.prototype.setUrl = function (url) {
        this.reportUrl(url);
    };
    return SaveAsReportDialogModelBase;
}());
exports.SaveAsReportDialogModelBase = SaveAsReportDialogModelBase;
var SaveAsReportDialog = (function (_super) {
    __extends(SaveAsReportDialog, _super);
    function SaveAsReportDialog(subreports, callbacks) {
        var _this = _super.call(this) || this;
        _this.closeAfterSave = ko.observable(false);
        _this.title = 'Save Report';
        _this.onSaving = function (e) { callbacks.reportSaving && callbacks.reportSaving(e); };
        _this.onSaved = function (e) { callbacks.reportSaved && callbacks.reportSaved(e); };
        _this.template('dxrd-savereport-dialog-content');
        _this.customize('dxrd-savereport-dialog-content', new SaveAsReportDialogModelBase(_this, subreports));
        _this.title = analytics_utils_1.getLocalization('Save Report', 'ReportStringId.RibbonXRDesign_SaveFile_STipTitle');
        return _this;
    }
    SaveAsReportDialog.prototype.show = function (tab) {
        this.closeAfterSave(false);
        _super.prototype.show.call(this, tab);
    };
    SaveAsReportDialog.prototype.save = function (url) {
        var self = this;
        if (_settings_1.reportStorageWebIsRegister()) {
            self.tab().context().report.displayNameObject(url);
            var data = self.tab().context().report.serialize();
            var args = { report: self.tab().context().report, url: url, cancel: false, dialog: this };
            self.onSaving(args);
            if (args.cancel) {
                return;
            }
            self.disabled(true);
            reportStorageWeb_1.ReportStorageWeb.setNewData(data, url)
                .done(function (result) {
                self.onSaved({ report: self.tab().context().report, url: result });
                var url = result;
                self.tab().context().url(result);
                self.tab().isDirty(false);
                analytics_internal_1.ShowMessage(analytics_utils_1.getLocalization('The report has been successfully saved.', 'ASPxReportsStringId.ReportDesigner_SaveReport_Message_OK'), analytics_internal_1.NotifyType.success);
                if (self.closeAfterSave()) {
                    self.tab().close.resolve();
                }
                reportStorageWeb_1.ReportStorageWeb.getUrls().done(function (result) { self.model()['urls'] && self.model()['urls'](result); });
                self.disabled(false);
                self.visible(false);
            }).fail(function () {
                self.disabled(false);
            });
        }
        else {
            self.tab().context().report.save();
            if (self.closeAfterSave()) {
                self.tab().close.resolve();
            }
            else {
                self.tab().close && self.tab().close.reject();
            }
            this.visible(false);
        }
    };
    return SaveAsReportDialog;
}(reportDialogBase_1.ReportDialogBase));
exports.SaveAsReportDialog = SaveAsReportDialog;
