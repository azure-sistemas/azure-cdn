﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_axisXYViewModel.js)
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
var _constantLine_1 = require("../models/_constantLine");
var _scaleBreak_1 = require("../models/_scaleBreak");
var _strip_1 = require("../models/_strip");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var AxisXYViewModel = (function (_super) {
    __extends(AxisXYViewModel, _super);
    function AxisXYViewModel(model, serializer, info) {
        var _this = _super.call(this, model, serializer, info || _axis_1.axisXYSerializationsInfo) || this;
        _this.constantLines = _utils_1.deserializeModelArray(model && model.ConstantLines, function (item, parent) { return new _constantLine_1.ConstantLineViewModel(item, parent, serializer); }, _constantLine_1.ConstantLineViewModel.prefix);
        _this.scaleBreaks = _utils_1.deserializeModelArray(model && model.ScaleBreaks, function (item, parent) { return new _scaleBreak_1.ScaleBreakViewModel(item, parent, serializer); }, _scaleBreak_1.ScaleBreakViewModel.prefix);
        _this.strips = _utils_1.deserializeModelArray(model && model.Strips, function (item, parent) { return new _strip_1.StripViewModel(item, parent, serializer); }, _strip_1.StripViewModel.prefix);
        return _this;
    }
    AxisXYViewModel.from = function (info) {
        return function (model, serializer) {
            return new AxisXYViewModel(model || {}, serializer, info);
        };
    };
    AxisXYViewModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, undefined, refs);
    };
    return AxisXYViewModel;
}(analytics_elements_1.SerializableModel));
exports.AxisXYViewModel = AxisXYViewModel;
var _axis_1 = require("../../internal/meta/_axis");
var _utils_1 = require("../../_utils");
