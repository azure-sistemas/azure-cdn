﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_positionSeriesLabelEditor.js)
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
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var _chart_1 = require("../internal/meta/_chart");
var PositionSeriesLabelEditor = (function (_super) {
    __extends(PositionSeriesLabelEditor, _super);
    function PositionSeriesLabelEditor(info, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, info, level, parentDisabled, textToSearch) || this;
        _this._disposables.push(_this.values = ko.pureComputed(function () {
            var model = _this._model();
            if (model && model['typeNameSerializable']) {
                return _this._positionChooser(model['typeNameSerializable']());
            }
        }));
        return _this;
    }
    PositionSeriesLabelEditor.prototype._positionChooser = function (type) {
        if (type) {
            if (['PieSeriesLabel', 'Pie3DSeriesLabel', 'DoughnutSeriesLabel', 'NestedDoughnutSeriesLabel', 'Doughnut3DSeriesLabel'].indexOf(type) !== -1)
                return _chart_1.piePositionValues;
            if ((['FunnelSeriesLabel', 'Funnel3DSeriesLabel'].indexOf(type) !== -1))
                return _chart_1.funnelPositionValues;
            if (type === 'WaterfallSeriesLabel')
                return _chart_1.waterfallPositionValues;
        }
        return _chart_1.barPositionValues;
    };
    return PositionSeriesLabelEditor;
}(analytics_widgets_1.Editor));
exports.PositionSeriesLabelEditor = PositionSeriesLabelEditor;
