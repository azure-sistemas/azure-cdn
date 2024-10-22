﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_secondaryAxisViewModel.js)
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
var _axisXYViewModel_1 = require("./_axisXYViewModel");
var _axis_1 = require("./_axis");
var _axis_2 = require("../../internal/meta/_axis");
var SecondaryAxisViewModel = (function (_super) {
    __extends(SecondaryAxisViewModel, _super);
    function SecondaryAxisViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, serializer, _axis_2.secondaryAxisXYSerializationsInfo) || this;
        _axis_1.initCollectionItem(_this, parent)();
        return _this;
    }
    Object.defineProperty(SecondaryAxisViewModel.prototype, "axisID", {
        get: function () {
            return this.parent().indexOf(this);
        },
        enumerable: true,
        configurable: true
    });
    SecondaryAxisViewModel.xPrefix = 'Secondary Axis X';
    SecondaryAxisViewModel.yPrefix = 'Secondary Axis Y';
    return SecondaryAxisViewModel;
}(_axisXYViewModel_1.AxisXYViewModel));
exports.SecondaryAxisViewModel = SecondaryAxisViewModel;
