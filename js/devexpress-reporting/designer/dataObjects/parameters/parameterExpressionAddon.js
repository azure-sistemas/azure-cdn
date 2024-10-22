﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterExpressionAddon.js)
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
var ko = require("knockout");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ParameterExpressionAddOn = (function (_super) {
    __extends(ParameterExpressionAddOn, _super);
    function ParameterExpressionAddOn(_editor, _parameter) {
        var _this = _super.call(this) || this;
        _this._editor = _editor;
        _this._parameter = _parameter;
        _this.imageTemplateName = 'dx-objectdatasource-expression';
        _this._disposables.push(ko.computed(function () {
            if (_this._parameter()) {
                var wrappedExpression = _this._editor.value.peek();
                var expressionValue = wrappedExpression && wrappedExpression.value && wrappedExpression.value.peek();
                _this._parameter().propertyExpressionMapper.getExpressionProperty(_this._editor.name).showExpression(!!expressionValue);
            }
        }));
        _this._disposables.push(_this.isExpression = ko.pureComputed({
            read: function () {
                if (_this._parameter()) {
                    return _this._parameter().propertyExpressionMapper.getExpressionProperty(_this._editor.name).showExpression();
                }
            },
            write: function (value) { return _this._parameter() && _this._parameter().propertyExpressionMapper.getExpressionProperty(_this._editor.name).showExpression(value); }
        }));
        return _this;
    }
    ParameterExpressionAddOn.prototype.switchEditors = function () {
        this.isExpression(!this.isExpression());
    };
    return ParameterExpressionAddOn;
}(analytics_utils_1.Disposable));
exports.ParameterExpressionAddOn = ParameterExpressionAddOn;
