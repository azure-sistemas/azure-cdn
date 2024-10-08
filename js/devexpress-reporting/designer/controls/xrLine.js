﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrLine.js)
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
var ko = require("knockout");
var $ = require("jquery");
var XRLineSurface = (function (_super) {
    __extends(XRLineSurface, _super);
    function XRLineSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this['lineWidth'] = control['lineWidth'];
        _this['lineStyle'] = control['lineStyle'];
        _this['lineDirection'] = control['lineDirection'];
        _this.selectiontemplate = 'dxrd-control-selection';
        _this.contenttemplate = 'dxrd-line-content';
        _this._disposables.push(_this.linePosition = ko.pureComputed(function () {
            var result = {}, rect = _this.rect();
            if (_this['lineDirection']() === 'Horizontal') {
                result['x1'] = 0;
                result['x2'] = rect.width;
                result['y1'] = rect.height / 2;
                result['y2'] = rect.height / 2;
            }
            if (_this['lineDirection']() === 'Vertical') {
                result['x1'] = rect.width / 2;
                result['x2'] = rect.width / 2;
                result['y1'] = 0;
                result['y2'] = rect.height;
            }
            if (_this['lineDirection']() === 'BackSlant') {
                result['x1'] = 0;
                result['x2'] = rect.width;
                result['y1'] = 0;
                result['y2'] = rect.height;
            }
            if (_this['lineDirection']() === 'Slant') {
                result['x1'] = 0;
                result['x2'] = rect.width;
                result['y1'] = rect.height;
                result['y2'] = 0;
            }
            return result;
        }));
        _this._disposables.push(_this.contentCss = ko.pureComputed(function () {
            return $.extend({}, _this.cssCalculator.stroke(), _this.cssCalculator.strokeDashArray(), _this.cssCalculator.strokeWidth());
        }));
        return _this;
    }
    return XRLineSurface;
}(xrControl_1.XRControlSurface));
exports.XRLineSurface = XRLineSurface;
