﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_stripLimit.js)
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
var _axis_1 = require("../../internal/meta/_axis");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var StripLimitViewModel = (function (_super) {
    __extends(StripLimitViewModel, _super);
    function StripLimitViewModel(model, serializer, info) {
        var _this = _super.call(this, model, serializer, info || _axis_1.stripLimitSerializationsInfo) || this;
        _this.axisValue = ko.observable(_this._axisValue());
        _this.getInfo = function () {
            if (!_this.enabled()) {
                var newInfo = analytics_internal_1.extend(true, [], _axis_1.stripLimitSerializationsInfo);
                var axisValueProperty = newInfo.filter(function (info) { return info.propertyName === 'axisValue'; })[0];
                axisValueProperty.visible = false;
                return newInfo;
            }
            return _axis_1.stripLimitSerializationsInfo;
        };
        return _this;
    }
    StripLimitViewModel.from = function (model, serializer) {
        return new StripLimitViewModel(model || {}, serializer);
    };
    StripLimitViewModel.toJson = function (value, serializer, refs) {
        value._axisValue(value.enabled() ? value.axisValue() : null);
        return serializer.serialize(value, undefined, refs);
    };
    return StripLimitViewModel;
}(analytics_elements_1.SerializableModel));
exports.StripLimitViewModel = StripLimitViewModel;
