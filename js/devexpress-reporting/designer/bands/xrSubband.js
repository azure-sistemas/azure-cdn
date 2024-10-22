﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrSubband.js)
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
var SubBandViewModel = (function (_super) {
    __extends(SubBandViewModel, _super);
    function SubBandViewModel(band, parent, serializer) {
        return _super.call(this, band, parent, serializer) || this;
    }
    SubBandViewModel.prototype.isPropertyDisabled = function (name) {
        if (name === bandsMetadata_1.pageBreak.propertyName)
            return this.controlType === 'SubBand' && this[bandsMetadata_1.printAcrossBands.propertyName] && this[bandsMetadata_1.printAcrossBands.propertyName]();
        else
            return _super.prototype.isPropertyDisabled.call(this, name);
    };
    SubBandViewModel.prototype.isAllowedParent = function (target) {
        return target instanceof xrBand_1.BandViewModel;
    };
    return SubBandViewModel;
}(xrBand_1.BandViewModel));
exports.SubBandViewModel = SubBandViewModel;
var SubBandSurface = (function (_super) {
    __extends(SubBandSurface, _super);
    function SubBandSurface() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leftMarginTemplate = 'dxrd-sub-band-coordinate-grid';
        return _this;
    }
    SubBandSurface.prototype.getAbsolutePositionY = function () {
        var y = _super.prototype.getAbsolutePositionY.call(this);
        if (this.parent.bandsHolder.bands().indexOf(this) === 0) {
            return y + (this.parent.heightWithoutSubBands());
        }
        return y;
    };
    SubBandSurface.prototype.getBackgroundRect = function () {
        var top = 0, bottom, height = this._height();
        var parent = this.parent;
        var parentBands = ko.unwrap(parent.bandsHolder.bands);
        var parentBackgroundRect = ko.unwrap(parent.backgroundRect);
        top += (parentBackgroundRect.top + parentBackgroundRect.height);
        bottom = parentBackgroundRect.bottom;
        var bandIndex = parentBands.indexOf(this);
        for (var i = 0; i < bandIndex; i++) {
            top += parentBands[i]._totalHeight();
        }
        if (top > bottom)
            height = 0;
        else if (top + height > bottom)
            height = bottom - top;
        return { top: top, bottom: bottom, height: height };
    };
    SubBandSurface.prototype._initMultiColumn = function () {
        var _this = this;
        this._disposables.push(this.multiColumn = ko.computed(function () {
            if (_this.parent.multiColumn && _this.parent.multiColumn() && _this.parent.multiColumn().haveColumns()) {
                return _this.parent.multiColumn();
            }
        }));
    };
    return SubBandSurface;
}(xrBand_1.BandSurface));
exports.SubBandSurface = SubBandSurface;
var bandsMetadata_1 = require("./metadata/bandsMetadata");
