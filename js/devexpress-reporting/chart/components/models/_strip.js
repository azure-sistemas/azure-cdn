﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_strip.js)
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
var _elementCollection_1 = require("../../internal/_elementCollection");
var _axis_1 = require("../../internal/meta/_axis");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var StripViewModel = (function (_super) {
    __extends(StripViewModel, _super);
    function StripViewModel(model, parent, serializer) {
        return _super.call(this, analytics_internal_1.extend(true, {}, StripViewModel.initialModel, model), parent, serializer, _axis_1.stripSerializationsInfo) || this;
    }
    StripViewModel.from = function (model, serializer) {
        return new StripViewModel(model || {}, null, serializer);
    };
    StripViewModel.initialModel = {
        'MinLimit': {
            '@AxisValueSerializable': '0'
        },
        'MaxLimit': {
            '@AxisValueSerializable': '1'
        }
    };
    StripViewModel.prefix = 'Strip ';
    return StripViewModel;
}(_elementCollection_1.ChartElementCollectionItemBase));
exports.StripViewModel = StripViewModel;
