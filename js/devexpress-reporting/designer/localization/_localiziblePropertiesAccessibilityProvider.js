﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localiziblePropertiesAccessibilityProvider.js)
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
var LocaliziblePropertiesAccessibilityProvider = (function (_super) {
    __extends(LocaliziblePropertiesAccessibilityProvider, _super);
    function LocaliziblePropertiesAccessibilityProvider(isDefaultLanguage) {
        var _this = _super.call(this) || this;
        _this.isDefaultLanguage = isDefaultLanguage;
        return _this;
    }
    LocaliziblePropertiesAccessibilityProvider.prototype.isPropertyVisible = function (editor) {
        var visible = _super.prototype.isPropertyVisible.call(this, editor);
        if (visible) {
            if (!this.isDefaultLanguage()) {
                var info = editor.info();
                var hasLocalizedChild = function () { return info.info && info.info.length != 0 && info.info.filter(function (childProperty) { return !!childProperty.localizable; }).length != 0; };
                return !!info.localizable || hasLocalizedChild() || this._hasLocalizedParent(editor._parent());
            }
        }
        return visible;
    };
    LocaliziblePropertiesAccessibilityProvider.prototype._hasLocalizedParent = function (parent) {
        if (!parent)
            return false;
        if (parent.info().localizable)
            return true;
        return this._hasLocalizedParent(parent._parent());
    };
    return LocaliziblePropertiesAccessibilityProvider;
}(analytics_internal_1.PropertiesAccessibilityProvider));
exports.LocaliziblePropertiesAccessibilityProvider = LocaliziblePropertiesAccessibilityProvider;
