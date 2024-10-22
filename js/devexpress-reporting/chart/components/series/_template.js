﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_template.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var _isBubble = function (viewType) {
    return viewType === 'BubbleSeriesView';
};
var _isRange = function (viewType) {
    return viewType === 'PolarRangeAreaSeriesView' ||
        viewType === 'RadarRangeAreaSeriesView' ||
        viewType === 'RangeArea3DSeriesView' ||
        viewType === 'RangeAreaSeriesView' ||
        viewType === 'OverlappedGanttSeriesView' ||
        viewType === 'SideBySideGanttSeriesView' ||
        viewType === 'OverlappedRangeBarSeriesView' ||
        viewType === 'SideBySideRangeBarSeriesView';
};
var _isStock = function (viewType) {
    return viewType === 'StockSeriesView' ||
        viewType === 'CandleStickSeriesView';
};
var ScaleType;
(function (ScaleType) {
    ScaleType[ScaleType["Qualitative"] = 0] = "Qualitative";
    ScaleType[ScaleType["Numerical"] = 1] = "Numerical";
    ScaleType[ScaleType["DateTime"] = 2] = "DateTime";
    ScaleType[ScaleType["Auto"] = 3] = "Auto";
})(ScaleType = exports.ScaleType || (exports.ScaleType = {}));
exports.ScaleTypeMap = {
    'Qualitative': ScaleType.Qualitative,
    'Numerical': ScaleType.Numerical,
    'DateTime': ScaleType.DateTime,
    'Auto': ScaleType.Auto
};
function _fixSeriesTemplateModel(model) {
    delete model['@SeriesDataMember'];
    return model;
}
var SeriesTemplateViewModel = (function (_super) {
    __extends(SeriesTemplateViewModel, _super);
    function SeriesTemplateViewModel(model, serializer, info) {
        var _this = _super.call(this, _fixSeriesTemplateModel(model), serializer, info) || this;
        _this._actualArgumentScaleType = ko.observable(ScaleType.Numerical);
        if (_this.valueDataMembers) {
            ko.unwrap(_this.valueDataMembers).dispose();
        }
        _this.viewType = ko.observable(_this.view().typeName);
        _this._adjustArgumentScaleType();
        var newInfo = analytics_internal_1.extend(true, [], info);
        var seriesPointsSortingKeyMeta = newInfo.filter(function (x) { return x.propertyName === _chart_1.seriesPointsSortingKey.propertyName; })[0];
        Object.defineProperty(seriesPointsSortingKeyMeta, 'valuesArray', {
            get: function () { return _this._getCurrentSeriesPointsSortingKeys(_this.viewType()); },
            configurable: true
        });
        _this.viewType.subscribe(function (newType) {
            var newSerializer = serializer || new analytics_utils_1.ModelSerializer();
            _this.view(_view_1.SeriesViewViewModel.from({ '@TypeNameSerializable': newType }, newSerializer)());
            _this._adjustArgumentScaleType();
            _this._updateSeriesPointsSortingKey(seriesPointsSortingKeyMeta);
        });
        _this.getInfo = function () { return newInfo; };
        _this._disposables.push(_this.view.subscribe(function (newView) {
            if (_this.viewType() !== newView.typeName) {
                _this.viewType(newView.typeName);
            }
            _this.updateByView(newView);
        }));
        _this.valueDataMembers = ko.observable(new (_templateOptions_1.viewTypesDataMembers[_this.view().typeName] || _commonValue_1.CommonValueDataMembers)(model['@ValueDataMembersSerializable'] || '', _this.valueScaleType));
        _this._disposables.push(_this['indicators'] = ko.computed(function () {
            return _this.view() && _this.view()['indicators'] && _this.view()['indicators']();
        }));
        _this._disposables.push(_this['titles'] = ko.computed(function () {
            return _this.view() && _this.view()['titles'] && _this.view()['titles']();
        }));
        _this._disposables.push(_this._actualArgumentScaleType.subscribe(function (newVal) {
            switch (newVal) {
                case ScaleType.DateTime:
                    _this.qualitativeSummaryOptions.resetAllProperties();
                    _this.numericSummaryOptions.resetAllProperties();
                    break;
                case ScaleType.Numerical:
                    _this.qualitativeSummaryOptions.resetAllProperties();
                    _this.dateTimeSummaryOptions.resetAllProperties();
                    break;
                case ScaleType.Qualitative:
                    _this.numericSummaryOptions.resetAllProperties();
                    _this.dateTimeSummaryOptions.resetAllProperties();
                    break;
            }
        }));
        _this.updateByView(_this.view());
        [_this.qualitativeSummaryOptions, _this.numericSummaryOptions, _this.dateTimeSummaryOptions].forEach(function (options) {
            options['getPath'] = function (propertyName) {
                return _this['getPath'] && _this['getPath']('summaryFunction') || '';
            };
        });
        _this.viewBindable = {
            model: _this.view,
            type: _this.viewType
        };
        _this.filterString = new analytics_widgets_1.FilterStringOptions(_this._filterString, ko.pureComputed(function () { return _this['getPath'] && _this['getPath']('argumentDataMember') || ''; }));
        return _this;
    }
    SeriesTemplateViewModel.from = function (model, serializer) {
        return new SeriesTemplateViewModel(model || {}, serializer, _chart_1.seriesTemplateSerializationsInfo);
    };
    SeriesTemplateViewModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, _chart_1.seriesTemplateSerializationsInfo, refs);
    };
    SeriesTemplateViewModel.prototype.updateByView = function (view) {
        if (this.label && this.label.typeNameSerializable) {
            this.label.typeNameSerializable(_templateOptions_1.mapTypes[view.typeName]);
        }
        this.valueDataMembers.peek().dispose();
        this.valueDataMembers(new (_templateOptions_1.viewTypesDataMembers[view.typeName] || _commonValue_1.CommonValueDataMembers)(this.valueDataMembers.peek().toString(), this.valueScaleType));
    };
    SeriesTemplateViewModel.prototype.preInitProperties = function (model) {
        delete model.DataFilters;
    };
    SeriesTemplateViewModel.prototype._isOnlyNumericArgumentScaleTypeSupported = function () {
        return _templateOptions_1.onlyNumericArgumentSupportedSeriesViewTypes.indexOf(this.viewType()) > -1;
    };
    SeriesTemplateViewModel.prototype._getCurrentSeriesPointsSortingKeys = function (viewType) {
        if (_isBubble(viewType))
            return _chart_1.bubbleSeriesPointsSortingKeys;
        if (_isRange(viewType))
            return _chart_1.rangeSeriesPointsSortingKeys;
        if (_isStock(viewType))
            return _chart_1.stockSeriesPointsSortingKeys;
        return _chart_1.commonSeriesPointsSortingKeys;
    };
    SeriesTemplateViewModel.prototype._adjustArgumentScaleType = function () {
        if (this._isOnlyNumericArgumentScaleTypeSupported())
            this.argumentScaleType('Numerical');
    };
    SeriesTemplateViewModel.prototype._updateSeriesPointsSortingKey = function (seriesPointsSortingKeyMeta) {
        var value = this[seriesPointsSortingKeyMeta.propertyName];
        if (!!value() && !seriesPointsSortingKeyMeta.valuesArray.some(function (x) { return x.value === value(); })) {
            value(seriesPointsSortingKeyMeta.valuesArray[0].value);
        }
    };
    SeriesTemplateViewModel.prototype._isPropertyDisabled = function (name) {
        if (name === 'argumentScaleType') {
            return this._isOnlyNumericArgumentScaleTypeSupported();
        }
        return false;
    };
    SeriesTemplateViewModel.prototype.isPropertyVisible = function (propertyName) {
        switch (propertyName) {
            case 'qualitativeSummaryOptions':
                return this._actualArgumentScaleType() === ScaleType.Qualitative;
            case 'numericSummaryOptions':
                return this._actualArgumentScaleType() === ScaleType.Numerical;
            case 'dateTimeSummaryOptions':
                return this._actualArgumentScaleType() === ScaleType.DateTime;
            default:
                return true;
        }
    };
    return SeriesTemplateViewModel;
}(analytics_elements_1.SerializableModel));
exports.SeriesTemplateViewModel = SeriesTemplateViewModel;
var _view_1 = require("./_view");
var _chart_1 = require("../../internal/meta/_chart");
var _templateOptions_1 = require("./_templateOptions");
var _commonValue_1 = require("../../internal/data/_commonValue");
