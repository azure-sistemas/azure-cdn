﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_additionalPane.js)
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
var _common_1 = require("../../internal/meta/_common");
var AdditionalPaneViewModel = (function (_super) {
    __extends(AdditionalPaneViewModel, _super);
    function AdditionalPaneViewModel(model, parent, serializer) {
        return _super.call(this, model, parent, serializer, _common_1.additionalPaneSerializationsInfo) || this;
    }
    AdditionalPaneViewModel.from = function (model, serializer) {
        return new AdditionalPaneViewModel(model || {}, null, serializer);
    };
    AdditionalPaneViewModel.prefix = 'Pane ';
    return AdditionalPaneViewModel;
}(_elementCollection_1.ChartElementCollectionItemBase));
exports.AdditionalPaneViewModel = AdditionalPaneViewModel;
