﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrBarcode.js)
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
var xrReportelement_1 = require("./xrReportelement");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var XRBarCodeViewModel = (function (_super) {
    __extends(XRBarCodeViewModel, _super);
    function XRBarCodeViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        _this.symbology(_this.createBarcode(_this.symbology() || {}, serializer));
        _this.barcodeFake = {
            type: ko.pureComputed({
                read: function () {
                    return _this.symbology()['name']();
                },
                write: function (val) {
                    _this.symbology(_this.createBarcode({ '@Name': val }, serializer));
                }
            }),
            content: _this.symbology
        };
        _this._disposables.push(_this.barcodeFake.type);
        return _this;
    }
    XRBarCodeViewModel.prototype.createBarcode = function (model, serializer) {
        if (serializer === void 0) { serializer = null; }
        var name = model && model['@Name'] || 'Code1';
        var barcodeInfo = xrBarcode_1.barCodesMap[name];
        var newBarcode = { 'name': ko.observable(name), 'getInfo': function () { return barcodeInfo; } };
        (serializer || new analytics_utils_1.ModelSerializer()).deserialize(newBarcode, model);
        return newBarcode;
    };
    XRBarCodeViewModel.unitProperties = [].concat(['module'], xrReportelement_1.XRReportElementViewModel.unitProperties);
    return XRBarCodeViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRBarCodeViewModel = XRBarCodeViewModel;
var XRBarcodeSurface = (function (_super) {
    __extends(XRBarcodeSurface, _super);
    function XRBarcodeSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.contenttemplate = 'dxrd-barcode-content';
        return _this;
    }
    return XRBarcodeSurface;
}(xrControl_1.XRControlSurface));
exports.XRBarcodeSurface = XRBarcodeSurface;
var xrBarcode_1 = require("./metadata/xrBarcode");
