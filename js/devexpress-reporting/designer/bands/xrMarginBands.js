﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrMarginBands.js)
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
var xrBand_1 = require("./xrBand");
var ko = require("knockout");
var TopMarginBand = (function (_super) {
    __extends(TopMarginBand, _super);
    function TopMarginBand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopMarginBand.prototype.initHeight = function () {
        this.height = this.parentModel() && this.root.margins.top || ko.observable(0);
        _super.prototype.initHeight.call(this);
    };
    return TopMarginBand;
}(xrBand_1.BandViewModel));
exports.TopMarginBand = TopMarginBand;
var BottomMarginBand = (function (_super) {
    __extends(BottomMarginBand, _super);
    function BottomMarginBand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BottomMarginBand.prototype.initHeight = function () {
        this.height = this.parentModel() && this.root.margins.bottom || ko.observable(0);
        _super.prototype.initHeight.call(this);
    };
    return BottomMarginBand;
}(xrBand_1.BandViewModel));
exports.BottomMarginBand = BottomMarginBand;
var BottomMarginSurface = (function (_super) {
    __extends(BottomMarginSurface, _super);
    function BottomMarginSurface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BottomMarginSurface.prototype.getBackgroundRect = function () {
        var top = this.parent.pageHeight() - this._height(), bottom, height = this._height();
        return { top: top, bottom: bottom, height: height };
    };
    return BottomMarginSurface;
}(xrBand_1.BandSurface));
exports.BottomMarginSurface = BottomMarginSurface;
