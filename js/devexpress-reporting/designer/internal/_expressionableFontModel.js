﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_expressionableFontModel.js)
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
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var ko = require("knockout");
var $ = require("jquery");
var ExpressionableFontModel = (function (_super) {
    __extends(ExpressionableFontModel, _super);
    function ExpressionableFontModel(value, _model) {
        var _this = _super.call(this, value) || this;
        _this._model = _model;
        _this.isPropertyHighlighted = function (propertyName) {
            var controlModel = _this._model();
            if (!controlModel)
                return false;
            propertyName = propertyName === 'family' ? 'name' : propertyName;
            return controlModel.isPropertyHighlighted && controlModel.isPropertyHighlighted.apply(controlModel, [propertyName, 'font']);
        };
        $.extend(_this.modificators, {
            boldHasExpression: ko.computed(function () { return _this.isPropertyHighlighted('bold'); }),
            italicHasExpression: ko.computed(function () { return _this.isPropertyHighlighted('italic'); }),
            strikeoutHasExpression: ko.computed(function () { return _this.isPropertyHighlighted('strikeout'); }),
            underlineHasExpression: ko.computed(function () { return _this.isPropertyHighlighted('underline'); })
        });
        _this._disposables.push(_this.modificators.boldHasExpression);
        _this._disposables.push(_this.modificators.italicHasExpression);
        _this._disposables.push(_this.modificators.strikeoutHasExpression);
        _this._disposables.push(_this.modificators.underlineHasExpression);
        return _this;
    }
    return ExpressionableFontModel;
}(analytics_widgets_internal_1.FontModel));
exports.ExpressionableFontModel = ExpressionableFontModel;
