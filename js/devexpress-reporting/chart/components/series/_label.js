﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_label.js)
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
var _chart_1 = require("../../internal/meta/_chart");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var SeriesLabelViewModel = (function (_super) {
    __extends(SeriesLabelViewModel, _super);
    function SeriesLabelViewModel(model, serializer) {
        var _this = _super.call(this, model, serializer, _chart_1.seriesLabelSerializationsInfo) || this;
        if (_this.typeNameSerializable) {
            _this._disposables.push(_this.typeNameSerializable.subscribe(function (val) {
                _this.seriesLabelPosition(null);
            }));
        }
        return _this;
    }
    SeriesLabelViewModel.from = function (model, serializer) {
        return new SeriesLabelViewModel(model || {}, serializer);
    };
    SeriesLabelViewModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, _chart_1.seriesLabelSerializationsInfo, refs);
    };
    return SeriesLabelViewModel;
}(analytics_elements_1.SerializableModel));
exports.SeriesLabelViewModel = SeriesLabelViewModel;
