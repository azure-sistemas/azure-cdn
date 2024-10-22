﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_chart.js)
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
var _chart_1 = require("../../internal/meta/_chart");
var _diagram_1 = require("../../internal/meta/_diagram");
var _diagram_2 = require("../_diagram");
var _title_1 = require("./_title");
var _additionalLegend_1 = require("./_additionalLegend");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var _utils_1 = require("../../_utils");
var ChartViewModel = (function (_super) {
    __extends(ChartViewModel, _super);
    function ChartViewModel(model, serializer) {
        var _this = _super.call(this, analytics_internal_1.cutRefs(model), serializer, _chart_1.chartSerializationsInfo) || this;
        var oldType = ko.observable('');
        _this._createDiagram(model['Diagram'], oldType, serializer);
        _this._disposables.push(ko.computed(function () {
            _this._createDiagram({}, oldType, serializer);
        }));
        _this.titles = _utils_1.deserializeModelArray(model && model.Titles, function (title, parent) { return new _title_1.TitleViewModel(title, parent, serializer); }, _title_1.TitleViewModel.prefix);
        _this.legends = _utils_1.deserializeModelArray(model && model.Legends, function (legends, parent) { return new _additionalLegend_1.AdditionalLegendViewModel(legends, parent, serializer); }, _additionalLegend_1.AdditionalLegendViewModel.prefix);
        _this._patchSeries(_this.dataContainer.seriesTemplate);
        _this._disposables.push(_this.dataContainer.series.subscribe(function (changes) {
            changes.filter(function (x) { return x.status === 'added'; }).forEach(function (change) {
                _this._patchSeries(change.value);
            });
        }, undefined, 'arrayChange'));
        _this.dataContainer.series().forEach(function (series) { return _this._patchSeries(series); });
        _title_1.assignTitleActions(_this.titles);
        return _this;
    }
    ChartViewModel.from = function (model, serializer) {
        return new ChartViewModel(model || {}, serializer);
    };
    ChartViewModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, _chart_1.chartSerializationsInfo, refs);
    };
    ChartViewModel.prototype._patchView = function (view) {
        var _this = this;
        var info = view.getInfo();
        ['barDistance', 'barDistanceFixed', 'equalBarWidth'].forEach(function (propertyName) {
            if (info.filter(function (x) { return x.propertyName === propertyName; }).length > 0) {
                view[propertyName] = _this[propertyName];
            }
        });
    };
    ChartViewModel.prototype._patchSeries = function (series) {
        var _this = this;
        series._disposables.push(series.view.subscribe(function (newVal) {
            _this._patchView(newVal);
        }));
        this._patchView(series.view());
    };
    ChartViewModel.prototype._createDiagram = function (model, oldType, serializer) {
        if (model) {
            var typeName = '';
            if (this.dataContainer.seriesDataMember() || this.dataContainer.series().length === 0) {
                typeName = this.dataContainer.seriesTemplate.viewType();
            }
            else {
                typeName = this.dataContainer.series()[0].viewType();
            }
            if (oldType.peek() !== _diagram_1.diagramMapper[typeName].type) {
                oldType(_diagram_1.diagramMapper[typeName].type);
                this.diagram(_diagram_2.DiagramViewModel.createDiagram(model, typeName, serializer));
            }
        }
    };
    return ChartViewModel;
}(analytics_elements_1.SerializableModel));
exports.ChartViewModel = ChartViewModel;
