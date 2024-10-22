﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_styleHelper.js)
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
var style_1 = require("../controls/properties/style");
exports.stylesProperties = ['foreColor', 'borderColor', 'borderWidth', 'backColor', 'borders', 'borderDashStyle', 'padding', 'textAlignment', 'font'];
var StylesHelper = (function (_super) {
    __extends(StylesHelper, _super);
    function StylesHelper(_report, _controlsHelper) {
        var _this = _super.call(this) || this;
        _this._report = _report;
        _this._controlsHelper = _controlsHelper;
        return _this;
    }
    StylesHelper.styleEqualityComparer = function (x, y) {
        return exports.stylesProperties.every(function (property) { return x[property]() === y[property]() || x[property]() === undefined && y[property]() === undefined; });
    };
    StylesHelper.generateStyle = function (element) {
        var newStyle = new style_1.StyleModel({});
        exports.stylesProperties.forEach(function (property) {
            if (element[property] && element[property]() != style_1.StyleModel.defaults[property])
                newStyle[property](element[property]());
        });
        return newStyle;
    };
    StylesHelper.prototype.removeUnusedStyle = function (styleName) {
        var targetStyle = this._report.findStyle(styleName);
        if (targetStyle && !this._controlsHelper.allControls().some(function (control) { return control['styleName'] && control['styleName']() === styleName; })) {
            this._report.styles.remove(targetStyle);
            return targetStyle;
        }
    };
    return StylesHelper;
}(analytics_utils_1.Disposable));
exports.StylesHelper = StylesHelper;
