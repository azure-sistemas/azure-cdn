﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrVerticalDetailBand.js)
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
var xrVerticalBand_1 = require("./xrVerticalBand");
var groupfield_1 = require("./groupfield");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var VerticalDetailBandViewModel = (function (_super) {
    __extends(VerticalDetailBandViewModel, _super);
    function VerticalDetailBandViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerticalDetailBandViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.sortFields);
        this.resetObservableArray(this.sortFields);
    };
    VerticalDetailBandViewModel.prototype.preInit = function (band, parent, serializer) {
        this.sortFields = analytics_utils_1.deserializeArray(band.SortFields, function (field) { return new groupfield_1.GroupFieldModel(field, serializer); });
    };
    return VerticalDetailBandViewModel;
}(xrVerticalBand_1.VerticalBandViewModel));
exports.VerticalDetailBandViewModel = VerticalDetailBandViewModel;
