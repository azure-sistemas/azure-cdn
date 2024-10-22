﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_series.js)
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
var _template_1 = require("./_template");
var _axis_1 = require("../axis/_axis");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var SeriesViewModel = (function (_super) {
    __extends(SeriesViewModel, _super);
    function SeriesViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, serializer, _chart_1.seriesSerializationsInfo) || this;
        _this.isIncompatible = ko.observable(false);
        _axis_1.initCollectionItem(_this, parent)();
        _this._disposables.push(_this['displayName'] = ko.pureComputed(function () {
            return _this.isIncompatible() ? analytics_utils_1.getLocalization('(incompatible)', 'ChartStringId.IncompatibleSeriesView') + ' ' + _this['name']() : _this['name']();
        }));
        _this.points = ko.observableArray([]);
        _this._disposables.push(_this.points.subscribe(function (newValue) { newValue['owner'] = _this; }));
        _this.points(analytics_utils_1.deserializeArray(model.Points || [], function (item) { return new _point_1.SeriesPointModel(item, _this, serializer); })());
        return _this;
    }
    SeriesViewModel.prototype.updateByView = function (view) {
        _super.prototype.updateByView.call(this, view);
        this.points && this.points([]);
    };
    SeriesViewModel.prefix = 'Series';
    return SeriesViewModel;
}(_template_1.SeriesTemplateViewModel));
exports.SeriesViewModel = SeriesViewModel;
var _point_1 = require("./_point");
var _chart_1 = require("../../internal/meta/_chart");
