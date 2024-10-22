﻿/**
* DevExpress HTML/JS Reporting (chart\_surface.js)
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
var _requests_1 = require("./internal/_requests");
var _chart_1 = require("./components/models/_chart");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _handlerUri_1 = require("./_handlerUri");
var ChartControlSurface = (function (_super) {
    __extends(ChartControlSurface, _super);
    function ChartControlSurface(control, zoom, size) {
        if (zoom === void 0) { zoom = ko.observable(1); }
        if (size === void 0) { size = analytics_elements_1.Size.fromString('500, 500'); }
        var _this = _super.call(this) || this;
        _this.imageSrc = ko.observable('');
        _this.templateName = 'dx-chart-surface';
        _this.width = ko.computed(function () { return size.width() * zoom(); });
        _this.height = ko.computed(function () { return size.height() * zoom(); });
        _this.zoom = zoom;
        _this._disposables.push(_this.width);
        _this._disposables.push(_this.height);
        _this._disposables.push(ko.computed(function () {
            var series = control.chart.dataContainer.series();
            series.forEach(function (val) {
                val.viewType();
            });
            var _self = _this;
            if (_handlerUri_1.HandlerUri()) {
                _requests_1.ChartRequests.getChartImage(_handlerUri_1.HandlerUri(), _chart_1.ChartViewModel.toJson(ko.unwrap(control.chart), new analytics_utils_1.ModelSerializer(), null), _this.width(), _this.height()).done(function (result) {
                    var allSeries = control.chart.dataContainer.series();
                    allSeries.forEach(function (val) {
                        val.isIncompatible(false);
                    });
                    _self.imageSrc('data:image/svg+xml;base64,' + result.Image);
                    result.Indexes.forEach(function (val) {
                        var series = allSeries[val];
                        series.isIncompatible(true);
                    });
                })
                    .fail(function (result) {
                    analytics_internal_1.NotifyAboutWarning('Impossible to get chart image.');
                });
            }
        }).extend({ deferred: true }));
        return _this;
    }
    return ChartControlSurface;
}(analytics_utils_1.Disposable));
exports.ChartControlSurface = ChartControlSurface;
