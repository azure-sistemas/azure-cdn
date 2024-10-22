﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_printAcrossBandsPlaceHolder.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var PrintAcrossBandsPlaceHolder = (function (_super) {
    __extends(PrintAcrossBandsPlaceHolder, _super);
    function PrintAcrossBandsPlaceHolder(band) {
        var _this = _super.call(this) || this;
        _this.band = band;
        _this._disposables.push(_this.isVisible = ko.computed(function () {
            return band.printAcrossBands() && !_this.bandModel.parentModel().bands().filter(function (x) { return x instanceof xrVerticalBand_1.VerticalBandViewModel; }).length;
        }), _this.absolutePositionY = ko.computed(function () {
            var subbandsWithoutPrintAcrossBands = band.bandsHolder.bands().filter(function (subband) { return !subband.printAcrossBands(); });
            if (subbandsWithoutPrintAcrossBands.length > 0) {
                return subbandsWithoutPrintAcrossBands[0].absolutePosition.y();
            }
            var nextUntransparentSiblingBand = _this.findNextUntransparentSiblingBand(band);
            if (!nextUntransparentSiblingBand) {
                nextUntransparentSiblingBand = _this.findNextUntransparentSiblingBand(band.parent);
            }
            return nextUntransparentSiblingBand && nextUntransparentSiblingBand.absolutePosition.y();
        }), _this.height = ko.computed(function () {
            var firstBandWithoutAcross = _this.findFirstNonAcrossBand();
            return firstBandWithoutAcross ? (firstBandWithoutAcross.absolutePosition.y() - _this.absolutePositionY()) : 0;
        }));
        return _this;
    }
    PrintAcrossBandsPlaceHolder.prototype.findNextUntransparentSiblingBand = function (band) {
        var currentBandIndex = band.parent.bandsHolder.bands().indexOf(band);
        return band.parent.bandsHolder.bands().filter(function (band, index) { return (!band.printAcrossBands || band.printAcrossBands && !band.printAcrossBands()) && index > currentBandIndex; })[0];
    };
    PrintAcrossBandsPlaceHolder.prototype.findFirstNonAcrossBand = function () {
        var isSubband = this.bandModel.controlType === 'SubBand';
        var bandHolder = isSubband ? this.band.parent.parent['bandsHolder'] : this.band.parent.bandsHolder;
        var bandsWithoutAcross = [];
        if (this.bandModel.controlType === 'GroupHeaderBand' || (isSubband && this.bandModel.parentModel().controlType === 'GroupHeaderBand')) {
            var groupHeaderLevel = isSubband ? this.bandModel.parentModel()['level']() : this.bandModel.level();
            bandsWithoutAcross = bandHolder.bands().filter(function (_band) { return (_band.getControlModel().controlType === 'GroupFooterBand' && _band.getControlModel().level() > groupHeaderLevel)
                || _band.getControlModel().controlType === 'PageFooterBand'
                || _band.getControlModel().controlType === 'ReportFooterBand'
                || _band.getControlModel().controlType === 'BottomMarginBand'; });
        }
        else if (this.bandModel.controlType === 'PageHeaderBand' || (isSubband && this.bandModel.parentModel().controlType === 'PageHeaderBand')) {
            bandsWithoutAcross = bandHolder.bands().filter(function (_band) { return (_band.getControlModel().controlType === 'BottomMarginBand'); });
        }
        if (bandsWithoutAcross.length > 0) {
            return bandsWithoutAcross[0];
        }
    };
    Object.defineProperty(PrintAcrossBandsPlaceHolder.prototype, "bandModel", {
        get: function () {
            return this.band.getControlModel();
        },
        enumerable: true,
        configurable: true
    });
    return PrintAcrossBandsPlaceHolder;
}(analytics_utils_1.Disposable));
exports.PrintAcrossBandsPlaceHolder = PrintAcrossBandsPlaceHolder;
