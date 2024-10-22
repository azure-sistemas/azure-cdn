﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_legend.js)
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
var LegendViewModel = (function (_super) {
    __extends(LegendViewModel, _super);
    function LegendViewModel(model, serializer) {
        return _super.call(this, model, serializer, _chart_1.legendSerializationsInfo) || this;
    }
    LegendViewModel.from = function (model, serializer) {
        return new LegendViewModel(model || {}, serializer);
    };
    LegendViewModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, _chart_1.legendSerializationsInfo, refs);
    };
    return LegendViewModel;
}(analytics_elements_1.SerializableModel));
exports.LegendViewModel = LegendViewModel;
