﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_scaleBreak.js)
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
var ScaleBreakViewModel = (function (_super) {
    __extends(ScaleBreakViewModel, _super);
    function ScaleBreakViewModel(model, parent, serializer) {
        return _super.call(this, model, parent, serializer, _axis_1.scaleBreakSerializationsInfo) || this;
    }
    ScaleBreakViewModel.from = function (model, serializer) {
        return new ScaleBreakViewModel(model || {}, null, serializer);
    };
    ScaleBreakViewModel.prefix = 'Scale Break ';
    return ScaleBreakViewModel;
}(_elementCollection_1.ChartElementCollectionItemBase));
exports.ScaleBreakViewModel = ScaleBreakViewModel;
