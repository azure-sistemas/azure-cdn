﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\_reportMenuSettings.js)
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
var ko = require("knockout");
var events = require("devextreme/events");
var ReportMenuSettings = (function (_super) {
    __extends(ReportMenuSettings, _super);
    function ReportMenuSettings() {
        var _this = _super.call(this) || this;
        _this.appMenuVisible = ko.observable(false);
        _this._$menuElement = null;
        _this.isMenuCollapsed = ko.observable(false);
        _this.toggleAppMenu = function (event) {
            var canToggle = !event || !_this._$menuElement.is(event.target) && !_this._$menuElement.find(event.target).length;
            canToggle && _this._toggleAppMenu();
            return canToggle;
        };
        return _this;
    }
    ReportMenuSettings.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        events.off(document, 'dxpointerdown', this.toggleAppMenu);
        this._$menuElement = null;
    };
    ReportMenuSettings.prototype.setMenuElement = function ($element) {
        this._$menuElement = $element;
    };
    ReportMenuSettings.prototype._toggleAppMenu = function () {
        this.appMenuVisible(!this.appMenuVisible());
        if (this.appMenuVisible()) {
            events.on(document, 'dxpointerdown', this.toggleAppMenu);
        }
        else {
            this.isMenuCollapsed(false);
            events.off(document, 'dxpointerdown', this.toggleAppMenu);
        }
    };
    ReportMenuSettings.prototype.generate = function () {
        var _this = this;
        var result = _super.prototype.generate.call(this);
        if (this.isMenuCollapsed)
            result['isMenuCollapsed'] = this.isMenuCollapsed;
        result['setMenuElement'] = function ($element) { return _this.setMenuElement($element); };
        return result;
    };
    return ReportMenuSettings;
}(analytics_internal_1.MenuSettings));
exports.ReportMenuSettings = ReportMenuSettings;
