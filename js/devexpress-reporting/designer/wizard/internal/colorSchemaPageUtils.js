﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\colorSchemaPageUtils.js)
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
var ColorScheme = (function () {
    function ColorScheme(name, localizationId, baseColor) {
        this._isCustom = false;
        this.name = name;
        this.localizationId = localizationId;
        this.baseColor = baseColor;
        this.color = analytics_utils_1.colorFromString(baseColor)();
        this.displayName = analytics_utils_1.getLocalization(this.name, this.localizationId);
        this.selected = ko.observable(false);
    }
    return ColorScheme;
}());
exports.ColorScheme = ColorScheme;
var CustomColorScheme = (function (_super) {
    __extends(CustomColorScheme, _super);
    function CustomColorScheme(name, localizationId, baseColor) {
        var _this = _super.call(this, name, localizationId, baseColor) || this;
        _this.color = analytics_utils_1.colorFromString(baseColor);
        _this.editorColor = ko.observable(_this.color());
        _this.popoverVisible = ko.observable(false);
        return _this;
    }
    CustomColorScheme.prototype.applyColor = function () {
        this.color(this.editorColor());
        this.baseColor = analytics_utils_1.colorToString(this.editorColor());
        this.popoverVisible(false);
    };
    CustomColorScheme.prototype.resetColor = function () {
        this.editorColor(this.color());
        this.popoverVisible(false);
    };
    return CustomColorScheme;
}(ColorScheme));
exports.CustomColorScheme = CustomColorScheme;
