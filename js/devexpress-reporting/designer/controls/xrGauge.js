﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrGauge.js)
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
var $ = require("jquery");
exports.circularValues = [
    { displayValue: 'Half', value: 'Half', localizationId: 'GaugesPresetsStringId.ShapeHalf' },
    { displayValue: 'Full', value: 'Full', localizationId: 'GaugesPresetsStringId.ShapeFull' },
    { displayValue: 'QuarterLeft', value: 'QuarterLeft', localizationId: 'GaugesPresetsStringId.ShapeQuarterLeft' },
    { displayValue: 'QuarterRight', value: 'QuarterRight', localizationId: 'GaugesPresetsStringId.ShapeQuarterRight' },
    { displayValue: 'ThreeFourth', value: 'ThreeFourth', localizationId: 'GaugesPresetsStringId.ShapeThreeFourth' }
];
exports.linearValues = [
    { displayValue: 'Horizontal', value: 'Horizontal', localizationId: 'GaugesPresetsStringId.ShapeHorizontal' },
    { displayValue: 'Vertical', value: 'Vertical', localizationId: 'GaugesPresetsStringId.ShapeVertical' }
];
var XRGaugeViewModel = (function (_super) {
    __extends(XRGaugeViewModel, _super);
    function XRGaugeViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        _this._disposables.push(_this.viewType.subscribe(function (val) {
            return _this.viewStyle(val === 'Circular' ? exports.circularValues[0].value : exports.linearValues[0].value);
        }));
        return _this;
    }
    XRGaugeViewModel.prototype.getInfo = function () {
        var serializationInfo = $.extend(true, [], _super.prototype.getInfo.call(this));
        var viewStyleProperty = serializationInfo.filter(function (info) { return info.propertyName === 'viewStyle'; })[0];
        viewStyleProperty.defaultVal = this.viewType && (this.viewType() === 'Linear') ? 'Horizontal' : 'Half';
        return serializationInfo;
    };
    XRGaugeViewModel.bindings = ['ActualValue', 'Maximum', 'Minimum', 'TargetValue'];
    return XRGaugeViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRGaugeViewModel = XRGaugeViewModel;
