﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\reportUrlEditor.js)
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
var _settings_1 = require("../internal/_settings");
var reportStorageWeb_1 = require("../services/reportStorageWeb");
var ko = require("knockout");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var data_source_1 = require("devextreme/data/data_source");
var ReportUrlEditor = (function (_super) {
    __extends(ReportUrlEditor, _super);
    function ReportUrlEditor(info, level, parentDisabled, textToSearch) {
        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
    }
    ReportUrlEditor.prototype._initUrls = function (urls, tab) {
        if (!this.urls) {
            if (_settings_1.reportStorageWebIsRegister()) {
                this.urls = urls;
                this.updateUrls();
            }
            else {
                this.urls = ko.computed(function () {
                    return tab() ? (urls() || []).filter(function (x) { return x.Key !== tab().url(); }) : urls();
                });
                this._disposables.push(this.urls);
            }
        }
    };
    ReportUrlEditor.prototype.getValues = function (urls, tab) {
        var _this = this;
        if (!this.dataSource) {
            this._initUrls(urls, tab);
            this._disposables.push(this.dataSource = ko.computed(function () {
                var dataSource = new data_source_1.default({
                    store: _this.urls(),
                    paginate: true,
                    filter: function (url) { return url.Key !== tab().url(); },
                    pageSize: 100
                });
                return dataSource;
            }));
        }
        return this.dataSource;
    };
    ReportUrlEditor.prototype.updateUrls = function () {
        var _this = this;
        if (_settings_1.reportStorageWebIsRegister()) {
            reportStorageWeb_1.ReportStorageWeb.getUrls().done(function (result) { _this.urls(result); });
        }
    };
    return ReportUrlEditor;
}(analytics_widgets_1.Editor));
exports.ReportUrlEditor = ReportUrlEditor;
