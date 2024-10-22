﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_elementCollection.js)
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
var _axis_1 = require("../components/axis/_axis");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var ChartElementCollectionItemBase = (function (_super) {
    __extends(ChartElementCollectionItemBase, _super);
    function ChartElementCollectionItemBase(model, parent, serializer, info) {
        var _this = _super.call(this, model, serializer, info) || this;
        _axis_1.initCollectionItem(_this, parent)();
        return _this;
    }
    ChartElementCollectionItemBase.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, null, refs);
    };
    return ChartElementCollectionItemBase;
}(analytics_elements_1.SerializableModel));
exports.ChartElementCollectionItemBase = ChartElementCollectionItemBase;
