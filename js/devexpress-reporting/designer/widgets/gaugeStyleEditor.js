﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\gaugeStyleEditor.js)
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
var xrGauge_1 = require("../controls/xrGauge");
var ko = require("knockout");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var GaugeStyleEditor = (function (_super) {
    __extends(GaugeStyleEditor, _super);
    function GaugeStyleEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, 0, parentDisabled, textToSearch) || this;
        _this._viewModel = ko.observable();
        _this.viewmodel = {
            items: ko.pureComputed(function () {
                if (_this._viewModel() && _this._viewModel().viewType) {
                    return _this._viewModel().viewType() === 'Circular' ? xrGauge_1.circularValues : xrGauge_1.linearValues;
                }
                else {
                    return [];
                }
            })
        };
        _this._disposables.push(_this.viewmodel.items);
        return _this;
    }
    GaugeStyleEditor.prototype.update = function (viewModel) {
        _super.prototype.update.call(this, viewModel);
        this._viewModel(viewModel);
    };
    return GaugeStyleEditor;
}(analytics_widgets_1.Editor));
exports.GaugeStyleEditor = GaugeStyleEditor;
