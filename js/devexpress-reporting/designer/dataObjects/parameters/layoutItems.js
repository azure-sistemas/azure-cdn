﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\layoutItems.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var layoutItems_1 = require("../metadata/parameters/layoutItems");
var ParameterPanelLayoutItem = (function (_super) {
    __extends(ParameterPanelLayoutItem, _super);
    function ParameterPanelLayoutItem(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        if (_this.layoutItemType() === 'Group') {
            _this.items = analytics_utils_1.deserializeArray(model.Items, function (item) { return new ParameterPanelLayoutItem(item, serializer); });
        }
        return _this;
    }
    ParameterPanelLayoutItem.prototype.preInitProperties = function (model) {
        this.getInfo = function () { return layoutItems_1.parameterPanelLayoutMapper[model['@LayoutItemType']]; };
    };
    return ParameterPanelLayoutItem;
}(analytics_elements_1.SerializableModel));
exports.ParameterPanelLayoutItem = ParameterPanelLayoutItem;
