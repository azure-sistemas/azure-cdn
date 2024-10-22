﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_fillStyle.js)
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
var _series_1 = require("../../internal/meta/_series");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var $ = require("jquery");
var FillStyle = (function (_super) {
    __extends(FillStyle, _super);
    function FillStyle(model, info, gradientTypeName, serializer) {
        var _this = _super.call(this, model, serializer, info) || this;
        _this.gradientTypeName = gradientTypeName;
        _this.updateOptions(_this.fillMode(), serializer, model['Options']);
        _this._disposables.push(_this.fillMode.subscribe(function (newValue) {
            _this.updateOptions(newValue, serializer, {});
        }));
        return _this;
    }
    FillStyle.from = function (info, gradientTypeName) {
        return function (model, serializer) {
            return new FillStyle(model || {}, info, gradientTypeName, serializer);
        };
    };
    FillStyle.toJson = function (model, serializer, refs) {
        return serializer.serialize(model, undefined, refs);
    };
    FillStyle.prototype._optionsTypeMap = function (unitType) {
        switch (unitType) {
            case 'Gradient': return this.gradientTypeName;
            case 'Hatch': return 'HatchFillOptions';
            default: return undefined;
        }
    };
    FillStyle.prototype.isPropertyVisible = function (propertyName) {
        return propertyName !== 'options' || (propertyName === 'options' && this[propertyName]());
    };
    FillStyle.prototype.updateOptions = function (fillMode, serializer, optionsObject) {
        var newObject = $.extend({ '@TypeNameSerializable': this._optionsTypeMap(fillMode) }, optionsObject);
        var optionsInfo = _series_1.fillModeMapper[fillMode];
        this.options(new analytics_elements_1.SerializableModel(newObject, serializer, optionsInfo));
    };
    return FillStyle;
}(analytics_elements_1.SerializableModel));
exports.FillStyle = FillStyle;
