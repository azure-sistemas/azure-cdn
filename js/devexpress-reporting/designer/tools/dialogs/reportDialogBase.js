﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\reportDialogBase.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ReportDialogBase = (function (_super) {
    __extends(ReportDialogBase, _super);
    function ReportDialogBase() {
        var _this = _super.call(this) || this;
        _this._visible = ko.observable(false);
        _this.width = ko.observable(690);
        _this.height = ko.observable(420);
        _this.template = ko.observable('');
        _this.model = ko.observable(null);
        _this.tab = ko.observable(null);
        _this.disabled = ko.observable(false);
        _this.visible = ko.computed({
            read: function () {
                return _this._visible();
            },
            write: function (newVal) {
                if (_this.disabled())
                    return;
                _this._visible(newVal);
                if (!newVal)
                    _this.tab(null);
            }
        });
        _this.container = function (element) { return analytics_internal_1.getParentContainer(element); };
        _this._disposables.push(_this.visible);
        return _this;
    }
    ReportDialogBase.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.tab(null);
    };
    ReportDialogBase.prototype.show = function (tab) {
        if (tab) {
            this.tab(tab);
            this.model().setUrl(tab.context().url());
        }
        this.model().onShow(tab);
        this.visible(true);
    };
    ReportDialogBase.prototype.customize = function (template, model) {
        this.template(template);
        this.model(model);
        this.buttons = model.popupButtons;
    };
    ReportDialogBase.prototype.cancel = function () {
        this.visible(false);
    };
    return ReportDialogBase;
}(analytics_utils_1.Disposable));
exports.ReportDialogBase = ReportDialogBase;
