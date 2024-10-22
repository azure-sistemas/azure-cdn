﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitToContainerAction.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrTableCell_1 = require("../controls/xrTableCell");
var xrControl_1 = require("../controls/xrControl");
var xrBand_1 = require("../bands/xrBand");
var xrVerticalBand_1 = require("../bands/xrVerticalBand");
var xrCrossband_1 = require("../controls/xrCrossband");
var xrPagebreak_1 = require("../controls/xrPagebreak");
var xrTableOfContents_1 = require("../controls/xrTableOfContents");
var ko = require("knockout");
var FitToContainerAction = (function () {
    function FitToContainerAction(_control) {
        var _this = this;
        this._control = _control;
        this._container = ko.pureComputed(function () { return _this._control() && _this._control().parent; });
    }
    FitToContainerAction.prototype.doAction = function () {
        this._control().rect(this._container().getUsefulRect());
    };
    FitToContainerAction.prototype.allowed = function () {
        var container = this._container();
        if (!container || container.getChildrenCollection()().length > 1)
            return false;
        return (container instanceof xrTableCell_1.XRTableCellSurface ||
            container instanceof xrControl_1.XRControlSurface ||
            container instanceof xrBand_1.BandSurface ||
            container instanceof xrVerticalBand_1.VerticalBandSurface);
    };
    FitToContainerAction.prototype.visible = function () {
        return !(this._control() instanceof xrCrossband_1.XRCrossBandSurface ||
            this._control() instanceof xrPagebreak_1.XRPageBreakSurface ||
            this._control() instanceof xrTableOfContents_1.XRTableOfContentsSurface);
    };
    return FitToContainerAction;
}());
exports.FitToContainerAction = FitToContainerAction;
