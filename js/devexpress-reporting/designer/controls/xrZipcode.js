﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrZipcode.js)
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
var xrControl_1 = require("./xrControl");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
var XRZipCodeSurface = (function (_super) {
    __extends(XRZipCodeSurface, _super);
    function XRZipCodeSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.displayText = function () {
            var text = control.text();
            text = text && text.replace(/[^\d]/g, '_') || '0'.replace(/[^\d]/g, '_');
            return text;
        };
        _this.fontSize = ko.pureComputed(function () {
            return analytics_internal_1.unitsToPixel(control['size']['height'](), context.measureUnit());
        });
        _this.letterSpacing = ko.pureComputed(function () {
            return Math.ceil(_this.fontSize() / 10);
        });
        _this.css = ko.pureComputed(function () {
            return $.extend({}, _this.cssCalculator.zipCodeFontCss(_this.fontSize()), _this.cssCalculator.backGroundCss(), _this.cssCalculator.zipCodeAlignment(), _this.cssCalculator.foreColorCss());
        });
        _this.contentCss = ko.pureComputed(function () {
            return $.extend({}, _this.cssCalculator.zipCodeAlignment(), _this.cssCalculator.paddingsCss(), { 'letterSpacing': _this.letterSpacing() + 'px' }, { 'lineHeight': 'inherit' });
        });
        return _this;
    }
    return XRZipCodeSurface;
}(xrControl_1.XRControlSurface));
exports.XRZipCodeSurface = XRZipCodeSurface;
