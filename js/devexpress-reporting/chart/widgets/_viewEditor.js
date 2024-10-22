﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_viewEditor.js)
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var ko = require("knockout");
var _utils_1 = require("../_utils");
var ViewEditor = (function (_super) {
    __extends(ViewEditor, _super);
    function ViewEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this.viewItems = [];
        _this.contentValue = ko.computed(function () {
            return _this.value() && _this.value().model() || {};
        });
        _this._disposables.push(_this.contentValue);
        return _this;
    }
    ViewEditor.prototype.generateHeaderValue = function (undoEngine) {
        var _this = this;
        if (!this.headerValue) {
            this._disposables.push(this.headerValue = ko.computed({
                read: function () { return _this.value() && _this.value().type(); },
                write: function (newVal) {
                    undoEngine().start();
                    _this.value().type(newVal);
                    undoEngine().end();
                }
            }));
        }
        return this.headerValue;
    };
    ViewEditor.prototype.generateViewItems = function () {
        var _this = this;
        if (!this.viewItems.length) {
            this.viewItems = this.values().map(function (x) {
                return __assign({}, x, { className: _this.generateViewClassName(x.value), templateName: _this.generateViewClassName(x.value, true) });
            });
        }
        return this.viewItems;
    };
    ViewEditor.prototype.generateViewClassName = function (value, isTemplate) {
        if (isTemplate === void 0) { isTemplate = false; }
        var _name = (isTemplate ? 'dxrd-svg-fieldlist-' : 'dx-image-fieldlist-') + _utils_1.getSeriesClassName(value);
        if (isTemplate)
            return analytics_widgets_internal_1.SvgTemplatesEngine.getExistingTemplate(_name);
        return _name;
    };
    return ViewEditor;
}(analytics_widgets_1.Editor));
exports.ViewEditor = ViewEditor;
