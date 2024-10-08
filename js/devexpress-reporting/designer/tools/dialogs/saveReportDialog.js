﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\saveReportDialog.js)
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
var _settings_1 = require("../../internal/_settings");
var reportStorageWeb_1 = require("../../services/reportStorageWeb");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var SaveReportDialogModelBase = (function () {
    function SaveReportDialogModelBase(popup) {
        this.reportUrl = ko.observable('');
        this.saveText = ko.observable('');
        var self = this;
        this.popupButtons = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    disabled: popup.disabled,
                    text: analytics_utils_1.getLocalization('Yes', 'AnalyticsCoreStringId.ParametersPanel_True'), onClick: function () {
                        popup.save(self.reportUrl());
                    }
                }
            },
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', disabled: popup.disabled, options: {
                    disabled: popup.disabled,
                    text: analytics_utils_1.getLocalization('No', 'AnalyticsCoreStringId.ParametersPanel_False'), onClick: function () {
                        popup.notSave();
                    }
                }
            },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { disabled: popup.disabled, text: analytics_utils_1.getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), onClick: function () { popup.cancel(); } } }
        ];
    }
    SaveReportDialogModelBase.prototype.onShow = function (tab) {
        this.saveText(analytics_utils_1.getLocalization('"{0}" has been changed. Do you want to save changes ?', 'ReportStringId.UD_Msg_MdiReportChanged').replace('{0}', tab.displayName()));
    };
    SaveReportDialogModelBase.prototype.getUrl = function () {
        return this.reportUrl();
    };
    SaveReportDialogModelBase.prototype.setUrl = function (url) {
        this.reportUrl(url);
    };
    return SaveReportDialogModelBase;
}());
exports.SaveReportDialogModelBase = SaveReportDialogModelBase;
var SaveReportDialog = (function (_super) {
    __extends(SaveReportDialog, _super);
    function SaveReportDialog(saveReportDialog, callbacks) {
        var _this = _super.call(this) || this;
        _this.title = 'Save Report';
        _this.saveReportDialog = saveReportDialog;
        _this.onSaving = function (e) { callbacks.reportSaving && callbacks.reportSaving(e); };
        _this.onSaved = function (e) { callbacks.reportSaved && callbacks.reportSaved(e); };
        _this.width('auto');
        _this.height(260);
        _this.customize('dxrd-savereport-dialog-content-light', new SaveReportDialogModelBase(_this));
        _this.title = analytics_utils_1.getLocalization('Save Report', 'ReportStringId.RibbonXRDesign_SaveFile_STipTitle');
        return _this;
    }
    SaveReportDialog.prototype.save = function (url) {
        var self = this;
        if (_settings_1.reportStorageWebIsRegister()) {
            if (url) {
                var args = { report: self.tab().context().report, url: url, cancel: false };
                self.onSaving(args);
                if (args.cancel) {
                    self.tab().close && self.tab().close.reject();
                    return;
                }
                this.disabled(true);
                reportStorageWeb_1.ReportStorageWeb.setData(self.tab().context().report.serialize(), url)
                    .done(function (jsonResult) {
                    self.onSaved({ report: self.tab().context().report, url: url });
                    self.tab().undoEngine.clearHistory();
                    self.tab().close && self.tab().close.resolve();
                    self.disabled(false);
                    self.visible(false);
                }).fail(function () {
                    self.disabled(false);
                });
            }
            else {
                self.saveReportDialog.show(self.tab());
                self.saveReportDialog.closeAfterSave(true);
                self.visible(false);
            }
        }
        else {
            self.tab().context().report.save();
            self.tab().close && self.tab().close.resolve();
        }
    };
    SaveReportDialog.prototype.notSave = function () {
        this.tab().close.resolve();
        this.visible(false);
    };
    SaveReportDialog.prototype.cancel = function () {
        this.tab().close && this.tab().close.reject();
        _super.prototype.cancel.call(this);
    };
    return SaveReportDialog;
}(reportDialogBase_1.ReportDialogBase));
exports.SaveReportDialog = SaveReportDialog;
