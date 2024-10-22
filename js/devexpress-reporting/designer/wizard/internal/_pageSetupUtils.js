﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_pageSetupUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _labelWizardUtils_1 = require("./_labelWizardUtils");
var reportWizardState_1 = require("../reportWizardState");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var PageSetupHelper = (function () {
    function PageSetupHelper() {
    }
    PageSetupHelper.mm2px = function (val) { return analytics_internal_1.unitsToPixel(10 * val, 'TenthsOfAMillimeter'); };
    PageSetupHelper.in2px = function (val) { return analytics_internal_1.unitsToPixel(100 * val, 'HundredthsOfAnInch'); };
    PageSetupHelper.px2mm = function (val) { return analytics_internal_1.pixelToUnits(val, 'TenthsOfAMillimeter', 1) / 10; };
    PageSetupHelper.px2in = function (val) { return analytics_internal_1.pixelToUnits(val, 'HundredthsOfAnInch', 1) / 100; };
    PageSetupHelper.mm2in = function (val) { return val * _labelWizardUtils_1.CONVERSION_COEEFICIENT; };
    PageSetupHelper.in2mm = function (val) { return val / _labelWizardUtils_1.CONVERSION_COEEFICIENT; };
    PageSetupHelper.getConverter = function (from, to) {
        if (from === to)
            return function (x) { return x; };
        var unitCode = function (unit) {
            switch (unit) {
                case reportWizardState_1.GraphicsUnit.Inch:
                    return 'in';
                case reportWizardState_1.GraphicsUnit.Millimeter:
                    return 'mm';
                case reportWizardState_1.GraphicsUnit.Pixel:
                    return 'px';
            }
        };
        var fnName = unitCode(from) + '2' + unitCode(to);
        return PageSetupHelper[fnName];
    };
    return PageSetupHelper;
}());
exports.PageSetupHelper = PageSetupHelper;
