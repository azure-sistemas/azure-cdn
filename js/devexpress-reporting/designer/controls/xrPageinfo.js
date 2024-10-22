﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPageinfo.js)
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
var xrControl_1 = require("./xrControl");
var XRPageInfoSurface = (function (_super) {
    __extends(XRPageInfoSurface, _super);
    function XRPageInfoSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.displayText = function () {
            var format = control['textFormatString'] && control.textFormatString();
            if (format)
                return format;
            var value = control['pageInfo'](), info = exports.pageInfoValuesMap.filter(function (item) { return item.value === value; })[0];
            if (info)
                return info.displayValue;
            return value;
        };
        return _this;
    }
    return XRPageInfoSurface;
}(xrControl_1.XRControlSurface));
exports.XRPageInfoSurface = XRPageInfoSurface;
var XRPageInfoViewModel = (function (_super) {
    __extends(XRPageInfoViewModel, _super);
    function XRPageInfoViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        var format = _this['_model']['@Format'];
        if (format) {
            if (!_this.textFormatString()) {
                _this.textFormatString(format);
            }
            delete _this['_model']['@Format'];
        }
        return _this;
    }
    return XRPageInfoViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRPageInfoViewModel = XRPageInfoViewModel;
exports.pageInfoValuesMap = [
    { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraPrinting.PageInfo.None' },
    { value: 'Number', displayValue: 'Page Number', localizationId: 'DevExpress.XtraPrinting.PageInfo.Number' },
    { value: 'NumberOfTotal', displayValue: "'Current of Total' Page Numbers", localizationId: 'DevExpress.XtraPrinting.PageInfo.NumberOfTotal' },
    { value: 'RomLowNumber', displayValue: 'Page Number (Roman, Lowercase)', localizationId: 'DevExpress.XtraPrinting.PageInfo.RomLowNumber' },
    { value: 'RomHiNumber', displayValue: 'Page Number (Roman, Uppercase)', localizationId: 'DevExpress.XtraPrinting.PageInfo.RomHiNumber' },
    { value: 'DateTime', displayValue: 'Current Date and Time', localizationId: 'DevExpress.XtraPrinting.PageInfo.DateTime' },
    { value: 'UserName', displayValue: 'User Name', localizationId: 'DevExpress.XtraPrinting.PageInfo.UserName' },
    { value: 'Total', displayValue: 'Page Count', localizationId: 'DevExpress.XtraPrinting.PageInfo.Total' }
];
