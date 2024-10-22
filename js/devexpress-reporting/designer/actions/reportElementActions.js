﻿/**
* DevExpress HTML/JS Reporting (designer\actions\reportElementActions.js)
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
var elementActions_1 = require("./elementActions");
var xrReport_1 = require("../controls/xrReport");
var xrBand_1 = require("../bands/xrBand");
var xrReportelement_1 = require("../controls/xrReportelement");
var ReportElementActions = (function (_super) {
    __extends(ReportElementActions, _super);
    function ReportElementActions(surfaceContext, selection) {
        return _super.call(this, surfaceContext, selection) || this;
    }
    ReportElementActions.prototype.getActions = function (context) {
        if (context && !(context instanceof xrReport_1.ReportViewModel || context instanceof xrBand_1.BandViewModel) && (context instanceof xrReportelement_1.XRReportElementViewModel || context.controlType === 'multiselect')) {
            return _super.prototype.getActions.call(this, context);
        }
        return [];
    };
    return ReportElementActions;
}(elementActions_1.ElementActions));
exports.ReportElementActions = ReportElementActions;
